import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Store } from "antd/lib/form/interface";
import { Alert } from "antd";

import { PHOTO_DETAILS_URL } from "urls";
import { updateMediaFileEntityAction } from "features/user-media/store/actions";
import { PhotoForm } from "../../components/PhotoForm";
import { userMediaFileSelector } from "features/user-media/store/reducer/userMediaFileDetailsReducer";

export interface PhotoFormContainerProps {}

export function PhotoFormContainer({}: PhotoFormContainerProps) {
    const location = useLocation();
    const dispatch = useDispatch();

    const urlMatch = PHOTO_DETAILS_URL.match(location);

    if (!urlMatch.isMatched) return <Alert message="Invalid URL" />;

    const { stage, id } = urlMatch.params;

    const info = useSelector(userMediaFileSelector(stage, "Photo", id));

    const handleOnSubmit = (data: Store) =>
        dispatch(updateMediaFileEntityAction({ stage, mediaFileType: "Photo", data: { id, ...data } }));

    return <PhotoForm stage={stage} data={info.data} loading={info.loading} handleOnSubmit={handleOnSubmit} />;
}
