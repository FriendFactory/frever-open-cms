import React from "react";
import { Divider, Form, FormInstance, Typography } from "antd";

import { TaskFormData } from "./CreateTaskForm";
import { Template } from "features/video-templates/services";
import { SearchForTemplateModalContainer } from "../containers/CreateTask/SearchForTemplateModalContainer";
import { useCurrentStage } from "shared";

export function TaskTemplateFormItem({ getFieldValue, setFieldValue }: FormInstance<TaskFormData>) {
    const stage = useCurrentStage();
    const value: number | undefined = getFieldValue("templateId");

    const handleOnClick = (template: Template) => {
        setFieldValue("templateId", template.id);
        setFieldValue("templateCharactersCount", template.characterCount);
    };

    const removeValues = () => {
        setFieldValue("templateId", null);
        setFieldValue("templateCharactersCount", null);
    };

    return (
        <>
            <Form.Item name="templateCharactersCount" noStyle>
                <div></div>
            </Form.Item>
            <Form.Item name="templateId" noStyle>
                <div></div>
            </Form.Item>
            Template: {value} &nbsp;
            <SearchForTemplateModalContainer
                stage={stage}
                btnText={value ? "Change" : "Select"}
                onVideoClick={handleOnClick}
            />
            {value && (
                <>
                    <Divider type="vertical" />
                    <Typography.Link type="danger" onClick={removeValues}>
                        Remove
                    </Typography.Link>
                </>
            )}
        </>
    );
}
