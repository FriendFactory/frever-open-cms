import React from "react";
import { useHistory } from "react-router";

import { CommonExtraDataType } from "shared";
import { useExtraData } from "shared/hooks/useExtraData";
import { EditorSettingsList } from "../components/EditorSettingsList";
import { EDITOR_SETTINGS_DETAILS_URL } from "urls";

export interface EditorSettingsListContainerProps {
    stage: string;
}

export function EditorSettingsListContainer({ stage }: EditorSettingsListContainerProps) {
    const history = useHistory();
    const info = useExtraData({ stage, name: "Editor-Settings" });

    const handleOnRow = (record: CommonExtraDataType) => ({
        onClick: () => history.push(EDITOR_SETTINGS_DETAILS_URL.format({ stage, id: record.id }))
    });

    return <EditorSettingsList stage={stage} data={info.data} loading={info.loading} handleOnRow={handleOnRow} />;
}
