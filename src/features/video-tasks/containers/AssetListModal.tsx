import React, { useCallback, useState } from "react";
import { Button, Dropdown, message, Modal, Space } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";

import { AssetData, AssetDataNames } from "features/search-assets/services";
import { handleUpdateTaskAssets, handleUpdateTaskSpawnPositions, TaskAssetAction } from "./TaskAssetAction";
import { Task, TaskAsset, TaskAssetsInfoToUpdate, TaskAssetsTypes, TaskAssetTypeName } from "../services";
import { AssetSearchTableContainer } from "shared/containers/AssetSearchTableContainer";
import { AssetTypes } from "config";
import { updateTaskAssetsAction } from "../store/actions";
import { CopyTaskModalContainer } from "./CopyTaskModalContainer";
import { useExtraDataBundle } from "shared";

const assetKey = (stage: string, id: number) => `${stage}/${id}`;
export interface AssetListModalProps {
    stage: string;
    task: Task;
}
export function AssetListModal({ stage, task }: AssetListModalProps) {
    const dispatch = useDispatch();
    const [asset, setAsset] = useState<TaskAssetTypeName | "CharacterSpawnPosition" | null>(null);
    const readiness = useExtraDataBundle(["Readiness"]);
    const liveInApp = readiness.bundle.Readiness?.data?.find((value) => value.name === "Live in app");

    const showModal = useCallback((asset: TaskAssetTypeName | "CharacterSpawnPosition") => setAsset(asset), []);
    const hideModal = useCallback(() => setAsset(null), []);

    const [selectedAssets, setSelectedAssets] = useState<AssetData[AssetTypes][] | null>([]);
    const rowSelection = {
        onChange: (selectedRowKeys: any[], selectedRows: AssetData[AssetTypes][]) =>
            selectedRowKeys.length > 0 ? setSelectedAssets(selectedRows) : setSelectedAssets(null),
        selectedRowKeys: selectedAssets?.map((record) => assetKey(stage, record.id)),
        fixed: true
    };

    const handleOnSave = (action: "add" | "remove") => () => {
        if (!selectedAssets) {
            hideModal();
            return;
        }

        const { assets, spawnPositions, id } = task;

        if (assets && spawnPositions) {
            const data = selectedAssets?.reduce(
                (acc: TaskAssetsInfoToUpdate, el) => {
                    const assetInfo = { assetId: el.id, assetType: asset };
                    return asset === "CharacterSpawnPosition" && "setLocation" in el
                        ? handleUpdateTaskSpawnPositions(action, el, acc)
                        : handleUpdateTaskAssets(action, assetInfo as TaskAsset, acc);
                },
                { assets, spawnPositions, id }
            );
            dispatch(
                updateTaskAssetsAction({
                    stage,
                    data
                })
            );
        } else {
            message.error("Missed params (Assets or SpawnPositions)");
        }
        setSelectedAssets(null);
        hideModal();
    };

    const getRowKey = useCallback((record: AssetData[AssetDataNames]) => assetKey(stage, record.id), [stage, asset]);

    const items = [
        ...TaskAssetsTypes.filter((el) => el !== "SetLocation").map((el) => ({
            key: el,
            label: el,
            onClick: () => showModal(el)
        })),
        {
            key: "CharacterSpawnPosition",
            label: "CharacterSpawnPosition",
            onClick: () => showModal("CharacterSpawnPosition")
        }
    ];

    return (
        <>
            <Space>
                <CopyTaskModalContainer stage={stage} task={task} />
                <Dropdown menu={{ items }}>
                    <Button>
                        Add Asset <MoreOutlined />
                    </Button>
                </Dropdown>
            </Space>
            <Modal
                title={`${asset} list`}
                width="95%"
                centered
                open={!!asset}
                onCancel={hideModal}
                destroyOnClose
                footer={[
                    <Button key="cancel-btn" onClick={() => hideModal()}>
                        Cancel
                    </Button>,
                    <Button
                        disabled={!selectedAssets}
                        type="primary"
                        ghost
                        danger
                        key="remove-all-assets"
                        onClick={handleOnSave("remove")}>
                        Remove Selected
                    </Button>,
                    <Button
                        disabled={!selectedAssets}
                        type="primary"
                        ghost
                        key="add-all-assets"
                        onClick={handleOnSave("add")}>
                        Add Selected
                    </Button>
                ]}>
                {asset && (
                    <AssetSearchTableContainer
                        rowKey={getRowKey}
                        rowSelection={rowSelection}
                        stage={stage}
                        asset={asset}
                        baseSearchParams={
                            asset !== "CharacterSpawnPosition" && asset !== "ExternalSong" && liveInApp
                                ? { readinessId: liveInApp.id.toString() }
                                : {}
                        }
                        excludeSpawnPostionWithEmptySetLocation
                        actionColumn={{
                            title: "Action",
                            width: 60,
                            align: "right",
                            render: (entity: AssetData[TaskAssetTypeName]) => (
                                <TaskAssetAction value={{ info: { assetId: entity.id, assetType: asset }, entity }} />
                            )
                        }}
                    />
                )}
            </Modal>
        </>
    );
}
