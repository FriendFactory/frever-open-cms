import React, { useEffect, useMemo, useState } from "react";
import { Tabs, TabsProps } from "antd";
import { useDispatch } from "react-redux";
import { updateSideMenuCurrentEnvAction } from "shared/store/actions/sideMenu";
import { getActiveStages } from "features/auth";
import { setCurrentStageStorage } from "shared/services";
import styled from "styled-components";

interface SideMenuTabsProps {
    defaultActiveStage: string;
    children: React.ReactNode;
}

export function SideMenuTabs({ defaultActiveStage, children }: SideMenuTabsProps) {
    const dispatch = useDispatch();
    const [stageTab, setStageTab] = useState(defaultActiveStage);
    const stages = useMemo(() => getActiveStages(), []);

    const handleSwitchToStage = (stage: string) => setStageTab(stage);

    useEffect(() => {
        dispatch(updateSideMenuCurrentEnvAction({ stage: stageTab }));
        setCurrentStageStorage(stageTab);
    }, [stageTab]);

    const items: TabsProps["items"] = stages.map((stageInfo) => ({
        key: stageInfo.id,
        label: shortNameStage(stageInfo.id)
    }));

    return (
        <TabsStyled
            defaultActiveKey={stageTab}
            size="small"
            centered
            onChange={handleSwitchToStage}
            items={items.map(({ label, key }) => {
                return {
                    label,
                    key,
                    children
                };
            })}
        />
    );
}

const TabsStyled = styled(Tabs)`
    .ant-tabs-nav {
        margin: 0;
    }
`;

const shortNameStage = (stageId: string): string => {
    const stageMap: { [key: string]: string } = {
        "content-test": "Test",
        "content-stage": "Stage",
        "content-prod": "Prod",
        dev: "Dev"
    };

    return stageMap[stageId] || "<Null>";
};
