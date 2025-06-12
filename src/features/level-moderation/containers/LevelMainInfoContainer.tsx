import React from "react";
import { useLocation } from "react-router";
import { UrlPath } from "rd-url-utils";
import { useDispatch, useSelector } from "react-redux";
import { Result } from "antd";

import { levelDetailsPageSelector } from "../store/reducer/levelDetails.reducer";
import { LevelMainInfo } from "../components";
import { editLevelAction } from "../store";

export interface LevelMainInfoContainerProps {
    url: UrlPath<{ stage: string; id: number }, {}>;
}

export function LevelMainInfoContainer({ url }: LevelMainInfoContainerProps) {
    const dispatch = useDispatch();
    const location = useLocation();
    const urlMatch = url.match(location);

    if (!urlMatch.isMatched) {
        return <div></div>;
    }
    const { stage, id } = urlMatch.params;

    const info = useSelector(levelDetailsPageSelector(stage, id));

    if (info.error) {
        return <Result status="404" title={info.error} />;
    }

    const handleDeleteClick = () =>
        info?.data && dispatch(editLevelAction({ stage, data: { id: info.data.id, isDeleted: !info.data.isDeleted } }));

    return (
        <LevelMainInfo
            stage={stage}
            level={info.data}
            loading={!info.data && info.loading}
            onSetSoftDelete={handleDeleteClick}
        />
    );
}
