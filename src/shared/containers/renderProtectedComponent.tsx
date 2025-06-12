import React from "react";
import { Alert, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { FeaturesTypes } from "config";
import { useAccessCheck } from "shared";

export interface ProtectedComponentProps {
    feature: FeaturesTypes;
    children: JSX.Element;
}

const ProtectedComponent = ({ feature, children }: ProtectedComponentProps) => {
    const { status, hasAccess } = useAccessCheck(feature);

    if (hasAccess) return children;

    if (status === "pending")
        return (
            <Spin indicator={<LoadingOutlined spin />} size="large">
                Please wait, permission checking...
            </Spin>
        );

    if (status === "finished")
        return (
            <Alert
                showIcon
                type="error"
                message="No Access"
                description="Oops, it looks like you don't have permission to use this component."
            />
        );

    return null;
};

export const renderProtectedComponent = (feature: FeaturesTypes, element: JSX.Element) => {
    return <ProtectedComponent feature={feature}>{element}</ProtectedComponent>;
};
