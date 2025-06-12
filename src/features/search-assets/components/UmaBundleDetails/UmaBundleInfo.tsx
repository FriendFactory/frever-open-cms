import React from "react";
import { Card, Col, Row } from "antd";

import { UmaBundle } from "features/search-assets/services";
import { CommonExtraDataType } from "shared";

export interface UmaBundleInfoProps {
    data: UmaBundle;
    readinessList: CommonExtraDataType[];
}

export function UmaBundleInfo({ data, readinessList }: UmaBundleInfoProps) {
    return (
        <Card title="Information">
            <Row gutter={[16, 16]} justify="start">
                <CustomCol label="ID" text={data.id} />
                <CustomCol label="Group ID" text={data.groupId} />
                <CustomCol label="Size" text={`${data.sizeKb} Kb`} />
                <CustomCol label="Asset Bundle Name" text={data.assetBundleName} />
                <CustomCol label="Asset Bundle Hash" text={data.assetBundleHash} />
                <CustomCol label="Readiness" text={readinessList.find((el) => el.id === data.readinessId)?.name} />
            </Row>
        </Card>
    );
}

export interface CustomColProps {
    label: string | number;
    text?: string | number | null;
}

export const CustomCol = ({ label, text }: CustomColProps) => (
    <Col xs={24} md={12} xl={8}>
        {label}: {text ?? "None"}
    </Col>
);

