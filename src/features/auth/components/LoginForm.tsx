import React from "react";
import { Button, Result, Form, Input, Row } from "antd";
import { Link } from "react-router-dom";

import { Credentials } from "../services/storage";
import { AuthStatus } from "..";

export interface LoginFormProps {
    isNotLastStep: boolean;
    loading: boolean;
    authStatus: AuthStatus;
    isSomeServerSelected: boolean;
    urlToHomepage?: string;
    handleLogin: (newValue: Credentials) => void;
    handleResetAuth: () => void;
}

export function LoginForm({
    isNotLastStep,
    authStatus,
    loading,
    isSomeServerSelected,
    urlToHomepage,
    handleLogin,
    handleResetAuth
}: LoginFormProps) {
    const [form] = Form.useForm();
    const cleanTokenField = () => form.resetFields(["verification_token"]);
    return (
        <div>
            {authStatus === "finished" && urlToHomepage ? (
                <Result
                    status="success"
                    title="Login success"
                    extra={[
                        <Link to={urlToHomepage ?? ""}>
                            <Button type="primary">Open CMS</Button>
                        </Link>
                    ]}
                />
            ) : (
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={(form) => {
                        cleanTokenField();
                        handleLogin(form);
                    }}>
                    <Form.Item name="email" label="Email">
                        <Input
                            required
                            name="email"
                            disabled={loading || authStatus === "in-process" || !isSomeServerSelected}
                            type="email"
                        />
                    </Form.Item>
                    {authStatus === "in-process" && (
                        <Form.Item
                            name="verification_token"
                            rules={[
                                {
                                    len: 6,
                                    message: "Verification code must be 6 digits long."
                                }
                            ]}
                            label="Verification code">
                            <Input disabled={loading} required name="verification_token" />
                        </Form.Item>
                    )}

                    <Form.Item>
                        <Button block type="primary" disabled={loading || !isSomeServerSelected} htmlType="submit">
                            {authStatus === "in-process"
                                ? `Verify ${isNotLastStep ? "and send next verification code" : ""}`
                                : "Send code"}
                        </Button>
                    </Form.Item>
                </Form>
            )}

            <Row justify="space-between" wrap={false}>
                {authStatus !== "initial" && (
                    <Button danger onClick={handleResetAuth}>
                        Reset authentication
                    </Button>
                )}
                {urlToHomepage && <Button type="dashed">{<Link to={urlToHomepage}>Continue</Link>}</Button>}
            </Row>
        </div>
    );
}
