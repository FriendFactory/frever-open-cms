import React from "react";
import { useDispatch } from "react-redux";

import { executeGenderGroupCommandAction } from "features/search-assets/store";

export interface CreateGenderGroupProps {
    stage: string;
    targetWardrobeId: number;
}

export function CreateGenderGroup({ stage, targetWardrobeId }: CreateGenderGroupProps) {
    const dispatch = useDispatch();

    const executeCommand = () => {
        dispatch(
            executeGenderGroupCommandAction({
                stage,
                command: { type: "join-to-group", wardrobeId: targetWardrobeId }
            })
        );
    };
    return <span onClick={executeCommand}>Create new group</span>;
}
