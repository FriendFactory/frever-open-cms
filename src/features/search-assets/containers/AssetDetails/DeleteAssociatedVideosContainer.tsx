import React from "react";
import { useDispatch } from "react-redux";

import { DeleteAssociatedVideos } from "shared/components/DeleteAssociatedVideos";
import { useCurrentStage } from "shared/hooks";
import { assetDeleteAssociatedVideos } from "features/search-assets/store/actions";
import { Actions } from "shared/services/executeVideosDelete";

export interface DeleteAssociatedVideosContainerProps {
    id: number;
    selectBy: "songId" | "externalSongId";
}

export const DeleteAssociatedVideosContainer = ({ id, selectBy }: DeleteAssociatedVideosContainerProps) => {
    const stage = useCurrentStage();
    const dispatch = useDispatch();
    const handleExecute = (command: Actions) => () =>
        dispatch(assetDeleteAssociatedVideos({ stage, id, selectBy, command }));

    return <DeleteAssociatedVideos onClickAction={handleExecute} />;
};
