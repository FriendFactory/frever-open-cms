import React from "react";
import { Card, Form, Switch } from "antd";

import {
    SetLocationCard,
    BodyAnimationCard,
    VoiceFilterCard,
    CharacterCard,
    EventDeletionCard,
    MusicCard,
    VfxCard,
    CameraFilterCard,
    CameraAnimationCard,
    OutfitCard
} from "./CardsWithFormItems";

export interface PostRecordEditorSettingsProps {
    stage: string;
}

export function PostRecordEditorSettings({ stage }: PostRecordEditorSettingsProps) {
    return (
        <>
            <BodyAnimationCard stage={stage} editorType="postRecordEditorSettings" />

            <CameraAnimationCard stage={stage} editorType="postRecordEditorSettings" />

            <CameraFilterCard stage={stage} editorType={"postRecordEditorSettings"} />

            <Card title="Caption">
                <Form.Item
                    name={["postRecordEditorSettings", "captionSettings", "allowEditing"]}
                    label="Allow Editing"
                    valuePropName="checked">
                    <Switch />
                </Form.Item>
            </Card>

            <CharacterCard editorType="postRecordEditorSettings" />

            <Card title="Event Creation">
                <Form.Item name={["postRecordEditorSettings", "eventCreationSettings", "templateId"]} noStyle>
                    <div></div>
                </Form.Item>
                <Form.Item
                    name={["postRecordEditorSettings", "eventCreationSettings", "allowEventCreation"]}
                    label="Allow Event Creation"
                    valuePropName="checked">
                    <Switch />
                </Form.Item>
            </Card>

            <EventDeletionCard editorType="postRecordEditorSettings" />

            <MusicCard stage={stage} editorType="postRecordEditorSettings" />

            <OutfitCard editorType="postRecordEditorSettings" />

            <SetLocationCard stage={stage} editorType="postRecordEditorSettings" />

            <VfxCard stage={stage} editorType="postRecordEditorSettings" />

            <VoiceFilterCard stage={stage} editorType="postRecordEditorSettings" />

            <Card title="Volume">
                <Form.Item
                    name={["postRecordEditorSettings", "volumeSettings", "allowEditing"]}
                    label="Allow Editing"
                    valuePropName="checked">
                    <Switch />
                </Form.Item>
            </Card>
        </>
    );
}
