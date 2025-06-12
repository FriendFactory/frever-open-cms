import React from "react";
import { Card, Col, Image, Row } from "antd";
import styled from "styled-components";

export interface PhotoMediaFileProps {
    loading: boolean;
    url?: string;
    extra?: React.ReactNode;
}

export function PhotoMediaFile({ url, loading, extra }: PhotoMediaFileProps) {
    return (
        <Card title="Media file" loading={loading} extra={extra}>
            <Row justify="center">
                <Col>{url && <Img height="400px" src={url} />}</Col>
            </Row>
        </Card>
    );
}

const Img = styled(Image)`
    object-fit: cover;
`;
