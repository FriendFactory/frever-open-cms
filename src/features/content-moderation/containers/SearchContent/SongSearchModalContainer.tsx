import React, { useState } from "react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons/lib/icons";
import { Button, Modal } from "antd";

import { useCurrentStage } from "shared";
import { AssetSearchTableContainer } from "shared/containers/AssetSearchTableContainer";
import { AssetData } from "features/search-assets/services";
import { CreatePageRowContentShortInfo } from "features/content-moderation/services";

export interface SongSearchModalContainerProps {
    isLinked: (id: number) => boolean;
    changeStatusOfLinking: (content: CreatePageRowContentShortInfo) => void;
    bulkUpdate: (action: "add" | "remove", contents: CreatePageRowContentShortInfo[]) => void;
}

export function SongSearchModalContainer({
    isLinked,
    changeStatusOfLinking,
    bulkUpdate
}: SongSearchModalContainerProps) {
    const stage = useCurrentStage();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectedAssets, setSelectedAssets] = useState<AssetData["ExternalSong"][] | null>([]);

    const rowSelection = {
        onChange: (selectedRowKeys: any[], selectedRows: AssetData["ExternalSong"][]) =>
            selectedRowKeys.length > 0 ? setSelectedAssets(selectedRows) : setSelectedAssets(null),
        selectedRowKeys: selectedAssets?.map((record) => record.id),
        fixed: true
    };

    const handleSelectedAssets = (action: "add" | "remove") => () => {
        bulkUpdate(
            action,
            selectedAssets!.map((asset) => ({ id: asset.id, title: asset?.songName }))
        );
        setSelectedAssets(null);
    };

    return (
        <>
            <Button type="link" onClick={() => setIsModalOpen(true)}>
                Add Song
            </Button>

            <Modal
                title="Song search"
                width="95%"
                centered
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                destroyOnClose
                footer={[
                    <Button key="cancel" onClick={() => setIsModalOpen(false)}>
                        Cancel
                    </Button>,
                    <Button
                        disabled={!selectedAssets}
                        type="primary"
                        ghost
                        danger
                        key="remove"
                        onClick={handleSelectedAssets("remove")}>
                        Remove Selected
                    </Button>,
                    <Button
                        disabled={!selectedAssets}
                        type="primary"
                        ghost
                        key="add"
                        onClick={handleSelectedAssets("add")}>
                        Add Selected
                    </Button>
                ]}>
                <AssetSearchTableContainer
                    rowSelection={rowSelection}
                    stage={stage}
                    asset="ExternalSong"
                    baseSearchParams={{ take: 100 }}
                    actionColumn={{
                        title: "",
                        width: 65,
                        align: "right",
                        render: (_, asset) => {
                            if ("songName" in asset) {
                                return (
                                    <Button
                                        type="primary"
                                        ghost
                                        danger={isLinked(asset.id)}
                                        onClick={() =>
                                            changeStatusOfLinking({
                                                id: asset.id,
                                                title: asset.songName
                                            })
                                        }
                                        icon={isLinked(asset.id) ? <MinusOutlined /> : <PlusOutlined />}
                                    />
                                );
                            }
                            return null;
                        }
                    }}
                />
            </Modal>
        </>
    );
}
