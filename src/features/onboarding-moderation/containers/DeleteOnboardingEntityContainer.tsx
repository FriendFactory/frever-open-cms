import React from "react";
import { useDispatch } from "react-redux";
import { Button, Popconfirm } from "antd";
import { DeleteOutlined, UndoOutlined } from "@ant-design/icons";

import { OnboardingData, OnboardingDataNames, OnboardingQuestGroup, OnboardingReward } from "../services";
import { updateEntityListAction } from "../store/actions/updateEntityList";
import { useCurrentStage } from "shared";

interface DeleteOnboardingEntityContainerProps<T extends OnboardingDataNames = OnboardingDataNames> {
    entityType: T;
    entity: OnboardingData[T]["data"];
}

export function DeleteOnboardingEntityContainer({ entity, entityType }: DeleteOnboardingEntityContainerProps) {
    const dispatch = useDispatch();
    const stage = useCurrentStage();

    const handleOnClick = () => {
        const entityWithFile = entity as OnboardingQuestGroup | OnboardingReward;
        let files: any = [];
        if (entityType === "questGroup" || entityType === "reward")
            files = entityWithFile?.files?.length ? entityWithFile?.files : null;

        dispatch(
            updateEntityListAction({
                stage,
                entityType,
                entity: { ...entity, isEnabled: !entity.isEnabled, files }
            })
        );
    };

    return (
        <Popconfirm
            title={`Please, confirm the status changing`}
            onConfirm={handleOnClick}
            okType={entity.isEnabled ? "danger" : "primary"}
            okText={entity.isEnabled ? "Delete" : "Restore"}
            placement="topLeft">
            <Button
                danger={entity.isEnabled}
                ghost={!entity.isEnabled}
                type={!entity.isEnabled ? "primary" : undefined}
                icon={entity.isEnabled ? <DeleteOutlined /> : <UndoOutlined />}
            />
        </Popconfirm>
    );
}
