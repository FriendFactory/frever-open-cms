import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { taskDetailsPageSelector } from "../store/reducer/taskDetails.reducer";
import { updateTaskAction } from "../store/actions";
import { TagsCard } from "shared";
import { TagsSelect } from "shared/components/TagsSelect";

export interface TaskTagsContainerProps {
    stage: string;
    id: number;
}

export function TaskTagsContainer({ stage, id }: TaskTagsContainerProps) {
    const dispatch = useDispatch();

    const info = useSelector(taskDetailsPageSelector(stage, id));

    const handleOnChange = (tags: string[]) => {
        dispatch(updateTaskAction({ stage, id, data: { tags } }));
    };
    return (
        <TagsCard stage={stage} loading={info.loading && !info.data?.tags}>
            <TagsSelect stage={stage} value={info.data?.tags} onChange={handleOnChange} />
        </TagsCard>
    );
}
