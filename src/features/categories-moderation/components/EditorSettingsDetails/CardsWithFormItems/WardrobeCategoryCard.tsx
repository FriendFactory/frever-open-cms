import React, { useCallback, useMemo, useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Select, List, Button, Card, Col, Row, Checkbox, theme } from "antd";

import { EditorSettings } from "features/categories-moderation/services/api";
import { useExtraData } from "shared/hooks/useExtraData";
import styled from "styled-components";

export type CharacterEditorWardrobeCategory = EditorSettings["characterEditorSettings"]["wardrobeCategories"][number];

interface WardrobeCategoryCardProps {
    extra: React.ReactNode;

    stage: string;
    value: CharacterEditorWardrobeCategory;
    updateSubCategory: (value: CharacterEditorWardrobeCategory) => void;
}

export function WardrobeCategoryCard({ extra, stage, value, updateSubCategory }: WardrobeCategoryCardProps) {
    const [subCate, setSubCate] = useState(null);
    const wardrobeCategories = useExtraData({ stage, name: "WardrobeCategory" });
    const wardrobeSubCategories = useExtraData({ stage, name: "WardrobeSubCategory" });

    const subCategories = useMemo(
        () =>
            wardrobeSubCategories.data?.filter(
                (subCategory) =>
                    !value.subcategories.some((el) => el.id === subCategory.id) &&
                    value.id === subCategory.wardrobeCategoryId
            ),
        [value, wardrobeSubCategories]
    );

    const addSubCategory = () => {
        if (subCate) {
            updateSubCategory({
                id: value.id,
                subcategories: [...value.subcategories, { id: subCate, allowAdjustment: false }]
            });
            setSubCate(null);
        }
    };

    const removeSubCategory = useCallback(
        (id: number) => () =>
            updateSubCategory({
                id: value.id,
                subcategories: value.subcategories.filter((el) => el.id !== id)
            }),
        [value, updateSubCategory]
    );

    const changeAllowAdjustment = useCallback(
        (id: number) => () =>
            updateSubCategory({
                id: value.id,
                subcategories: value.subcategories.map((el) =>
                    el.id === id ? { id, allowAdjustment: !el.allowAdjustment } : el
                )
            }),
        [value, updateSubCategory]
    );

    return (
        <CardStyled
            extra={extra}
            title={wardrobeCategories.data?.find((category) => category.id === value.id)?.name ?? value.id}>
            <Row wrap={false} gutter={8}>
                <Col flex="1 1 200px">
                    <Select value={subCate} onChange={(id) => setSubCate(id)}>
                        {subCategories?.map((el) => (
                            <Select.Option key={el.id} value={el.id}>
                                {el.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Col>
                <Col>
                    <Button type="dashed" onClick={addSubCategory} block icon={<PlusOutlined />}>
                        Add
                    </Button>
                </Col>
            </Row>
            <List
                dataSource={value.subcategories}
                renderItem={(el) => (
                    <List.Item key={el.id}>
                        <List.Item.Meta
                            title={wardrobeSubCategories.data?.find((subCate) => subCate.id === el.id)?.name ?? el.id}
                            description={
                                <>
                                    <Checkbox checked={el.allowAdjustment} onClick={changeAllowAdjustment(el.id)} />
                                    &#160;
                                    <label>Allow Adjustment</label>
                                </>
                            }
                        />
                        <MinusCircleOutlined onClick={removeSubCategory(el.id)} />
                    </List.Item>
                )}
            />
        </CardStyled>
    );
}

const CardStyled = styled(Card)`
    background: ${() => {
        const { token } = theme.useToken();
        return token.colorBgLayout;
    }};
`;
