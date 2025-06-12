import React from "react";
import { Button, Col, Form, FormInstance, Input, Radio, Row, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { SpawnFormationQueryParams } from "../services";
import { ExtraDataBundleResult } from "shared/store";

export interface SpawnFormationListFilterFormProps {
    form: FormInstance<SpawnFormationQueryParams>;
    values: SpawnFormationQueryParams;
    onSearch: () => void;
    bundleData: ExtraDataBundleResult["bundle"];
}

export function SpawnFormationListFilterForm({
    form,
    values,
    onSearch,
    bundleData
}: SpawnFormationListFilterFormProps) {
    return (
        <Form form={form} initialValues={values}>
            <Row gutter={24} justify="start">
                <Col flex="180px">
                    <Form.Item name="id" label="ID">
                        <Input type="number" onPressEnter={onSearch} />
                    </Form.Item>
                </Col>
                <Col flex="250px">
                    <Form.Item name="name" label="Name">
                        <Input onPressEnter={onSearch} />
                    </Form.Item>
                </Col>
                <Col flex="250px">
                    <Form.Item name="characterCount" label="Character Count">
                        <Input type="number" onPressEnter={onSearch} />
                    </Form.Item>
                </Col>
                <Col flex="250px">
                    <Form.Item name="formationType" label="Formation Type">
                        <Select
                            onChange={onSearch}
                            allowClear
                            options={bundleData?.CharacterSpawnPositionFormationType?.data?.map((data) => ({
                                label: data.name,
                                value: data.id.toString()
                            }))}
                        />
                    </Form.Item>
                </Col>

                <Col flex="121px">
                    <Form.Item>
                        <Button type="primary" icon={<SearchOutlined />} onClick={onSearch}>
                            Search
                        </Button>
                    </Form.Item>
                </Col>

                <Col>
                    <Form.Item label="Multi Character Animation" name="multiCharacterAnimation">
                        <Radio.Group value={values?.multiCharacterAnimation} onChange={onSearch}>
                            <Radio.Button value={undefined}>All</Radio.Button>
                            <Radio.Button value="true">Yes</Radio.Button>
                            <Radio.Button value="false">No</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </Col>
                <Col>
                    <Form.Item label="Apply On Character Editing" name="applyOnCharacterEditing">
                        <Radio.Group value={values?.applyOnCharacterEditing} onChange={onSearch}>
                            <Radio.Button value={undefined}>All</Radio.Button>
                            <Radio.Button value="true">Yes</Radio.Button>
                            <Radio.Button value="false">No</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}
