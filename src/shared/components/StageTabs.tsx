import React from "react";
import { Divider, Space, Tabs, theme, Tooltip } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import styled from "styled-components";

import { StageInfo } from "features/auth";

export interface StageTabsProps {
    children: React.ReactNode | React.ReactNode[];
    stages: StageInfo[];
    activeStageId: string;
    cacheResetBtn?: boolean;
    onSwitchToStage?: (newStageId: string, newAssetStage?: string | undefined) => void;
    handleResetCache: (stage: StageInfo) => (event: React.MouseEvent) => void;
}

export function StageTabs({
    stages,
    activeStageId,
    cacheResetBtn,
    children,
    onSwitchToStage,
    handleResetCache
}: StageTabsProps) {
    const { token } = theme.useToken();

    const items = stages
        .orderBy((s) => s.ordinal)
        .map((stage) => ({
            key: stage.id,
            label: (
                <Space wrap={false}>
                    {stage.id === activeStageId ? <a>{stage.title}</a> : stage.title}
                    {cacheResetBtn && (
                        <>
                            <Divider type="vertical" />

                            <Tooltip placement="top" title="Reset Cache">
                                <a onClick={handleResetCache(stage)}>
                                    <ReloadOutlined />
                                </a>
                            </Tooltip>
                        </>
                    )}
                </Space>
            ),
            children: activeStageId === stage.id && children
        }));

    return (
        <CustomTabs
            type="card"
            background={token.colorBgContainer}
            tabsbackground={token.colorBgLayout}
            padding={token.paddingLG}
            activeKey={activeStageId}
            onChange={onSwitchToStage}
            items={items}
        />
    );
}

export interface TabsStyledProps {
    background: string;
    tabsbackground: string;
    padding: number;
}

export const CustomTabs = styled(Tabs)<TabsStyledProps>`
    background: ${(props) => props.background};

    .ant-tabs-nav-list {
        padding-left: ${(props) => props.padding + "px"};
    }

    .ant-tabs-nav {
        margin-bottom: 0 !important;
    }
    .ant-tabs-nav-wrap {
        background: ${(props) => props.tabsbackground};
    }

    .ant-tabs-content-holder {
        padding: ${(props) => props.padding + "px"};
    }

    .ant-tabs-tabpane.ant-tabs-tabpane-active {
        display: flex;
        flex-direction: column;
    }

    .ant-tabs-tab .anticon {
        margin: 0;
    }
`;
