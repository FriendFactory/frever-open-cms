import React, { useMemo } from "react";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { Card, Empty } from "antd";

import {
    SetLocationCard,
    FilterCard,
    CameraCard,
    VFXCard,
    MusicCard,
    CharacterCard,
    BodyAnimationCard
} from "../components/AssetCards";
import { EVENT_DETAILS_PAGE_URL } from "urls";
import { eventDetailsPageSelector } from "../store/reducer/eventDetails.reducer";

export interface EventContainedAssetContainerProps {}

export function EventContainedAssetContainer({}: EventContainedAssetContainerProps) {
    const location = useLocation();
    const urlMatch = EVENT_DETAILS_PAGE_URL.match(location);

    if (!urlMatch.isMatched) {
        return null;
    }
    const { stage, id } = urlMatch.params;

    const info = useSelector(eventDetailsPageSelector(stage, id));

    const characterControllerBodyAnimation = useMemo(
        () => info.data?.characterController?.map((chara) => chara.characterControllerBodyAnimation).flat(),
        [info.data]
    );

    return (
        <Card title="Contained Assets" loading={!info.data && info.loading}>
            {!!info.data ? (
                <>
                    <SetLocationCard setLocationController={info.data.setLocationController} stage={stage} />
                    <FilterCard cameraFilterController={info.data.cameraFilterController} stage={stage} />
                    <VFXCard vfxController={info.data.vfxController} stage={stage} />
                    <CameraCard cameraController={info.data.cameraController} stage={stage} />
                    <MusicCard musicController={info.data.musicController} stage={stage} />
                    <CharacterCard characterController={info.data.characterController} stage={stage} />

                    {characterControllerBodyAnimation && (
                        <BodyAnimationCard
                            characterControllerBodyAnimation={characterControllerBodyAnimation}
                            stage={stage}
                        />
                    )}
                </>
            ) : (
                <Empty />
            )}
        </Card>
    );
}
