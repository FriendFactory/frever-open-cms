import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Store } from "antd/lib/form/interface";

import { USERSOUND_DETAILS_URL } from "urls";
import { updateMediaFileEntityAction } from "features/user-media/store/actions";
import { UserSoundForm } from "../../components/UserSoundForm";
import { Alert } from "antd";
import { userMediaFileSelector } from "features/user-media/store/reducer/userMediaFileDetailsReducer";

export interface UserSoundFormContainerProps {}

export function UserSoundFormContainer({}: UserSoundFormContainerProps) {
    const location = useLocation();
    const dispatch = useDispatch();

    const urlMatch = USERSOUND_DETAILS_URL.match(location);

    if (!urlMatch.isMatched) return <Alert message="Invalid URL" />;

    const { stage, id } = urlMatch.params;
    const info = useSelector(userMediaFileSelector(stage, "UserSound", id));

    const handleOnSubmit = (data: Store) =>
        dispatch(updateMediaFileEntityAction({ stage, mediaFileType: "UserSound", data: { id, ...data } }));

    return <UserSoundForm stage={stage} data={info.data} loading={info.loading} handleOnSubmit={handleOnSubmit} />;
}
