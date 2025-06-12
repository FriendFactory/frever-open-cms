import React, { useCallback } from "react";
import { App, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import { User } from "../../services";
import { useDispatch } from "react-redux";
import { hardDeleteUserAction } from "features/user-moderation/store";

export interface UserHardDeleteContainerProps {
    stage: string;
    user: User;
}

export function UserHardDeleteContainer({ user, stage }: UserHardDeleteContainerProps) {
    const { modal } = App.useApp();
    const dispatch = useDispatch();

    const handleOnClick = useCallback(() => {
        modal.confirm({
            icon: <ExclamationCircleOutlined />,
            title: "This action will delete all user data and cannot be undone.",
            okText: "Delete",
            cancelText: "Cancel",
            okButtonProps: { danger: true },
            onOk: () => {
                user.mainGroup.deletedAt
                    ? dispatch(
                          hardDeleteUserAction({
                              stage,
                              user
                          })
                      )
                    : message.warning("User must be soft deleted first");
            }
        });
    }, [stage, user]);

    return <div onClick={handleOnClick}>Hard Delete</div>;
}
