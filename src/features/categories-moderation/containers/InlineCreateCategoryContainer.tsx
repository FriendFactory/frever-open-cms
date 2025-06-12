import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "antd/lib/form/Form";

import { ExtraDataType, useCurrentStage } from "shared";
import { createEntityAction } from "shared/store";
import { CategoryTypes } from "config";
import { getCategoriesFormItems } from "../form-items";
import { useExtendedFormItems } from "../hooks/useExtendedFormItems";
import { InlineCreateCategoryForm } from "../components/InlineCreateCategoryForm";

interface InlineCreateCategoryContainerProps<T extends CategoryTypes = CategoryTypes> {
    category: T;
}

export function InlineCreateCategoryContainer<T extends CategoryTypes>({
    category
}: InlineCreateCategoryContainerProps<T>) {
    const dispatch = useDispatch();
    const stage = useCurrentStage();
    const [form] = useForm<Partial<ExtraDataType<T>>>();
    const { items, loading } = useExtendedFormItems(getCategoriesFormItems(category));

    const handleOnReset = () => form.resetFields();

    const handleOnFinish = async () => {
        const data = await form.validateFields();
        dispatch(createEntityAction({ stage, entityName: category, data }));
        handleOnReset();
    };

    return (
        <InlineCreateCategoryForm
            form={form}
            items={items}
            loading={loading}
            onFinish={handleOnFinish}
            onReset={handleOnReset}
        />
    );
}
