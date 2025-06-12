import React from "react";
import { Form, FormInstance } from "antd";

import { TaskFormData } from "./CreateTaskForm";
import { CharacterReplacement } from "../services";
import { CharacterReplacementContainer } from "../containers/CharacterReplacementContainer";
import { useCurrentStage } from "shared";

export function CharacterReplacementFormItem({ getFieldValue, setFieldValue }: FormInstance<TaskFormData>) {
    const stage = useCurrentStage();
    const levelId = getFieldValue("levelId");

    if (!levelId) return null;

    const characterReplacement = getFieldValue("characterReplacement");
    const handleOnChangeCharacterReplacement = (value: CharacterReplacement[]) =>
        setFieldValue("characterReplacement", value);

    return (
        <>
            <Form.Item name="characterReplacement" noStyle>
                <div></div>
            </Form.Item>
            <CharacterReplacementContainer
                stage={stage}
                value={characterReplacement}
                onChange={handleOnChangeCharacterReplacement}
            />
        </>
    );
}
