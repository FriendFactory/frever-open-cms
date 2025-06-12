import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Row, Select } from "antd";

import { useExtraData } from "shared/hooks/useExtraData";

interface WardrobeCategoriesFieldProps {
    stage: string;
    addedCategories?: number[];
    addNewCategory: (id: number) => void;
}

export function AddWardrobeCategory({ stage, addedCategories, addNewCategory }: WardrobeCategoriesFieldProps) {
    const wardrobeCategories = useExtraData({ stage, name: "WardrobeCategory" });

    const [category, setCategory] = useState(null);

    const handleOnClick = () => {
        if (category) {
            addNewCategory(category);
            setCategory(null);
        }
    };

    return (
        <Row gutter={8} wrap={false}>
            <Col flex="1 1 300px">
                <Select value={category} onChange={setCategory}>
                    {wardrobeCategories.data
                        ?.filter((category) => !addedCategories?.find((el) => category.id === el))
                        .map((el) => (
                            <Select.Option key={el.id} value={el.id}>
                                {el.name}
                            </Select.Option>
                        ))}
                </Select>
            </Col>
            <Col>
                <Button type="dashed" onClick={handleOnClick} block icon={<PlusOutlined />}>
                    Add Category
                </Button>
            </Col>
        </Row>
    );
}
