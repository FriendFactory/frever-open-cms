import React from "react";
import styled from "styled-components";
import { Form, FormProps } from "antd";

import { EditorSettingsCard } from "features/categories-moderation/components/EditorSettingsDetails/EditorSettingsCard";
import { LevelEditorSettings } from "features/categories-moderation/components/EditorSettingsDetails/LevelEditorSettings";
import { PostRecordEditorSettings } from "features/categories-moderation/components/EditorSettingsDetails/PostRecordEditorSettings";
import { CharacterEditorSettings } from "./CharacterEditorSettings";
import { CollapseWithSwitchEnable } from "./CollapseWithSwitchEnable";
import { ColumnsLayout } from "layout/ColumnsLayout";

export interface EditorSettingsFormProps extends FormProps {
    editorSettingsId?: number;
    stage: string;
    loading?: boolean;
}

export function EditorSettingsForm({ stage, editorSettingsId, loading, ...restFormProps }: EditorSettingsFormProps) {
    return (
        <div className="EditorSettingsForm">
            <Form layout="horizontal" {...restFormProps}>
                <EditorSettingsFormWrapper>
                    <EditorSettingsCard loading={loading} stage={stage} id={editorSettingsId} />

                    <CollapseWithSwitchEnable name="levelEditorSettings" header="Recording Page">
                        <LevelEditorSettings stage={stage} />
                    </CollapseWithSwitchEnable>

                    <CollapseWithSwitchEnable name="postRecordEditorSettings" header="Edit Page">
                        <PostRecordEditorSettings stage={stage} />
                    </CollapseWithSwitchEnable>

                    <CollapseWithSwitchEnable name="characterEditorSettings" header="Character Page">
                        <CharacterEditorSettings stage={stage} />
                    </CollapseWithSwitchEnable>
                </EditorSettingsFormWrapper>
            </Form>
        </div>
    );
}

export const EditorSettingsFormWrapper = styled(ColumnsLayout)`
    h3 {
        padding: 0;
        margin: 0;
    }
`;
