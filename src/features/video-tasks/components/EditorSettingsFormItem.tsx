import React from "react";
import { Col, Form, FormInstance, Row, Select, Typography } from "antd";

import { useExtraData } from "shared/hooks/useExtraData";
import { PagesNavigation, EditorSettings, useCurrentStage } from "shared";
import { PagesNavigationPages } from "../constants";
import { CheckOutlined, ExclamationOutlined } from "@ant-design/icons";
import { TaskFormData } from "./CreateTaskForm";

export function EditorSettingsFormItem({ getFieldValue, setFieldValue, validateFields }: FormInstance<TaskFormData>) {
    const stage = useCurrentStage();
    const pagesNavigations = useExtraData({ stage, name: "PagesNavigation" });
    const editorSettings = useExtraData({ stage, name: "Editor-Settings" });

    const currentPagesNavigationId: number | undefined = getFieldValue("pagesNavigationId");
    const currentPagesNavigation = pagesNavigations.data?.find((el) => el.id === currentPagesNavigationId);

    const options = editorSettings.data?.map((editorSetting) => ({
        label: editorSetting.name,
        value: editorSetting.id,
        isValid: currentPagesNavigation ? validateEditorSetAndPagesNav(editorSetting, currentPagesNavigation) : true
    }));

    const handleOnChange = (_: unknown, value: { label: string; value: string; isValid: boolean }) => {
        if (currentPagesNavigation && !value.isValid) {
            setFieldValue("pagesNavigationId", undefined);
            validateFields(["pagesNavigationId"]);
        }
    };

    return (
        <Form.Item
            name="editorSettingsId"
            label="Editor Settings"
            rules={[{ required: true, message: "This field is required" }]}>
            <Select
                optionLabelProp="label"
                allowClear
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

export const validateEditorSetAndPagesNav = (editorSettings: EditorSettings, pagesNavigation: PagesNavigation) => {
    const { hasCharacterEditorSettings, hasLevelEditorSettings, hasPostRecordEditorSettings } = editorSettings;

    const editorSettingsPages: number[] = [];

    if (hasCharacterEditorSettings) editorSettingsPages.push(PagesNavigationPages["hasCharacterEditorSettings"]);
    if (hasLevelEditorSettings) editorSettingsPages.push(PagesNavigationPages["hasLevelEditorSettings"]);
    if (hasPostRecordEditorSettings) editorSettingsPages.push(PagesNavigationPages["hasPostRecordEditorSettings"]);

    for (const v of new Set([...editorSettingsPages, ...pagesNavigation.pages]))
        if (editorSettingsPages.filter((e) => e === v).length !== pagesNavigation.pages.filter((e) => e === v).length)
            return false;

    return true;
};
