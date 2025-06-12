import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Alert } from "antd";

import { USERSOUND_DETAILS_URL } from "urls";
import { userMediaFileSelector } from "features/user-media/store/reducer/userMediaFileDetailsReducer";
import { AudioMediaFileCard } from "features/user-media/components/AudioMediaFileCard";
import { useMediaFileCdnLink } from "features/user-media/hooks/useMediaFileCdnLink";
import { UpdateEntityFileContainer } from "../UpdateEntityFileContainer";

export function UserSoundMediaFileContainer() {
    const location = useLocation();

    const urlMatch = USERSOUND_DETAILS_URL.match(location);
    if (!urlMatch.isMatched) return <Alert message="Invalid URL" />;

    const { stage, id } = urlMatch.params;
    const info = useSelector(userMediaFileSelector(stage, "UserSound", id));

    const url = useMediaFileCdnLink("UserSound", id, info.data?.files[0]?.version);
    return (
        <AudioMediaFileCard
            url={url}
            loading={!info.data && info.loading}
            extra={<UpdateEntityFileContainer stage={stage} id={id} mediaFileType="UserSound" accept="audio/mp3" />}
        />
    );
}
