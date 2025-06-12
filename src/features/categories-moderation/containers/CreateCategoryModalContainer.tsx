import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Form, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useForm } from "antd/lib/form/Form";

import { ExtraDataType, LoadingContainer, useCurrentStage } from "shared";
import { createEntityAction } from "shared/store";
import { CategoryTypes } from "config";
import { getCategoriesFormItems } from "../form-items";
import { renderCategoryFormItems } from "../components/renderCategoryFormItems";
import { useExtendedFormItems } from "../hooks/useExtendedFormItems";

interface CreateCategoryModalContainerProps<T extends CategoryTypes = CategoryTypes> {
    category: T;
}

export function CreateCategoryModalContainer<T extends CategoryTypes>({
    category
}: CreateCategoryModalContainerProps<T>) {
    const dispatch = useDispatch();

    const stage = useCurrentStage();

    const [form] = useForm<Partial<ExtraDataType<T>>>();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const destroyModal = () => {
        form.resetFields();
        setIsModalOpen(false);
    };
    const showModal = () => setIsModalOpen(true);

    const handleOnFinish = async () => {
        const data = await form.validateFields();

        dispatch(createEntityAction({ stage, entityName: category, data }));
        destroyModal();
    };

    const { items, loading } = useExtendedFormItems(getCategoriesFormItems(category));

    return (
        <>
            <Button ghost type="primary" onClick={showModal} icon={<PlusOutlined />} />
            <Modal
                title="Add new record"
                open={isModalOpen}
                destroyOnClose
                onCancel={destroyModal}
                footer={[
                    <Button key="create-category-cancel" onClick={destroyModal}>
                        Cancel
                    </Button>,
                    <Button key="create-category-submit" type="primary" onClick={handleOnFinish}>
                        Create
                    </Button>
                ]}>
                <LoadingContainer loading={loading} />

                <Form form={form} layout="vertical">
                    {renderCategoryFormItems(items)}
                </Form>
            </Modal>
        </>
    );
}
