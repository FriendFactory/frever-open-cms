import React, { useState } from "react";
import { Row, Col, Form, Input, Select, Switch } from "antd";
import { Store } from "antd/lib/form/interface";
import { Rule } from "antd/es/form";
import { useForm } from "antd/lib/form/Form";

import { useExtraDataBundle } from "shared/hooks/useExtraData";
import { EventOfLevel } from "../services";
import { EVENT_DETAILS_PAGE_URL } from "urls";
import { createOptionsExtraBundle, ProtectedLink } from "shared";

const { Option } = Select;

const rules: Rule[] = [{ required: true, message: "This field is required" }];

export interface CreateTemplateFormProps {
    stage: string;
    events?: EventOfLevel[];
    createTemplate: (form: Store) => void;
}

export function CreateTemplateForm({ stage, events, createTemplate }: CreateTemplateFormProps) {
    const [form] = useForm();
    const [categoryId, setCategoryId] = useState<number>(1);
    const { bundle, loading } = useExtraDataBundle(["TemplateCategory", "TemplateSubCategory", "Readiness"]);

    const handleChangeCategory = (categoryId: number) => {
        setCategoryId(categoryId);
        const firstSubCategory = createOptionsExtraBundle(
            "TemplateSubCategory",
            bundle,
            undefined,
            (category) => category.templateCategoryId === categoryId
        )?.find(Boolean);

        form.setFieldValue("templateSubCategoryId", { ...firstSubCategory });
    };

    return (
        <Form
            form={form}
            id="create-template"
            layout="vertical"
            initialValues={{ templateSubCategoryId: 1 }}
            onFinish={createTemplate}>
            <Form.Item name="eventId" label="Event" rules={rules}>
                <Select>
                    {events?.map((event: EventOfLevel) => (
                        <Option key={event.eventId} value={event.eventId}>
                            <Row justify="space-between">
                                <Col>{`${event.title}. ID: ${event.eventId}`}</Col>
                                <Col>
                                    <ProtectedLink
                                        feature="Social"
                                        to={EVENT_DETAILS_PAGE_URL.format({ stage, id: event.eventId })}
                                        target="_blank">
                                        Open Event
                                    </ProtectedLink>
                                </Col>
                            </Row>
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item name="title" label="Temp Name" rules={rules}>
                <Input />
            </Form.Item>

            <Form.Item name="readinessId" label="Readiness" rules={rules}>
                <Select loading={loading} options={createOptionsExtraBundle("Readiness", bundle)} />
            </Form.Item>

            <Form.Item label="Template Category">
                <Select
                    loading={loading}
                    defaultValue={categoryId}
                    onChange={handleChangeCategory}
                    options={createOptionsExtraBundle("TemplateCategory", bundle)}
                />
            </Form.Item>

            <Form.Item name="templateSubCategoryId" label="Template SubCategory" rules={rules}>
                <Select
                    loading={loading}
                    optionLabelProp="label"
                    options={createOptionsExtraBundle(
                        "TemplateSubCategory",
                        bundle,
                        undefined,
                        (category) => category.templateCategoryId === categoryId
                    )}
                />
            </Form.Item>

            <Form.Item name="songName" label="Song Name">
                <Input />
            </Form.Item>

            <Form.Item name="isDeleted" label="Is Deleted" valuePropName="checked">
                <Switch />
            </Form.Item>

            <Form.Item name="reverseThumbnail" label="Reverse Thumbnail" valuePropName="checked">
                <Switch />
            </Form.Item>
        </Form>
    );
}
