import React from "react";
import { Alert, Spin } from "antd";
import { RouteComponentProps } from "react-router";

import { SideMenuLayout, ContentBlankLayout } from "layout";
import { FeaturesTypes } from "config";
import { useAccessCheck } from "shared";
import { LoadingOutlined } from "@ant-design/icons";

interface ProtectedPageElementProps {
    feature: FeaturesTypes;
    children: JSX.Element;
}

const ProtectedPageElement = ({ feature, children }: ProtectedPageElementProps) => {
    const { status, hasAccess } = useAccessCheck(feature);

    if (hasAccess) return children;

    return (
        <SideMenuLayout>
            <ContentBlankLayout>
                <Spin
                    spinning={status === "pending"}
                    size="large"
                    tip="Please wait, permission checking..."
                    indicator={<LoadingOutlined spin />}
                    fullscreen
                />

                {status === "finished" && (
                    <Alert
                        showIcon
                        type="error"
                        message="No Access"
                        description="Oops, it looks like you don't have permission to use this page."
                    />
                )}
            </ContentBlankLayout>
        </SideMenuLayout>
    );
};

export const renderProtectedPageElement =
    (feature: FeaturesTypes, Component: (props: any) => JSX.Element) => (props?: RouteComponentProps<any>) => {
        return (
            <ProtectedPageElement feature={feature}>
                <Component {...props} />
            </ProtectedPageElement>
        );
    };
