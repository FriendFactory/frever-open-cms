import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "antd";

import { createCdnURLFromFiles, useExtendedEditableColumns } from "shared";
import { assetBatchUpdateAction, assetListPageSelector } from "features/search-assets/store";
import { AssetTypes, NO_IMAGE_URL } from "config";
import { AssetType, AssetListParams } from "features/search-assets/services";
import { getAssetColumns } from "../constants/asset-batch-columns";
import { EditableTableV2 } from "shared/components/EditableTableV2/EditableTableV2";

export interface AssetBatchModeContainerProps<T extends AssetTypes> {
    stage: string;
    assetType: T;
    params: AssetListParams;
}

export function AssetBatchModeContainer<T extends AssetTypes>({
    stage,
    params,
    assetType
}: AssetBatchModeContainerProps<T>) {
    const dispatch = useDispatch();
    const info = useSelector(assetListPageSelector(stage, params, assetType));

    const { columns, loading } = useExtendedEditableColumns(getAssetColumns(assetType));

    columns.push({
        title: "",
        dataIndex: "",
        align: "right",
        fixed: "right",
        width: 80,
        render: (_, asset) =>
            asset.files?.length ? (
                <Avatar
                    shape="square"
                    size={65}
                    src={createCdnURLFromFiles({
                        stage,
                        id: asset.id,
                        entityType: assetType,
                        files: asset.files,
                        resolution: "128x128"
                    })}
                />
            ) : (
                NO_IMAGE_URL
            )
    });

    const handleOnFinish = (data: Partial<AssetType<T>>[]) =>
        dispatch(assetBatchUpdateAction({ stage, assetType, data }));

    const tableWidth = columns.reduce((acc, el) => acc + +(el.width ?? 100), 0);
    return (
        <EditableTableV2
            loading={info.loading || loading}
            dataSource={info.data}
            columns={columns}
            scroll={{ x: tableWidth, y: "100vh" }}
            onFinish={handleOnFinish}
            size="small"
            bordered
        />
    );
}
