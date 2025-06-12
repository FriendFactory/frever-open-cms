import React, { useCallback } from "react";
import { useDispatch } from "react-redux";

import { softDeleteUserAction } from "../../store";
import { User } from "../../services";

export interface UserDeleteContainerProps {
    stage: string;
    user: User;
}

export function UserDeleteContainer({ user, stage }: UserDeleteContainerProps) {
    const dispatch = useDispatch();

    const handleOnClick = useCallback(() => {
        dispatch(
            softDeleteUserAction({
                stage,
                groupId: user.mainGroupId,
                operation: user.mainGroup.deletedAt ? "undelete" : "delete"
            })
        );
    }, [user, stage]);

    return <div onClick={handleOnClick}>{user.mainGroup.deletedAt ? "Undelete" : "Delete"}</div>;
}
