import React, { useState } from "react";
import { Button, List, Pagination, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";

import { useThemeCollectionsSearch } from "../hooks/useThemeCollectionSearch";
import { ThemeCollection, ThemeCollectionsQueryParams, ThemeCollectionWardrobeAction } from "../services";
import { ThemeCollectionFilterForm } from "../components/ThemeCollectionFilterForm";
import { ThemeCollectionListItemMeta } from "../components/ThemeCollectionListItemMeta";
import { ScrollableModal, useCurrentStage } from "shared";
import { updateThemeCollectionWardrobesAction } from "../store/actions";

const pageSizeOptions = [20, 50, 100, 200, 300, 400, 500];

export interface AddWardrobeToThemeCollectionContainerProps {
    wardrobeIds: number[];
}

export function AddWardrobeToThemeCollectionContainer({ wardrobeIds }: AddWardrobeToThemeCollectionContainerProps) {
    const dispatch = useDispatch();
    const stage = useCurrentStage();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => setIsModalOpen(true);
    const hideModal = () => setIsModalOpen(false);

    const [searchForm] = useForm<ThemeCollectionsQueryParams>();
    const { info, pageChange, onSearch } = useThemeCollectionsSearch({ stage, baseParams: {} });

    const handleOnSearch = async () => {
        const params = await searchForm.validateFields();
        onSearch(params);
    };

    const handleOnChangeSortDirection = async () => {
        const params = await searchForm.validateFields();
        onSearch({ ...params, sortDirection: params.sortDirection === "desc" ? "asc" : "desc" });
    };

    const updateThemeCollection = (item: ThemeCollection, action: ThemeCollectionWardrobeAction) => {
        dispatch(
            updateThemeCollectionWardrobesAction({
                stage,
                item,
                targetWardrobeIds: wardrobeIds,
                action
            })
        );
        hideModal();
    };

    return (
        <>
            <a onClick={showModal}>Add to theme collection</a>
            <ScrollableModal
                title="Theme Collection search"
                width="95%"
                open={isModalOpen}
                onCancel={hideModal}
                destroyOnClose
                footer={false}>
                <Space direction="vertical" style={{ width: "100%" }}>
                    <ThemeCollectionFilterForm
                        form={searchForm}
                        initialValues={{}}
                        onSearch={handleOnSearch}
                        onChangeSortDirection={handleOnChangeSortDirection}
                    />

                    <List
                        rowKey="id"
                        itemLayout="horizontal"
                        pagination={false}
                        dataSource={info.data}
                        loading={info.loading}
                        renderItem={(item) => {
                            return (
                                <List.Item key={item.id}>
                                    <ThemeCollectionListItemMeta item={item} avatarSize={60} stage={stage} />
                                    <Space size="small">
                                        <Button
                                            type="primary"
                                            ghost
                                            icon={<PlusOutlined />}
                                            onClick={() => updateThemeCollection(item, "Add")}
                                        />
                                    </Space>
                                </List.Item>
                            );
                        }}
                    />

                    <Pagination
                        showQuickJumper
                        total={info.total}
                        pageSize={info.pageSize}
                        pageSizeOptions={pageSizeOptions}
                        current={info.currentPage}
                        onChange={pageChange}
                    />
                </Space>
            </ScrollableModal>
        </>
    );
}
