import React from "react";
import { Button, Form } from "antd";
import styled from "styled-components";

import { FormInstance } from "antd/lib/form/Form";

import { LoadingContainer } from "shared";
import { renderCategoryFormItems } from "../components/renderCategoryFormItems";
import { CategoryFormItemType } from "../form-items";

interface InlineCreateCategoryUIProps {
    form: FormInstance;
    items: CategoryFormItemType[];
    loading: boolean;
    onFinish: () => void;
    onReset: () => void;
}

export function InlineCreateCategoryForm({ form, items, loading, onFinish, onReset }: InlineCreateCategoryUIProps) {
    return (
        <Form form={form} layout="horizontal" disabled={loading}>
            <LoadingContainer loading={loading} />
            <FormItemsWrapper>{renderCategoryFormItems(items)}</FormItemsWrapper>
            <ButtonsWrapper>
                <Button key="create-category-submit" type="primary" onClick={onFinish}>
                    Add
                </Button>
                <Button key="create-category-cancel" onClick={onReset}>
                    Reset
                </Button>
            </ButtonsWrapper>
        </Form>
    );
}

const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: end;
    gap: 10px;
`;

const FormItemsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 6px;

    & > div {
        flex: 1 0 200px;
    }
`;
