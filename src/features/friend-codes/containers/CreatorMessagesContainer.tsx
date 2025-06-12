import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { EditableTable, EditableTableColumn } from "shared";
import { CreatorWelcomeMessagesQueryParams, StarCreatorWelcomeMessage } from "../services";
import { creatorMessagesListPage } from "../store/selectors/creatorMessagesListPage";
import { creatorMessageUpsertAction } from "../store/actions";

export interface CreatorMessagesContainerProps {
    stage: string;
    params: CreatorWelcomeMessagesQueryParams;
    extra: React.ReactNode;
    renderUserThumbnail: (user: StarCreatorWelcomeMessage) => React.ReactNode;
}

export function CreatorMessagesContainer({ stage, params, extra, renderUserThumbnail }: CreatorMessagesContainerProps) {
    const dispatch = useDispatch();
    const info = useSelector(creatorMessagesListPage(stage, params));

    const columns: EditableTableColumn<StarCreatorWelcomeMessage>[] = [
        {
            title: "Profile",
            dataIndex: "groupId",
            render: (_, record) => renderUserThumbnail(record),
            width: 200
        },
        {
            title: "Welcome Message",
            dataIndex: "welcomeMessage",
            editableCellProps: { type: "text", maxLength: 130, showCount: true },
            width: 400
        }
    ];

    const handleOnFinish = (data: StarCreatorWelcomeMessage, sourceValue: StarCreatorWelcomeMessage) =>
        dispatch(creatorMessageUpsertAction({ stage, data: { ...sourceValue, ...data } }));

    return (
        <EditableTable
            loading={info.loading}
            columns={columns}
            dataSource={info.data}
            onFinish={handleOnFinish}
            actionColumnProps={{ title: extra }}
        />
    );
}
