import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Col, Form, Input, message, Modal, Row } from "antd";

import { boostUserStatsAction } from "../../store";
import { CurrencySupply, User } from "../../services";

export interface CurrencyContainerProps {
    stage: string;
    users: User[] | undefined;
}

interface CurrencyFormData extends Omit<CurrencySupply, "groupIds"> {
    groupIds?: string;
}

export function CurrencyContainer({ users, stage }: CurrencyContainerProps) {
    const dispatch = useDispatch();

    const [form] = Form.useForm<CurrencyFormData>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOnFinish = (action: "increase" | "decrease") => async () => {
        const formData = await form.validateFields();

        const groupIds = users?.length
            ? users.map((el) => el.mainGroupId)
            : Array.from(
                  new Set(
                      formData.groupIds
                          ?.split(",")
                          .map((el) => Number(el.trim()))
                          .filter(Boolean)
                  )
              );

        if (groupIds?.length) {
            if (action === "decrease") {
                let { softCurrencyAmount, hardCurrencyAmount } = formData;
                if (softCurrencyAmount) {
                    formData.softCurrencyAmount! = -softCurrencyAmount;
                }
                if (hardCurrencyAmount) {
                    formData.hardCurrencyAmount! = -hardCurrencyAmount;
                }
            }
            setIsModalOpen(false);
            dispatch(boostUserStatsAction({ stage, command: { type: "Currency", value: { ...formData, groupIds } } }));
        } else {
            message.error("Missed Group ID(s)");
        }
    };

    const handleOnCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    return (
        <div>
            <div onClick={() => setIsModalOpen(true)}>Boost currency</div>
            <Modal destroyOnClose title="Currency" open={isModalOpen} onCancel={handleOnCancel} footer={false}>
                <Form form={form} layout="vertical">
                    <Row gutter={24} justify="end">
                        {!users?.length && (
                            <Col span={24}>
                                <Form.Item name="groupIds" label="Group IDs">
                                    <Input.TextArea />
                                </Form.Item>
                            </Col>
                        )}
                        <Col span={12}>
                            <Form.Item name="softCurrencyAmount" label="Soft Currency Amount">
                                <Input type="number" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="hardCurrencyAmount" label="Hard Currency Amount">
                                <Input type="number" />
                            </Form.Item>
                        </Col>

                        <Col>
                            <Row gutter={12}>
                                <Col>
                                    <Form.Item noStyle>
                                        <Button onClick={handleOnFinish("decrease")} danger>
                                            Decrease
                                        </Button>
                                    </Form.Item>
                                </Col>
                                <Col>
                                    <Form.Item noStyle>
                                        <Button onClick={handleOnFinish("increase")} type="primary" ghost>
                                            Increase
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    );
}
