import React from "react";
import { Button, Form, Input, theme, Typography } from "antd";

import { FixedPageHeader } from "shared";
import styled from "styled-components";

export interface UmaRecipeEditorProps {
    initialValue: { umaRecipeJ: string };
    validateStatus: "error" | "success";
    isHeaderVisible: boolean;
    editorError?: string;
    onBlur: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onFieldsChange: () => void;
    onReset: () => void;
    handleSubmit: (data: { umaRecipeJ: string }) => void;
}

export function UmaRecipeEditor({
    initialValue,
    validateStatus,
    isHeaderVisible,
    editorError,
    onBlur,
    onReset,
    onFieldsChange,
    handleSubmit
}: UmaRecipeEditorProps) {
    const { token } = theme.useToken();

    return (
        <UmaRecipeEditorStyled bg={token.colorPrimaryBgHover} errorBg={token.colorError}>
            <Form
                initialValues={initialValue}
                onFinish={handleSubmit}
                onFieldsChange={onFieldsChange}
                onReset={onReset}>
                <Form.Item name="umaRecipeJ" validateStatus={validateStatus}>
                    <Input.TextArea onBlur={onBlur} showCount spellCheck={false} />
                </Form.Item>

                {isHeaderVisible && (
                    <FixedPageHeader
                        title={
                            editorError ? (
                                <Typography.Title type="danger" level={3}>
                                    {editorError}
                                </Typography.Title>
                            ) : (
                                "Unsaved changes"
                            )
                        }
                        extra={[
                            <Button htmlType="reset">Reset</Button>,
                            <Button disabled={!!editorError} htmlType="submit" type="primary">
                                Save
                            </Button>
                        ]}
                    />
                )}
            </Form>
        </UmaRecipeEditorStyled>
    );
}

const UmaRecipeEditorStyled = styled.div<{ errorBg: string; bg: string }>`
    & .ant-form-item textarea.ant-input {
        height: 100vh;
    }

    & .ant-form-item-has-error {
        .ant-input,
        .ant-input:hover {
            background-color: ${(props) => props.errorBg};
        }
    }

    & .ant-form-item-has-success {
        .ant-input {
            background-color: ${(props) => props.bg};
        }
    }
`;
