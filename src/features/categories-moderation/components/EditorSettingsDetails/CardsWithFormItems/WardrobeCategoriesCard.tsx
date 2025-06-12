import React from "react";
import { Card, Col, Form, Row } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

import { AddWardrobeCategory } from "./AddWardrobeCategory";
import { CharacterEditorWardrobeCategory, WardrobeCategoryCard } from "./WardrobeCategoryCard";

interface WardrobeCategoriesCardProps {
    stage: string;
}

export function WardrobeCategoriesCard({ stage }: WardrobeCategoriesCardProps) {
    return (
        <Card title="Wardrobe Categories">
            <Form.Item noStyle name={["characterEditorSettings", "wardrobeCategories"]} rules={[{ required: false }]}>
                <div></div>
            </Form.Item>
            <Form.Item shouldUpdate>
                {({ getFieldValue, setFieldValue, validateFields }) => {
                    const pathName = ["characterEditorSettings", "wardrobeCategories"];

                    const values: CharacterEditorWardrobeCategory[] | undefined = getFieldValue(pathName);

                    const updateCategories = (action: "add" | "remove") => (id: number) => {
                        if (values) {
                            const newValues =
                                action === "add"
                                    ? [...values, { id, subcategories: [] }]
                                    : values.filter((el) => el.id !== id);

                            setFieldValue(pathName, newValues);
                            validateFields([pathName]);
                        }
                    };

                    const updateSubCategory = (value: CharacterEditorWardrobeCategory) => {
                        values && setFieldValue(pathName, [...values.map((el) => (el.id === value.id ? value : el))]);
                        validateFields([pathName]);
                    };

                    return (
                        <Row gutter={[24, 24]}>
                            <Col span={24}>
                                <AddWardrobeCategory
                                    stage={stage}
                                    addedCategories={values?.map((el) => el.id)}
                                    addNewCategory={updateCategories("add")}
                                />
                            </Col>
                            <Col span={24}>
                                <Row gutter={[24, 24]} justify="start">
                                    {values?.map((value) => (
                                        <Col key={value.id} flex="1 1 420px">
                                            <WardrobeCategoryCard
                                                stage={stage}
                                                value={value}
                                                updateSubCategory={updateSubCategory}
                                                extra={
                                                    <MinusCircleOutlined
                                                        onClick={() => updateCategories("remove")(value.id)}
                                                    />
                                                }
                                            />
                                        </Col>
                                    ))}
                                </Row>
                            </Col>
                        </Row>
                    );
                }}
            </Form.Item>
        </Card>
    );
}
