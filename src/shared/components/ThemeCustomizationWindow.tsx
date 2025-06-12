import React, { useState } from "react";
import { Form, Modal, Switch } from "antd";
import { useForm } from "antd/es/form/Form";

import { getThemeParams, setThemeParams, ThemeParams } from "shared/containers/ThemeProvider";

export const ThemeCustomizationWindow = () => {
    const [form] = useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const themeParams = getThemeParams();

    const hideModal = () => setIsModalOpen(false);
    const showModal = () => setIsModalOpen(true);

    const hadnleOnFinish = (newValues: ThemeParams) => {
        setThemeParams(newValues);
        hideModal();
        history.go(0);
    };

    return (
        <>
            <div onClick={showModal}>Theme</div>
            <Modal
                title="Theme Customization"
                open={isModalOpen}
                onOk={form.submit}
                okText="Apply"
                onCancel={hideModal}>
                <Form form={form} layout="horizontal" initialValues={themeParams} onFinish={hadnleOnFinish}>
                    <Form.Item name="dark" label="Dark" valuePropName="checked">
                        <Switch />
                    </Form.Item>

                    <Form.Item name="compact" label="Compact" valuePropName="checked">
                        <Switch />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
