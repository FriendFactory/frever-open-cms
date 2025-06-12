import React from "react";
import { Col, Form, FormProps, Input, Row, Select, Switch } from "antd";
import { SelectWithExtraDataOptions, useCurrentStage } from "shared";
import { SeasonListPageResult } from "features/seasons-moderation/store/reducer/seasonList.reducer";
import { useUniverseSearch } from "features/universe-moderation";

const rules = [{ required: true }];

export interface ThemeCollectionInfoFormProps extends FormProps {
    seasonList: SeasonListPageResult;
}

export function ThemeCollectionInfoForm({ seasonList, ...props }: ThemeCollectionInfoFormProps) {
    const stage = useCurrentStage();
    const universeInfo = useUniverseSearch({ stage });

    return (
        <Form layout="vertical" {...props}>
            <Row gutter={24}>
                <Col sm={24} md={12}>
                    <Form.Item label="Name" name="name" rules={rules}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col sm={24} md={12}>
                    <Form.Item label="Readiness" name="readinessId">
                        <SelectWithExtraDataOptions stage={stage} name="Readiness" />
                    </Form.Item>
                </Col>
                <Col sm={24} md={12}>
                    <Form.Item label="Universe" name="universeId" rules={rules}>
                        <Select
                            loading={universeInfo.info?.loading}
                            options={universeInfo.info?.data?.map((universe) => ({
                                label: universe.name,
                                value: universe.id
                            }))}
                        />
                    </Form.Item>
                </Col>
                <Col sm={24} md={12}>
                    <Form.Item label="Season" name="seasonId">
                        <Select
                            loading={seasonList.loading}
                            allowClear
                            showSearch
                            options={seasonList.data?.map((season) => ({ label: season.title, value: season.id }))}
                            filterOption={(input, option) =>
                                (option?.label as string)?.toLowerCase().includes(input.toLowerCase())
                            }
                        />
                    </Form.Item>
                </Col>
                <Col sm={24} md={12}>
                    <Form.Item label="Sort Order" name="sortOrder">
                        <Input type="number" />
                    </Form.Item>
                </Col>

                <Col />

                <Col sm={24} md={12}>
                    <Form.Item
                        label="Has Large Marketing Thumbnail"
                        name="hasLargeMarketingThumbnail"
                        valuePropName="checked">
                        <Switch />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}
