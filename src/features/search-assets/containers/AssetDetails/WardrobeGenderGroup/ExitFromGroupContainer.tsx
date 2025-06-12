import React from "react";
import { useDispatch } from "react-redux";
import { App } from "antd";

import { executeGenderGroupCommandAction } from "features/search-assets/store";

export interface RemoveFromGroupContainerProps {
    stage: string;
    targetWardrobeId: number;
    genderGroupId: number;
}

export function RemoveFromGroupContainer({ stage, targetWardrobeId, genderGroupId }: RemoveFromGroupContainerProps) {
    const { modal } = App.useApp();
    const dispatch = useDispatch();

    const executeCommand = () => {
        modal.confirm({
            content: "You will remove the current wardrobe from the wardrobe gender group. Proceed?",
            onOk: () => {
                dispatch(
                    executeGenderGroupCommandAction({
                        stage,
                        command: { type: "exit-from-group", genderGroupId, wardrobeId: targetWardrobeId }
                    })
                );
            }
        });
    };

    return <span onClick={executeCommand}>Exit from group</span>;
}
