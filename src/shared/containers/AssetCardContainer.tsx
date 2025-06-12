import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";

import { AppState } from "app-state";
import { assetKeySelector, assetListHandleLoadAction } from "features/search-assets/store";
import { DETAILS_ASSET_URL } from "urls";
import { createCdnURLFromFiles } from "shared";
import { ThumbnailCard } from "shared/components/ThumbnailCard";
import { AssetTypes } from "config";

export interface AssetCardProps {
    stage: string;
    assetType: AssetTypes;
    assetId: number;
    markers?: React.ReactNode[];
    width?: number;
}

export function AssetCardContainer({ stage, assetType, assetId, width, markers = [] }: AssetCardProps) {
    const dispatch = useDispatch();

    const entity = useSelector(
        (appState: AppState) => appState.asset.entities[assetKeySelector(stage, assetType, assetId)],
        shallowEqual
    );

    useEffect(() => {
        if (!entity) {
            dispatch(
                assetListHandleLoadAction({
                    stage,
                    asset: assetType,
                    params: { search: assetId.toString() }
                })
            );
        }
    }, [entity]);

    const imageUrl =
        entity && "files" in entity
            ? createCdnURLFromFiles({
                  id: assetId,
                  files: entity.files,
                  entityType: assetType,
                  stage,
                  resolution: "256x256"
              })
            : "/assets/no-image.png";

    return (
        <ThumbnailCard
            width={width}
            imageUrl={imageUrl}
            markers={[
                ...markers,
                <Link
                    to={DETAILS_ASSET_URL.format({
                        stage,
                        asset: assetType,
                        id: assetId
                    })}>{`${assetType} (${assetId})`}</Link>
            ]}
        />
    );
}
