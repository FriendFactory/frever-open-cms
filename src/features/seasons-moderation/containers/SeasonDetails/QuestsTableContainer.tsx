import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import { Card } from "antd";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";

import { SeasonQuest } from "features/seasons-moderation/services";
import { postSeasonEntityAction } from "features/seasons-moderation/store/actions";
import { seasonDetailsPageSelector } from "features/seasons-moderation/store/reducer/seasonDetails.reducer";
import { CreateSeasonQuestContainer } from "../CreateSeasonQuestContainer";
import { DeleteSeasonEntityContainer } from "./DeleteSeasonEntityContainer";
import { actionColumnRender, ActionColumnRenderProps, EditableTable, EditableTableColumn } from "shared";

interface QuestTableContainerProps {
    stage: string;
    id: number;
}

export function QuestsTableContainer({ stage, id }: QuestTableContainerProps) {
    const dispatch = useDispatch();
    const info = useSelector(seasonDetailsPageSelector(stage, id), shallowEqual);

    const handleOnFinish = (updatedQuest: SeasonQuest) => {
        const sourceQuest = info.data?.quests?.find((el) => el.id === updatedQuest.id);
        dispatch(
            postSeasonEntityAction({
                stage,
                entityName: "quests",
                data: { ...sourceQuest, ...updatedQuest }
            })
        );
    };

    return (
        <Card title="Quests">
            <EditableTable
                loading={info.loading}
                onFinish={handleOnFinish}
                actionColumnProps={actionColumn}
                columns={columns}
                dataSource={info.data?.quests?.sort((a, b) => a.value - b.value)}
                pagination={false}
            />
        </Card>
    );
}

const columns: EditableTableColumn<SeasonQuest>[] = [
    { title: "ID", dataIndex: "id", width: 100 },
    { title: "Title", dataIndex: "title", editableCellProps: { type: "text" }, width: 200 },
    {
        title: "Type",
        dataIndex: "type",
        editableCellProps: { options: [{ label: "SeasonLikes", value: "SeasonLikes" }] },
        width: 200
    },
    {
        title: "Value",
        dataIndex: "value",
        editableCellProps: { type: "number" },
        width: 100,
        sorter: (a, b) => a.value - b.value
    }
];

const actionColumn = {
    title: <CreateSeasonQuestContainer type="primary" ghost icon={<PlusOutlined />} />,
    render: (props: ActionColumnRenderProps<SeasonQuest>) =>
        actionColumnRender({
            ...props,
            extra: (quest) => <DeleteSeasonEntityContainer entity={quest} entityName="quests" />
        })
};
