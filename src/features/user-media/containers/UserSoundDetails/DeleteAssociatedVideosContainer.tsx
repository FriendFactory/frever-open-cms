import React from "react";
import { useDispatch } from "react-redux";

import { DeleteAssociatedVideos } from "shared/components/DeleteAssociatedVideos";
import { useCurrentStage } from "shared/hooks";
import { userSoundDeleteAssociatedVideos } from "features/user-media/store/actions";
import { Actions } from "shared/services/executeVideosDelete";

export interface DeleteAssociatedVideosContainerProps {
    id: number;
}

export const DeleteAssociatedVideosContainer = ({ id }: DeleteAssociatedVideosContainerProps) => {
    const stage = useCurrentStage();
    const dispatch = useDispatch();
    const handleExecute = (command: Actions) => () =>
        dispatch(userSoundDeleteAssociatedVideos({ stage, id, selectBy: "userSoundId", command }));

    return <DeleteAssociatedVideos onClickAction={handleExecute} />;
};
