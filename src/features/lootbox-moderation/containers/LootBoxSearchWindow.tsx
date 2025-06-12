import React, { useState } from "react";
import { List, Pagination, Space } from "antd";

import { useCurrentStage, ScrollableModal } from "shared";
import { LootBox, LootBoxQueryParams } from "../services";
import { LootBoxFilterForm } from "../components/LootBoxFilterForm";
import { LootBoxMeta } from "../components/LootBoxMeta";
import { useLootBoxData } from "../hooks/useLootBoxData";

interface LootBoxSearchWindowProps {
    children: React.ReactNode;
    onLootBoxClick: (value: LootBox) => void;
    baseSearchParams?: LootBoxQueryParams;
}

export function LootBoxSearchWindow({ baseSearchParams = {}, children, onLootBoxClick }: LootBoxSearchWindowProps) {
    const stage = useCurrentStage();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const { info, searchParams, handleOnChange, handleOnPage } = useLootBoxData({ params: baseSearchParams });

    const handleOnLootBoxClick = (item: LootBox) => () => {
        onLootBoxClick(item);
        setIsModalOpen(false);
    };

    const openModal = () => {
        setIsModalOpen(true);
        handleOnChange(searchParams);
    };

    const hideModal = () => setIsModalOpen(false);

    return (
        <>
            <span onClick={openModal}>{children}</span>
            <ScrollableModal
                title="Search Loot Box"
                open={isModalOpen}
                width={600}
                onCancel={hideModal}
                footer={
                    <Pagination
                        showQuickJumper
                        showSizeChanger={false}
                        total={info.total}
                        current={info.currentPage}
                        onChange={handleOnPage}
                    />
                }>
                <Space direction="vertical" style={{ overflowX: "hidden" }}>
                    <LootBoxFilterForm value={info.params} onChange={handleOnChange} />
                    <List
                        itemLayout="horizontal"
                        bordered
                        loading={info.loading}
                        dataSource={info.data}
                        renderItem={(item) => (
                            <List.Item actions={[<a onClick={handleOnLootBoxClick(item)}>Select</a>]}>
                                <LootBoxMeta item={item} stage={stage} itemType="list-item" />
                            </List.Item>
                        )}
                    />
                </Space>
            </ScrollableModal>
        </>
    );
}
