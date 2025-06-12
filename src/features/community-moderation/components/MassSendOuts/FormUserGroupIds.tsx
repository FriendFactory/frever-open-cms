import React from "react";
import { Button, Col, Form, Input, Row, Space, Typography } from "antd";
import { UploadCsvFile } from "shared";
import { UploadOutlined } from "@ant-design/icons";

export function FormUserGroupIds() {
    const form = Form.useFormInstance();

    const handleRead = (data: string[][]) => {
        const groupIds = data.map((row) => row[0]).filter(Boolean) as string[];

        form?.setFieldValue("groupIds", groupIds.join(", "));
        form?.validateFields(["groupIds"]);
    };

    const handleValidate = (data: string[][]) => data.every((row) => row && !isNaN(Number(row[0])));

    const Label = () => (
        <Space>
            <Typography>Group Ids</Typography>
            <UploadCsvFile onParsedData={handleRead} validate={handleValidate} parseConfig={{ header: false }}>
                <Button icon={<UploadOutlined />}>Upload CSV</Button>
            </UploadCsvFile>
        </Space>
    );

    return (
        <Row gutter={24} align="bottom">
            <Col span={24}>
                <Form.Item
                    name="groupIds"
                    label={<Label />}
                    validateDebounce={1000}
                    rules={[
                        {
                            pattern: /^\s*\d+(?:\s*,\s*\d+)*\s*$/,
                            message: "Invalid format. Use numeric IDs separated by commas."
                        }
                    ]}>
                    <Input.TextArea
                        style={{ resize: "none" }}
                        autoSize={{ minRows: 4, maxRows: 8 }}
                        placeholder="Enter a list of IDs separated by commas (e.g., 123, 456, 789)"
                    />
                </Form.Item>
            </Col>
        </Row>
    );
}
