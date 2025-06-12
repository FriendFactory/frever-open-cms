import React, { useMemo } from "react";
import { UrlPath } from "rd-url-utils";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "antd";

import { assetEditAction, assetDetailsSelector } from "../../store";
import { AssetHeader } from "../../components/AssetDetails/AssetHeader";
import { AssetTypes } from "config";
import { getActiveStageById } from "features/auth";
import { useExtraData } from "shared";

export interface AssetHeaderContainerProps {
    url: UrlPath<{ stage: string; asset: AssetTypes; id: number }, {}>;
}

export function AssetHeaderContainer({ url }: AssetHeaderContainerProps) {
    const location = useLocation();
    const dispatch = useDispatch();
    const urlMatch = url.match(location);

    if (!urlMatch.isMatched) return null;

    const { stage, asset, id } = urlMatch.params;

    const info = useSelector(assetDetailsSelector(stage, asset, id));
    const extraReadiness = useExtraData({ stage, name: "Readiness" });

    const handleOnSubmit = (createdTime: string) =>
        dispatch(assetEditAction({ stage, asset, data: { id, createdTime } }));

    const { name, displayName, createdTime, modifiedTime, readinessId } = (info.data as any) ?? {};

    const stageTitle = useMemo(() => getActiveStageById(stage)?.title, [stage]);
    const isDiscontinued = extraReadiness.data?.find(
        (readiness) => readiness.id === readinessId && readiness.name === "Discontinued"
    );

    return (
        <AssetHeader
            id={info.data?.id}
            name={name || displayName || ""}
            createdTime={createdTime}
            modifiedTime={modifiedTime}
            stageTitle={stageTitle}
            onSubmit={handleOnSubmit}
            extraHeader={
                asset === "Song" &&
                isDiscontinued && (
                    <Typography.Text style={{ float: "right" }} type="warning">
                        Notice: Readiness is "discontinued". All related videos are possibly hidden.
                    </Typography.Text>
                )
            }
        />
    );
}
