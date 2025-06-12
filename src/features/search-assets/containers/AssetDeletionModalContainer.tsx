import React, { useEffect, useState } from "react";
import { App, Modal } from "antd";
import { UrlPath } from "rd-url-utils";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { AppState } from "app-state";
import { AssetTypes, deleteBy, fieldsToExpandWardrobe, FieldsToExpandWardrobeParams } from "config";
import { assetDeleteAction, expandedDataAction, hideAssetsDeleteModalAction, multipleEditingAction } from "../store";
import { ExpandDataParams, MultipleEditingParams } from "../services";

export interface AssetDeletionModalContainerProps {
    url: UrlPath<{ stage: string; asset: AssetTypes; id?: number }, {}>;
}

export function AssetDeletionModalContainer({ url }: AssetDeletionModalContainerProps) {
    const { modal } = App.useApp();
    const location = useLocation();
    const dispatch = useDispatch();
    const urlMatch = url.match(location);

    if (!urlMatch.isMatched) return null;

    const { stage, asset: assetType } = urlMatch.params;
    const [confirmModalVisibile, setConfirmModalVisibile] = useState<boolean>(false);

    const { assetToDeleteList, deleteModalVisibility } = useSelector((state: AppState) => state.assetsToDeleteModal);
    const expandedData = useSelector((state: AppState) => state.expandedData);
    const multipleEditingStatus = useSelector((state: AppState) => state.multipleEditingStatus);

    const hideModal = () => dispatch(hideAssetsDeleteModalAction({}));
    const expandData = (params: ExpandDataParams) => dispatch(expandedDataAction(params));
    const multipleEditing = (params: MultipleEditingParams) => dispatch(multipleEditingAction(params));
    const deleteAssets = (asset: string, assetsToDelete: number[]) =>
        dispatch(assetDeleteAction({ stage, asset, assetsToDelete }));

    const assetsToDeleteType = deleteBy[assetType] ? deleteBy[assetType].name : assetType;
    const assetsToDeleteIds = deleteBy[assetType]
        ? assetToDeleteList.map((asset) => (asset as any)[deleteBy[assetType].objectId]?.toString())
        : assetToDeleteList.map((asset) => asset.id?.toString());

    useEffect(() => {
        if (multipleEditingStatus.data) {
            const ableToDelete = multipleEditingStatus.data.filter((response: boolean) =>
                response === true ? false : true
            ).length
                ? false
                : true;
            if (ableToDelete) {
                deleteAssets(assetsToDeleteType, assetsToDeleteIds);
            }
        }
    }, [multipleEditingStatus]);

    useEffect(() => {
        if (expandedData.response) {
            const data = expandedData.response.map((asset: { [key: string]: [] }) =>
                fieldsToExpandWardrobe.map((field) => ({ values: field, data: asset[field.value] }))
            )[0];

            const dependencies = getAllDepencies(data);

            if (dependencies.length) {
                if (stage !== "content-test") {
                    modal.warning({
                        title: "Action not available",
                        content: "Contact the admin with DB access for help."
                    });
                } else {
                    modal.confirm({
                        content:
                            "You will now delete items from characters or outfits in use on the Content test. Proceed?",
                        onOk: () => {
                            multipleEditing({ stage, itemsToEdit: dependencies });
                            setConfirmModalVisibile(false);
                        },
                        visible: confirmModalVisibile
                    });
                }
            } else {
                deleteAssets(assetsToDeleteType, assetsToDeleteIds);
            }
        }
    }, [expandedData]);

    const getAllDepencies = (data: Array<{ values: FieldsToExpandWardrobeParams; data: [] }>) =>
        data
            .filter((dependency) => dependency.data.length)
            .map((dependency) =>
                dependency.data.map((item) => ({
                    type: dependency.values.tableName,
                    data: {
                        id: item[dependency.values.idName],
                        [dependency.values.value]: [
                            {
                                [dependency.values.idName]: item[dependency.values.idName],
                                [dependency.values.idTargetName]: -item[dependency.values.idTargetName]
                            }
                        ]
                    }
                }))
            )
            .flat();

    const handleOk = () => {
        if (assetsToDeleteType === "umaBundle") {
            const wardrobeIds = assetToDeleteList.map((asset) => asset.id?.toString());
            const fieldsToExpand = fieldsToExpandWardrobe.map((target) => target.value);
            expandData({ stage, assetType, ids: wardrobeIds, expandData: fieldsToExpand });
        } else {
            deleteAssets(assetsToDeleteType, assetsToDeleteIds);
        }
        hideModal();
    };

    return (
        <Modal
            destroyOnClose
            okButtonProps={{ className: "ant-btn ant-btn-danger" }}
            title={`Delete ${assetToDeleteList.length} asset(s)`}
            open={deleteModalVisibility}
            okText="Delete"
            onOk={handleOk}
            onCancel={hideModal}>
            <p>This can't be undone</p>
        </Modal>
    );
}
