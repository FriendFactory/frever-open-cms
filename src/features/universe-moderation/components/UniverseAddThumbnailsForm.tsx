import React from "react";
import { Col, Form, FormProps, Row, Space } from "antd";
import { Gutter } from "antd/es/grid/row";
import { ImageFormField } from "shared";

const gutter: [Gutter, Gutter] = [24, 24];

export type UniverseThumbnailsFormInitialValues = {
    thumbnail_64: File;
    thumbnail_128: File;
    thumbnail_512: File;
};

export interface UniverseAddThumbnailsFormProps extends FormProps {
    initialValues?: UniverseThumbnailsFormInitialValues;
    stage: string;
    withThumbnailSelect?: boolean;
}

export const UniverseAddThumbnailsForm = ({
    stage,
    withThumbnailSelect,
    ...formProps
}: UniverseAddThumbnailsFormProps) => {
    return (
        <Form layout="vertical" {...formProps}>
            <Row gutter={gutter}>
                {withThumbnailSelect && (
                    <Col span={24}>
                        <Space style={{ width: "100%" }} direction="vertical">
                            <ImageFormField
                                requiredExtensions={["image/png"]}
                                pathname="thumbnail_64"
                                btnText="64x64"
                            />
                            <ImageFormField
                                requiredExtensions={["image/png"]}
                                pathname="thumbnail_128"
                                btnText="128x128"
                            />
                            <ImageFormField
                                requiredExtensions={["image/png"]}
                                pathname="thumbnail_512"
                                btnText="512x512"
                            />
                        </Space>
                    </Col>
                )}
            </Row>
        </Form>
    );
};
