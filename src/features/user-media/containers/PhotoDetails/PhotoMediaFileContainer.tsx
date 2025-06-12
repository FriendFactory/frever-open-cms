import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Alert } from "antd";

import { PHOTO_DETAILS_URL } from "urls";
import { userMediaFileSelector } from "features/user-media/store/reducer/userMediaFileDetailsReducer";
import { useMediaFileCdnLink } from "features/user-media/hooks/useMediaFileCdnLink";
import { PhotoMediaFile } from "features/user-media/components/PhotoMediaFile";
import { UpdateEntityFileContainer } from "../UpdateEntityFileContainer";

export function PhotoMediaFileContainer() {
    const location = useLocation();

    const urlMatch = PHOTO_DETAILS_URL.match(location);
    if (!urlMatch.isMatched) return <Alert message="Invalid URL" />;

    const { stage, id } = urlMatch.params;
    const info = useSelector(userMediaFileSelector(stage, "Photo", id));

    const url = useMediaFileCdnLink("Photo", id, info.data?.files[0]?.version);
    return (
        <PhotoMediaFile
            url={url}
            loading={!info.data && info.loading}
            extra={<UpdateEntityFileContainer stage={stage} id={id} mediaFileType="Photo" accept="image/jpeg" />}
        />
    );
}
