import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, message } from "antd";

import { crewInfoByIdSelector } from "../store/reducer";
import { ThumbnailCard } from "shared/components/ThumbnailCard";
import { updateCrewAction } from "../store/actions";
import { NO_IMAGE_URL } from "config";
import { useLoadCdnLink } from "shared";

interface CrewThumbnailsContainerProps {
    stage: string;
    id: number;
}

export function CrewThumbnailsContainer({ stage, id }: CrewThumbnailsContainerProps) {
    const dispatch = useDispatch();

    const info = useSelector(crewInfoByIdSelector(stage, id));
    const version = info.data?.files[0].version;

    const { loading, url } = useLoadCdnLink(
        stage,
        version
            ? {
                  id,
                  entityName: "Crew",
                  version
              }
            : null
    );

    const handleOnUpdate = (file: File) => {
        if (file.type !== "image/jpeg") {
            message.warning("Please select an image in JPG format");
        }

        info.data
            ? dispatch(updateCrewAction({ stage, data: { ...info.data }, file }))
            : message.warning("Source data is missing");
    };

    return (
        <Card loading={info.loading || loading}>
            <ThumbnailCard handleUpdate={handleOnUpdate} imageUrl={url ?? NO_IMAGE_URL} />
        </Card>
    );
}
