import React from "react";
import { useDispatch } from "react-redux";
import { Button, message } from "antd";
import { useLocation } from "react-router";

import { deleteSeasonEntityAction } from "features/seasons-moderation/store/actions";
import { SEASON_BASE_URL } from "urls";
import { SeasonEntity, SeasonEntityName } from "features/seasons-moderation/services";
import { DeleteOutlined } from "@ant-design/icons";

interface DeleteSeasonEntityContainerProps {
    entity: SeasonEntity;
    entityName: SeasonEntityName;
}

export function DeleteSeasonEntityContainer({ entity, entityName }: DeleteSeasonEntityContainerProps) {
    const dispatch = useDispatch();
    const location = useLocation();

    const urlMatch = SEASON_BASE_URL.match(location);

    const handleOnClick = () => {
        if (urlMatch.isMatched) {
            dispatch(deleteSeasonEntityAction({ stage: urlMatch.params.stage, entityName, entity }));
        } else {
            message.error("Stage is missing");
        }
    };

    return <Button danger onClick={handleOnClick} icon={<DeleteOutlined />} />;
}
