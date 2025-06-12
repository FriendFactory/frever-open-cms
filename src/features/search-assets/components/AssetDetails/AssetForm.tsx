import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, message } from "antd";
import { Store } from "antd/lib/form/interface";
import { useForm } from "antd/lib/form/Form";

import { AssetActionsContainer } from "features/search-assets/containers/AssetDetails/AssetActionsContainer";
import { FixedPageHeader } from "shared";
import { replaceFalsyValuesWithNull } from "utils";

interface AssetFormProps {
    loading: boolean;
    disabled: boolean;
    informationSection?: React.ReactNode;
    organizationSection?: React.ReactNode;
    initialValues?: Store;
    onSubmit: (data: Store) => void;
}

export function AssetForm({
    onSubmit,
    loading,
    disabled,
    informationSection,
    organizationSection,
    initialValues
}: AssetFormProps) {
    const [form] = useForm();
    const [isSaveHeaderOpen, setIsSaveHeaderOpen] = useState<boolean>(false);

    const openSaveHeader = () => setIsSaveHeaderOpen(true);

    const hideSaveHeader = () => setIsSaveHeaderOpen(false);

    const handleOnReset = () => {
        form.resetFields();
        hideSaveHeader();
    };

    useEffect(() => {
        if (initialValues) form.resetFields();
    }, [initialValues]);

    const handleOnFinish = async () => {
        const values = await form.validateFields();
        onSubmit(replaceFalsyValuesWithNull(values));
        hideSaveHeader();
    };

    const handleOnFinishFailed = () => {
        message.error("Validation error: Please, check form fields");
        return;
    };

    return (
        <div className="AssetForm">
            <Form
                form={form}
                disabled={disabled}
                layout="vertical"
                scrollToFirstError
                onFieldsChange={openSaveHeader}
                onReset={handleOnReset}
                onFinish={handleOnFinish}
                onFinishFailed={handleOnFinishFailed}
                initialValues={initialValues}>
                <Row gutter={[24, 24]}>
                    {!!informationSection && (
                        <Col span={24}>
                            <Card loading={loading} title="Information" extra={<AssetActionsContainer />}>
                                {informationSection}
                            </Card>
                        </Col>
                    )}
                    {!!organizationSection && (
                        <Col span={24}>
                            <Card loading={loading} title="Organization">
                                {organizationSection}
                            </Card>
                        </Col>
                    )}
                </Row>

                {isSaveHeaderOpen && (
                    <FixedPageHeader
                        title="Unsaved changes"
                        extra={
                            <>
                                <Button onClick={handleOnReset}>Discard</Button>
                                <Button type="primary" onClick={handleOnFinish}>
                                    Save
                                </Button>
                            </>
                        }
                    />
                )}
            </Form>
        </div>
    );
}
