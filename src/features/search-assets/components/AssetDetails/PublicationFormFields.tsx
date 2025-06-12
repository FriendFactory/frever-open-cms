import { Col, DatePicker, Form } from "antd";
import React from "react";

export function PublicationFormFields() {
    return (
        <>
            <Col xs={24} xl={12}>
                <Form.Item name="publicationDate" label="Publication Date">
                    <DatePicker style={{ width: "100%" }} showTime={{ format: "HH:mm" }} format="YYYY-MM-DD HH:mm" />
                </Form.Item>
            </Col>
            <Col xs={24} xl={12}>
                <Form.Item name="depublicationDate" label="Depublication Date">
                    <DatePicker style={{ width: "100%" }} showTime={{ format: "HH:mm" }} format="YYYY-MM-DD HH:mm" />
                </Form.Item>
            </Col>
        </>
    );
}
