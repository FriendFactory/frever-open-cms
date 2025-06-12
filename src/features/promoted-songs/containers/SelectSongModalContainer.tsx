import React, { useState } from "react";
import { Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { AssetSearchTableContainer } from "shared/containers/AssetSearchTableContainer";

type PromotionAssetType = "Song" | "ExternalSong";
export type MarketingCountries = { asset: PromotionAssetType; marketingCountries: string[] };

interface SelectSongModalContainerProps {
    stage: string;
    btnText: string;
    asset: PromotionAssetType;
    onClick: (id: number, name?: string | null, marketingCountries?: MarketingCountries) => void;
}

export function SelectSongModalContainer({ stage, asset, btnText, onClick }: SelectSongModalContainerProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div onClick={() => setIsModalOpen(true)}>{btnText}</div>
            <Modal title="Search" open={isModalOpen} width={1360} centered onCancel={() => setIsModalOpen(false)}>
                <AssetSearchTableContainer
                    stage={stage}
                    asset={asset}
                    actionColumn={{
                        title: "",
                        width: 65,
                        align: "right",
                        render: (_, entity) => (
                            <Button
                                type="primary"
                                ghost
                                icon={<PlusOutlined />}
                                onClick={() => {
                                    const name =
                                        "songName" in entity ? entity.songName : "name" in entity ? entity.name : null;
                                    const marketingCountries =
                                        "availableForCountries" in entity
                                            ? entity.availableForCountries
                                            : "excludedCountries" in entity
                                            ? entity.excludedCountries
                                            : [];
                                    const songCountries = {
                                        asset,
                                        marketingCountries
                                    };
                                    onClick(entity.id, name, songCountries);
                                    setIsModalOpen(false);
                                }}
                            />
                        )
                    }}
                />
            </Modal>
        </>
    );
}
