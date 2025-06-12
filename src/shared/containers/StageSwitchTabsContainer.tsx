import React, { useCallback, useMemo } from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Alert, App } from "antd";
import { UrlPath } from "rd-url-utils";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";

import { getActiveStages, StageInfo } from "features/auth";
import { resetCacheAction } from "features/search-assets/store";
import { StageTabs } from "shared";

export interface StageSwitchTabsContainerProps {
    children: React.ReactNode | React.ReactNode[];
    url: UrlPath<{ stage: string }, any>;
    keepQuery?: boolean;
    cacheResetBtn?: boolean;
}

export function StageSwitchTabsContainer({ children, url, keepQuery, cacheResetBtn }: StageSwitchTabsContainerProps) {
    const { modal } = App.useApp();
    const stages = useMemo(() => getActiveStages(), []);

    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const urlMatch = url.match(location);

    if (!urlMatch.isMatched) {
        return <Alert message="Invalid URL for the component" />;
    }

    const handleResetCache = useCallback(
        (stage: StageInfo) => (event: React.MouseEvent) => {
            event.stopPropagation();
            modal.confirm({
                icon: <ExclamationCircleOutlined />,
                title: `Are you sure you want to reset the ${stage.title} cache?`,
                okText: "Reset",
                cancelText: "Cancel",
                width: "fit-content",
                onOk: () => {
                    dispatch(resetCacheAction({ assetStageId: stage.id }));
                }
            });
        },
        [stages]
    );

    const handleSwitchToStage = useCallback(
        (stageId: string) => {
            history.push(url.format({ ...urlMatch.params, stage: stageId }, keepQuery ? urlMatch.query : {}));
        },
        [urlMatch.params, urlMatch.query]
    );

    return (
        <StageTabs
            stages={stages}
            activeStageId={urlMatch.params.stage}
            cacheResetBtn={cacheResetBtn}
            onSwitchToStage={handleSwitchToStage}
            handleResetCache={handleResetCache}>
            {children}
        </StageTabs>
    );
}
