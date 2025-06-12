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
    OutfitCard,
    VideoMessageCard
} from "./CardsWithFormItems";

export interface LevelEditorSettingsProps {
    stage: string;
}

export function LevelEditorSettings({ stage }: LevelEditorSettingsProps) {
    return (
        <>
            <BodyAnimationCard stage={stage} editorType="levelEditorSettings" />

            <CameraAnimationCard stage={stage} editorType="levelEditorSettings" />

            <CameraFilterCard stage={stage} editorType="levelEditorSettings" />

            <CharacterCard editorType="levelEditorSettings" />

            <EventDeletionCard editorType="levelEditorSettings" />

            <Card title="Face Tracking">
                <Form.Item
                    name={["levelEditorSettings", "faceTrackingSettings", "allowSwitching"]}
                    label="Allow Switching"
                    valuePropName="checked">
                    <Switch />
                </Form.Item>
            </Card>

            <MusicCard stage={stage} editorType="levelEditorSettings" />

            <Card title="Non Level Video Upload">
                <Form.Item
                    name={["levelEditorSettings", "nonLevelVideoUploadSettings", "allowUploading"]}
                    label="Allow Uploading"
                    valuePropName="checked">
                    <Switch />
                </Form.Item>
            </Card>

            <OutfitCard editorType="levelEditorSettings" />

            <Card title="Preview Last Event">
                <Form.Item
                    name={["levelEditorSettings", "previewLastEventSettings", "allowPreview"]}
                    label="Allow Preview"
                    valuePropName="checked">
                    <Switch />
                </Form.Item>
            </Card>

            <SetLocationCard stage={stage} editorType="levelEditorSettings" />

            <Card title="Template">
                <Form.Item
                    name={["levelEditorSettings", "templateSettings", "allowEditing"]}
                    label="AllowEditing"
                    valuePropName="checked">
                    <Switch />
                </Form.Item>
            </Card>

            <VfxCard stage={stage} editorType="levelEditorSettings" />

            <VideoMessageCard editorType="levelEditorSettings" />

            <VoiceFilterCard stage={stage} editorType="levelEditorSettings" />
        </>
    );
}
