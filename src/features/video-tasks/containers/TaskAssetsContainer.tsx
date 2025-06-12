import React from "react";
import { Card } from "antd";
import { useSelector } from "react-redux";

import { TaskAssets } from "../components/TaskAssets";
import { taskAssetsSelector } from "../store/reducer/taskDetails.reducer";
import { AssetListModal } from "./AssetListModal";

export interface TaskAssetsContainerProps {
    stage: string;
    id: number;
}

export function TaskAssetsContainer({ stage, id }: TaskAssetsContainerProps) {
    const info = useSelector(taskAssetsSelector(stage, id));

    return (
        <Card
            title="Assets"
            loading={info.loading && !info.task?.assets}
            extra={info.task && <AssetListModal stage={stage} task={info.task} />}>
            <TaskAssets stage={stage} data={info.assetList} />
        </Card>
    );
}
