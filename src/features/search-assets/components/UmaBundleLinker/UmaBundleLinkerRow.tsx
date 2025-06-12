import React from "react";
import { SwapOutlined } from "@ant-design/icons";
import { Button, Card, Col, Divider, Row, Typography } from "antd";

import { UmaBundle } from "features/search-assets/services";
import styled from "styled-components";

const { Text } = Typography;
const { Meta } = Card;

export interface UmaBundleLinkerRowProps {
    baseBundle?: UmaBundle;
    versionBundle?: UmaBundle;
    isBundlesLinked: boolean;
    handleBindBundles: () => void;
}

export function UmaBundleLinkerRow({
    baseBundle,
    versionBundle,
    isBundlesLinked,
    handleBindBundles
}: UmaBundleLinkerRowProps) {
    return (
        <div>
            <Row justify="space-between" align="middle" gutter={16}>
                <Col span={10}>
                    <CardContainer>
                        <Meta
                            title="Base Bundle"
                            description={
                                baseBundle ? (
                                    <Text>
                                        ID: {baseBundle.id}
                                        <br />
                                        Name: {baseBundle.assetBundleName}
                                    </Text>
                                ) : (
                                    <Text>Not Selected</Text>
                                )
                            }
                        />
                    </CardContainer>
                </Col>

                <SwapOutlined />

                <Col span={10}>
                    <CardContainer>
                        <Meta
                            title="Version Bundle"
                            description={
                                versionBundle ? (
                                    <Text>
                                        ID: {versionBundle.id}
                                        <br />
                                        Name: {versionBundle.assetBundleName}
                                    </Text>
                                ) : (
                                    <Text>Not Selected</Text>
                                )
                            }
                        />
                    </CardContainer>
                </Col>
                <Col span={2}>
                    <Button
                        block
                        disabled={!baseBundle || !versionBundle}
                        onClick={handleBindBundles}
                        type="primary"
                        danger={isBundlesLinked}>
                        {isBundlesLinked ? "Unbind" : "Bind"}
                    </Button>
                </Col>
            </Row>
            <Divider />
        </div>
    );
}

const CardContainer = styled(Card)`
    min-height: 120px;
`;
