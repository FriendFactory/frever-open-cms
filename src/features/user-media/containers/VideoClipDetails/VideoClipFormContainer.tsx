import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Store } from "antd/lib/form/interface";
import { Alert } from "antd";

import { VIDEOCLIP_DETAILS_URL } from "urls";
import { updateMediaFileEntityAction } from "features/user-media/store/actions";
import { VideoClipForm } from "../../components/VideoClipForm";
import { userMediaFileSelector } from "features/user-media/store/reducer/userMediaFileDetailsReducer";

export interface VideoClipFormContainerProps {}

export function VideoClipFormContainer({}: VideoClipFormContainerProps) {
    const location = useLocation();
    const dispatch = useDispatch();

    const urlMatch = VIDEOCLIP_DETAILS_URL.match(location);

    if (!urlMatch.isMatched) return <Alert message="Invalid URL" />;

    const { stage, id } = urlMatch.params;
    const info = useSelector(userMediaFileSelector(stage, "VideoClip", id));

    const handleOnSubmit = (data: Store) =>
        dispatch(updateMediaFileEntityAction({ stage, mediaFileType: "VideoClip", data: { id, ...data } }));

    return <VideoClipForm stage={stage} data={info.data} loading={info.loading} handleOnSubmit={handleOnSubmit} />;
}
