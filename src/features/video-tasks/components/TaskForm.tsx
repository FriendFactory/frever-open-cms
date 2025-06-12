import React from "react";
import { Col, DatePicker, Form, FormProps, Input, Row, Select, Switch } from "antd";
import { Dayjs } from "dayjs";

import { Task } from "../services";
import { taskType } from "../constants";
import { SelectWithExtraDataOptions } from "shared";
import { EventOfLevel } from "features/video-moderation/services";
import { EditorSettingsFormItem } from "./EditorSettingsFormItem";
import { PagesNavigationsFormItem } from "./PagesNavigationsFormItem";

export interface TaskFormValues extends Partial<Omit<Task, "deadline" | "publishingTime" | "pagesNavigation">> {
    deadline: Dayjs;
    publishingTime: Dayjs;
    pagesNavigationId: number;
}

export interface TaskFormProps extends FormProps {
    stage: string;
    events?: EventOfLevel[];
    eventsLoading: boolean;
}

export function TaskForm({ stage, eventsLoading, events, ...formProps }: TaskFormProps) {
    return (
        <Form layout="vertical" {...formProps}>
            <Row gutter={24}>
                <Form.Item name="characterReplacement" noStyle>
                    <div></div>
                </Form.Item>
                <Col xs={24} xl={12}>
                    <Form.Item name="name" label="Name">
                        <Input />
                    </Form.Item>
                </Col>

                <Col xs={24} xl={12}>
                    <Form.Item name="readinessId" label="Readiness">
                        <SelectWithExtraDataOptions stage={stage} name="Readiness" />
                    </Form.Item>
                </Col>

                <Col xs={24} xl={12}>
                    <Form.Item name="taskType" label="Task Type">
                        <Select options={taskType.map((taskType) => ({ value: taskType.id, label: taskType.name }))} />
                    </Form.Item>
                </Col>

                <Col xs={24} xl={12}>
                    <Form.Item name="bonusTagId" label="Bonus Tag">
                        <SelectWithExtraDataOptions stage={stage} name="Tag" />
                    </Form.Item>
                </Col>

                <Col xs={24} xl={12}>
                    <Form.Item shouldUpdate noStyle>
                        {(props) => <EditorSettingsFormItem stage={stage} {...(props as any)} />}
                    </Form.Item>
                </Col>

                <Col xs={24} xl={12}>
                    <Form.Item shouldUpdate noStyle>
                        {(props) => <PagesNavigationsFormItem stage={stage} {...(props as any)} />}
                    </Form.Item>
                </Col>

                <Col xs={24} xl={12}>
                    <Form.Item name="sortOrder" label="Sort Order">
                        <Input type="number" name="sortOrder" />
                    </Form.Item>
                </Col>

                <Col xs={24} xl={12}>
                    <Form.Item name="totalTime" label="Total Time">
                        <Input type="number" name="totalTime" />
                    </Form.Item>
                </Col>

                <Col xs={24} xl={12}>
                    <Form.Item name="xpPayout" label="XP Payout">
                        <Input type="number" name="xpPayout" />
                    </Form.Item>
                </Col>

                <Col xs={24} xl={12}>
                    <Form.Item name="bonusXp" label="Public Bonus Xp">
                        <Input type="number" name="publicBonusXp" />
                    </Form.Item>
                </Col>

                <Col xs={24} xl={12}>
                    <Form.Item name="softCurrencyPayout" label="Soft Currency Payout">
                        <Input type="number" name="softCurrencyPayout" />
                    </Form.Item>
                </Col>

                <Col xs={24} xl={12}>
                    <Form.Item name="bonusSoftCurrency" label="Public Bonus Soft Currency">
                        <Input type="number" />
                    </Form.Item>
                </Col>

                <Col xs={24} xl={12}>
                    <Form.Item name="publishingTime" label="Publishing Time">
                        <DatePicker
                            style={{ width: "100%" }}
                            allowClear={false}
                            showTime={{ format: "HH:mm" }}
                            format="YYYY-MM-DD HH:mm"
                        />
                    </Form.Item>
                </Col>

                <Col xs={24} xl={12}>
                    <Form.Item name="deadline" label="Deadline">
                        <DatePicker
                            style={{ width: "100%" }}
                            allowClear={false}
                            showTime={{ format: "HH:mm" }}
                            format="YYYY-MM-DD HH:mm"
                        />
                    </Form.Item>
                </Col>

                {events?.length && (
                    <Col span={24}>
                        <Form.Item name="eventSequenceNumbers" label="Event Sequence Numbers">
                            <Select
                                loading={eventsLoading}
                                mode="multiple"
                                options={events.map((event: EventOfLevel) => ({
                                    label: event.title,
                                    value: event.levelSequence
                                }))}
                            />
                        </Form.Item>
                    </Col>
                )}

                <Col span={24}>
                    <Form.Item name="description" label="Description">
                        <Input.TextArea rows={1} autoSize />
                    </Form.Item>
                </Col>

                <Col xs={24} xl={12}>
                    <Form.Item name="isDressed" label="Is Dressed" valuePropName="checked">
                        <Switch />
                    </Form.Item>
                </Col>

                <Col xs={24} xl={12}>
                    <Form.Item name="deletionAllowed" label="Deletion Allowed" valuePropName="checked">
                        <Switch />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}
