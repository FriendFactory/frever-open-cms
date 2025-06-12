import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { TaskInfo } from "../components/TaskInfo";
import { copyTaskAction } from "../store/actions";
import { taskDetailsPageSelector } from "../store/reducer";

export interface TaskInfoContainerProps {
    stage: string;
    id: number;
}

export function TaskInfoContainer({ stage, id }: TaskInfoContainerProps) {
    const dispatch = useDispatch();

    const info = useSelector(taskDetailsPageSelector(stage, id));

    const handleOnClickCopyTask = () => info.data && dispatch(copyTaskAction({ stage, id: info.data.id }));
    return (
        <TaskInfo
            stage={stage}
            data={info.data}
            loading={info.loading && !info.data}
            handleOnClickCopyTask={handleOnClickCopyTask}
        />
    );
}
