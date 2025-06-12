import React from "react";
import { useDispatch } from "react-redux";
import { Button, Popconfirm } from "antd";
import { DeleteOutlined, UndoOutlined } from "@ant-design/icons";

import { CrewRewards, CrewRewardsQueryParams } from "../../services";
import { postCrewRewardEntityAction } from "../../store/actions";

interface DeleteCrewRewardEntityContainerProps {
    entity: CrewRewards;
    params: CrewRewardsQueryParams;
}

export function DeleteCrewRewardEntityContainer({ entity }: DeleteCrewRewardEntityContainerProps) {
    const dispatch = useDispatch();

    const handleOnClick = () => {
        const files: any = entity?.files?.length ? entity?.files : null;
        dispatch(
            postCrewRewardEntityAction({
                data: { ...entity, isEnabled: entity.isEnabled ? false : true, files }
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
