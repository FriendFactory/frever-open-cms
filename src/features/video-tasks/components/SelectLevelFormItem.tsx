import React from "react";
import { Divider, Form, FormInstance, Typography } from "antd";

import { SearchForVideoModalContainer } from "../../video-moderation/containers/SearchForVideoModalContainer";
import { getLevelCharacters } from "../services";
import { Video } from "features/video-moderation/services";
import { useCurrentStage } from "shared";
import { TaskFormData } from "./CreateTaskForm";

export function SelectLevelFormItem({ getFieldValue, setFieldValue }: FormInstance<TaskFormData>) {
    const stage = useCurrentStage();
    const levelId = getFieldValue("levelId");

    const handleOnClickVideo = async (video: Video) => {
        setFieldValue("levelId", video.levelId);
        setFieldValue("levelCharactersCount", video.charactersCount);

        const characters = await getLevelCharacters(stage, video.levelId!);
        if (characters.length) {
            setFieldValue(
                "characterReplacement",
                characters.map((el, index) => ({
                    originalCharacterId: el.id,
                    replaceCharacterId: null,
                    replaceWithMainCharacter: index === 0,
                    originalCharacter: el
                }))
            );
        }
    };

    const removeLevelId = () => {
        setFieldValue("levelId", null);
        setFieldValue("levelCharactersCount", null);
        setFieldValue("characterReplacement", null);
    };

    return (
        <>
            <Form.Item name="levelId" noStyle>
                <div></div>
            </Form.Item>
            Level: {levelId} &nbsp;
            <SearchForVideoModalContainer
                stage={stage}
                btnText={levelId ? "Change" : "Select"}
                onVideoClick={handleOnClickVideo}
            />
            {levelId && (
                <>
                    <Divider type="vertical" />
                    <Typography.Link type="danger" onClick={removeLevelId}>
                        Remove
                    </Typography.Link>
                </>
            )}
        </>
    );
}
