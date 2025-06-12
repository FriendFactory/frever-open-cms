import React, { useState } from "react";
import { Card, Row, Col, Button, Form, Input, Switch, TreeSelect } from "antd";

import { Template } from "features/video-templates/services";
import { FixedPageHeader, SelectWithExtraDataOptions } from "shared";
import { useExtraData } from "shared/hooks/useExtraData";

export interface TemplateFormProps {
    stage: string;
    data?: Template;
    loading: boolean;
    onSubmit: (form: Partial<Template>) => void;
}

export function TemplateForm({ stage, loading, onSubmit, data }: TemplateFormProps) {
    const [isSaveTitleVisible, setIsSaveTitleVisible] = useState<boolean>(false);

    const templateCategory = useExtraData({ stage, name: "TemplateCategory" });
    const templateSubCategory = useExtraData({ stage, name: "TemplateSubCategory" });

    const treeData =
        templateCategory.data &&
        templateSubCategory.data &&
        templateCategory.data.map((cate) => ({
            title: cate.name,
            value: cate.name,
            selectable: false,
            children: templateSubCategory.data
                ?.filter((subCate) => subCate.templateCategoryId === cate.id)
                .map((subCate) => ({
                    title: subCate.name,
                    value: subCate.id
                }))
        }));

    return (
        <Card title="Organization" loading={loading}>
            {data && (
                <Form
                    disabled={loading || templateCategory.loading || templateSubCategory.loading}
                    layout="vertical"
                    initialValues={data}
                    onFinish={(f) => {
                        onSubmit(f);
                        setIsSaveTitleVisible(false);
                    }}
                    onReset={() => setIsSaveTitleVisible(false)}
                    onFieldsChange={() => setIsSaveTitleVisible(true)}>
                    <Row gutter={24} align="bottom">
                        <Col xs={24} xl={12}>
                            <Form.Item name="title" label="Temp Name">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} xl={12}>
                            <Form.Item name="readinessId" label="Readiness">
                                <SelectWithExtraDataOptions stage={stage} name="Readiness" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} xl={12}>
                            <Form.Item label="Template Sub Category" name="templateSubCategoryId">
                                <TreeSelect treeData={treeData} treeDefaultExpandAll />
                            </Form.Item>
                        </Col>
                        <Col xs={24} xl={12}>
                            <Form.Item name="categorySortingOrder" label="Sort Order in Category">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} xl={12}>
                            <Form.Item name="subCategorySortingOrder" label="Sort Order in SubCategory">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} xl={12}>
                            <Form.Item name="trendingSortingOrder" label="Trending Sorting Order">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} xl={12}>
                            <Form.Item name="promotionalSortingOrder" label="Promotional Sorting Order">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} xl={12}>
                            <Form.Item name="challengeSortOrder" label="Challenge Sort Order">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} xl={12}>
                            <Form.Item name="onBoardingSortingOrder" label="OnBoarding Sorting Order">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} xl={12}>
                            <Form.Item name="topListPositionInDiscovery" label="TopList Position In Discovery">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item name="description" label="Description">
                                <Input.TextArea />
                            </Form.Item>
                        </Col>
                        <Col xs={24} xl={12}>
                            <Form.Item name="reverseThumbnail" label="Reverse Thumbnail" valuePropName="checked">
                                <Switch />
                            </Form.Item>
                        </Col>
                        <Col xs={24} xl={12}>
                            <Form.Item name="isDefault" label="Is Default" valuePropName="checked">
                                <Switch />
                            </Form.Item>
                        </Col>
                        {isSaveTitleVisible && (
                            <FixedPageHeader
                                title="Unsaved changes"
                                extra={[
                                    <Button htmlType="reset">Discard</Button>,
                                    <Button type="primary" htmlType="submit">
                                        Save
                                    </Button>
                                ]}
                            />
                        )}
                    </Row>
                </Form>
            )}
        </Card>
    );
}
