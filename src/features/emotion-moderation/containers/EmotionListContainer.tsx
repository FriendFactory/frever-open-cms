import React from "react";
import { shallowEqual, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { EMOTIONS_DETAILS_URL } from "urls";
import { EditableTableV2, EditableTableV2Column } from "shared/components/EditableTableV2/EditableTableV2";
import { InputEmoji } from "shared";
import { Emotion, EmotionsQueryParams } from "../services";
import { upsertEmotionsAction } from "../store/actions";
import { emotionsListPageSelector } from "../store/reducer/emotionsListReducer";

interface EmotionListContainerProps {
    stage: string;
    params?: EmotionsQueryParams;
}

export function EmotionListContainer({ stage, params }: EmotionListContainerProps) {
    const dispatch = useDispatch();
    const info = useSelector(emotionsListPageSelector(stage, params || {}, true), shallowEqual);

    const onSubmit = ([data]: Partial<Emotion>[]) => {
        const sourceData = info?.data?.find((emotion) => emotion.id === data.id);
        if (sourceData) dispatch(upsertEmotionsAction({ stage, data: { ...sourceData, ...data } }));
    };

    const columns: EditableTableV2Column<Emotion>[] = [
        {
            title: "ID",
            dataIndex: "id",
            width: 80,
            render: (_, emotion) => (
                <Link to={EMOTIONS_DETAILS_URL.format({ stage, id: emotion.id })}>{emotion.id}</Link>
            )
        },
        {
            title: "Name",
            dataIndex: "name",
            width: 200,
            editableCellProps: { type: "string" }
        },
        {
            title: "Emoji",
            dataIndex: "emojiCode",
            width: 100,
            editableCellProps: {
                type: "custom-field",
                render: (values, onSave) => (
                    <div onMouseDown={(e) => e.preventDefault()}>
                        <InputEmoji defaultValue={values.emojiCode} onSave={(emojiCode) => onSave({ emojiCode })} />
                    </div>
                )
            }
        },
        {
            title: "Sort Order",
            dataIndex: "sortOrder",
            width: 100,
            editableCellProps: { type: "number" }
        },
        {
            title: "Is Enabled",
            dataIndex: "isEnabled",
            editableCellProps: { type: "boolean" },
            render: (_, emotion) => (emotion.isEnabled ? "True" : "False"),
            width: 100
        }
    ];

    return (
        <EditableTableV2
            rowSelection={undefined}
            loading={info.loading && !info.data}
            columns={columns}
            dataSource={info.data}
            pagination={false}
            onFinish={onSubmit}
            scroll={{ x: 600, y: "100%" }}
        />
    );
}
