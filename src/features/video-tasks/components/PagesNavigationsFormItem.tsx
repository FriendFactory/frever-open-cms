import React from "react";
import { Col, Form, FormInstance, Row, Select, Typography } from "antd";

import { useExtraData } from "shared/hooks/useExtraData";
import { validateEditorSetAndPagesNav } from "./EditorSettingsFormItem";
import { CheckOutlined, ExclamationOutlined } from "@ant-design/icons";
import { useCurrentStage } from "shared";
import { TaskFormData } from "./CreateTaskForm";

export function PagesNavigationsFormItem({ getFieldValue, setFieldValue, validateFields }: FormInstance<TaskFormData>) {
    const stage = useCurrentStage();
    const pagesNavigations = useExtraData({ stage, name: "PagesNavigation" });
    const editorSettings = useExtraData({ stage, name: "Editor-Settings" });

    const currentEditorSettingsId: number | undefined = getFieldValue("editorSettingsId");
    const currentEditorSettings = editorSettings.data?.find((el) => el.id === currentEditorSettingsId);

    const options = pagesNavigations.data?.map((pagesNavigation) => ({
        label: pagesNavigation.name,
        value: pagesNavigation.id,
        isValid: currentEditorSettings ? validateEditorSetAndPagesNav(currentEditorSettings, pagesNavigation) : true
    }));

    const handleOnChange = (_: unknown, value: { label: string; value: number; isValid: boolean }) => {
        if (currentEditorSettingsId && !value.isValid) {
            setFieldValue("editorSettingsId", undefined);
            validateFields(["editorSettingsId"]);
        }
    };

    return (
        <Form.Item
            name="pagesNavigationId"
            label="Pages Navigations"
            rules={[{ required: true, message: "This field is required" }]}>
            <Select
                allowClear
                optionLabelProp="label"
                loading={editorSettings.loading || editorSettings.loading}
                onSelect={handleOnChange}>
                {options?.map((el) => (
                    <Select.Option key={el.value} value={el.value} label={el.label} isValid={el.isValid}>
                        <Row justify="space-between" wrap={false}>
                            <Col>{el.label}</Col>
                            <Col>
                                {el.isValid ? (
                                    <Typography.Text type="success">
                                        <CheckOutlined />
                                    </Typography.Text>
                                ) : (
                                    <Typography.Text type="warning">
                                        <ExclamationOutlined />
                                    </Typography.Text>
                                )}
                            </Col>
                        </Row>
                    </Select.Option>
                ))}
            </Select>
        </Form.Item>
    );
}
