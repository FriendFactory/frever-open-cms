import React from "react";
import { Button, Col, Form, Input, Radio, Row } from "antd";

import { GeoClustersListQueryParams } from "../services";
import { SearchOutlined } from "@ant-design/icons";
import { FormInstance } from "antd/lib/form/Form";
import styled from "styled-components";

interface GeoClusterSearchFilter {
    form: FormInstance<GeoClustersListQueryParams>;
    values?: GeoClustersListQueryParams;
    onSearch: () => void;
}

export function GeoClusterSearchFilter({ form, values, onSearch }: GeoClusterSearchFilter) {
    return (
        <Form layout="horizontal" form={form} initialValues={values}>
            <Row gutter={[24, 0]}>
                <Col flex="1 0 140px">
                    <Form.Item name="id" label="ID">
                        <Input onPressEnter={onSearch} />
                    </Form.Item>
                </Col>

                <Col flex="1 0 220px">
                    <Form.Item name="title" label="Title">
                        <Input onPressEnter={onSearch} />
                    </Form.Item>
                </Col>

                <Button type="primary" icon={<SearchOutlined />} onClick={onSearch}>
                    Search
                </Button>

                <RightAligned>
                    <Form.Item name="isActive" label="Is Active">
                        <Radio.Group value={values?.isActive} onChange={onSearch}>
                            <Radio.Button value="true">Yes</Radio.Button>
                            <Radio.Button value="false">No</Radio.Button>
                            <Radio.Button value={undefined}>All</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </RightAligned>
            </Row>
        </Form>
    );
}

const RightAligned = styled(Col)`
    margin-left: auto;
`;
