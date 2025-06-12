import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Card } from "antd";
import { useLocation } from "react-router";

import { taskDetailsPageSelector } from "../store/reducer/taskDetails.reducer";
import { CharacterReplacementContainer } from "./CharacterReplacementContainer";
import { TASK_DETAILS_URL } from "urls";
import { CharacterReplacement } from "../services";
import { FixedPageHeader } from "shared";
import { useDispatch } from "react-redux";
import { updateTaskAction } from "../store/actions";

export function DetailsCharaReplacementContainer() {
    const dispatch = useDispatch();
    const location = useLocation();

    const urlMatch = TASK_DETAILS_URL.match(location);

    if (!urlMatch.isMatched) {
        return null;
    }

    const { stage, id } = urlMatch.params;

    const info = useSelector(taskDetailsPageSelector(stage, id));

    const [characterReplacement, setCharacterReplacement] = useState<CharacterReplacement[]>([]);
    const [isSaveHeaderOpen, setIsSaveHeaderOpen] = useState(false);

    useEffect(() => {
        if (info.data?.characterReplacement) setCharacterReplacement(info.data?.characterReplacement);
    }, [info.data?.characterReplacement]);

    const handleOnChange = (value: CharacterReplacement[]) => {
        setCharacterReplacement(value);
        setIsSaveHeaderOpen(true);
    };

    const cancelCharacterReplacementChanges = () => {
        setCharacterReplacement(info.data?.characterReplacement ?? []);
        setIsSaveHeaderOpen(false);
    };

    const saveCharacterReplacementChanges = () => {
        dispatch(
            updateTaskAction({
                stage: stage,
                id: id,
                data: { characterReplacement }
            })
        );
        setIsSaveHeaderOpen(false);
    };

    return (
        <Card title="Character Replacement" loading={info.loading && !info.data}>
            {!!characterReplacement.length && (
                <CharacterReplacementContainer stage={stage} value={characterReplacement} onChange={handleOnChange} />
            )}
            {isSaveHeaderOpen && (
                <FixedPageHeader
                    title="Unsaved character replacement changes"
                    extra={[
                        <Button key="cancel-characterReplacement-chages" onClick={cancelCharacterReplacementChanges}>
                            Cancel
                        </Button>,
                        <Button
                            key="save-characterReplacement-chages"
                            type="primary"
                            onClick={saveCharacterReplacementChanges}>
                            Save
                        </Button>
                    ]}
                />
            )}
        </Card>
    );
}
