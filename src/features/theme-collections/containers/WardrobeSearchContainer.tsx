import React, { useState } from "react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons/lib/icons";
import { Button, Modal } from "antd";

import { useCurrentStage } from "shared";
import { AssetSearchTableContainer } from "shared/containers/AssetSearchTableContainer";
import { WardrobeShortInfo } from "../services";
import { AssetData } from "features/search-assets/services";
import { WardrobeSearchFilterContainer } from "./WardrobeSearchFilterContainer";

export interface WardrobeSearchContainerProps {
    isLinked: (id: number) => boolean;
    changeStatusOfLinking: (wardrobe: WardrobeShortInfo) => void;
    bulkUpdate: (action: "add" | "remove", wardrobes: WardrobeShortInfo[]) => void;
}

export function WardrobeSearchContainer({ isLinked, changeStatusOfLinking, bulkUpdate }: WardrobeSearchContainerProps) {
    const stage = useCurrentStage();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectedAssets, setSelectedAssets] = useState<AssetData["Wardrobe"][] | null>([]);

    const rowSelection = {
        onChange: (selectedRowKeys: any[], selectedRows: AssetData["Wardrobe"][]) =>
            selectedRowKeys.length > 0 ? setSelectedAssets(selectedRows) : setSelectedAssets(null),
        selectedRowKeys: selectedAssets?.map((record) => record.id),
        fixed: true
    };

    const handleSelectedAssets = (action: "add" | "remove") => () => {
        bulkUpdate(action, selectedAssets!);
        setSelectedAssets(null);
    };

    return (
        <>
            <Button type="link" onClick={() => setIsModalOpen(true)}>
                Add Asset
            </Button>

            <Modal
                title="Wardrobe search"
                width="95%"
                centered
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                destroyOnClose
                footer={[
                    <Button key="cancel-btn" onClick={() => setIsModalOpen(false)}>
                        Cancel
                    </Button>,
                    <Button
                        disabled={!selectedAssets}
                        type="primary"
                        ghost
                        danger
                        key="remove-all-assets"
                        onClick={handleSelectedAssets("remove")}>
                        Remove Selected
                    </Button>,
                    <Button
                        disabled={!selectedAssets}
                        type="primary"
                        ghost
                        key="add-all-assets"
                        onClick={handleSelectedAssets("add")}>
                        Add Selected
                    </Button>
                ]}>
                <AssetSearchTableContainer
                    rowSelection={rowSelection}
                    stage={stage}
                    asset="Wardrobe"
                    baseSearchParams={{ take: 100 }}
                    renderSearchForm={(onSearch) => <WardrobeSearchFilterContainer onSearch={onSearch} />}
                    actionColumn={{
                        title: "",
                        width: 65,
                        align: "right",
                        render: (_, asset) => {
                            if ("name" in asset && "files" in asset) {
                                return (
                                    <Button
                                        type="primary"
                                        ghost
                                        danger={isLinked(asset.id)}
                                        onClick={() =>
                                            changeStatusOfLinking({
                                                id: asset.id,
                                                name: asset.name,
                                                files: asset.files
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
