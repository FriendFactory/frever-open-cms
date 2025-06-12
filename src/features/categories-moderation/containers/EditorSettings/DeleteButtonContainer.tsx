import React from "react";
import { Button, Modal } from "antd";
import { BaseButtonProps } from "antd/lib/button/button";
import { useDispatch } from "react-redux";

import { deleteEditorSettingsAction } from "features/categories-moderation/store/actions/editorSettingsDetails";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;

const showConfirm = (onOk: () => void) => () => {
    confirm({
        title: "Do you Want to delete this item?",
        icon: <ExclamationCircleOutlined />,
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk
    });
};

export interface DeleteButtonContainerProps extends BaseButtonProps {
    stage: string;
    id: number;
    children?: React.ReactNode;
}

export function DeleteButtonContainer({ stage, id, children, ...restProps }: DeleteButtonContainerProps) {
    const dispatch = useDispatch();

    const deleteEditorSettings = () => dispatch(deleteEditorSettingsAction({ stage, id }));
    return (
        <Button {...restProps} onClick={showConfirm(deleteEditorSettings)}>
            {children}
        </Button>
    );
}
