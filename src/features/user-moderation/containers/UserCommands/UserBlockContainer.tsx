import React, { useCallback } from "react";
import { useDispatch } from "react-redux";

import { userBlockAction } from "../../store";
import { User } from "../../services";

export interface UserBlockContainerProps {
    stage: string;
    user: User;
}

export function UserBlockContainer({ user, stage }: UserBlockContainerProps) {
    const dispatch = useDispatch();

    const handleOnClick = useCallback(() => {
        dispatch(
            userBlockAction({
                stage,
                groupId: user.mainGroupId,
                operation: user.mainGroup.isBlocked ? "unblock" : "block"
            })
        );
    }, [stage, user]);

    return <div onClick={handleOnClick}>{user.mainGroup.isBlocked ? "Unblock" : "Block"}</div>;
}
