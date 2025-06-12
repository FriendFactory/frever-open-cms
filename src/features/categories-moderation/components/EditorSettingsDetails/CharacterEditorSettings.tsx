import React from "react";
import { Card, Form, Switch } from "antd";
import { WardrobeCategoriesCard } from "./CardsWithFormItems/WardrobeCategoriesCard";

export interface CharacterEditorSettingsProps {
    stage: string;
}

export function CharacterEditorSettings({ stage }: CharacterEditorSettingsProps) {
    return (
        <>
            <WardrobeCategoriesCard stage={stage} />

            <Card title="Filter">
                <Form.Item
                    name={["characterEditorSettings", "filterSettings", "allowFiltering"]}
                    label="Allow Filtering"
                    valuePropName="checked">
                    <Switch />
                </Form.Item>
            </Card>

            <Card title="Saving Character">
                <Form.Item
                    name={["characterEditorSettings", "savingCharacterSettings", "allowSaveCharacter"]}
                    label="Allow Save Character"
                    valuePropName="checked">
                    <Switch />
                </Form.Item>
            </Card>

            <Card title="Saving Outfit">
                <Form.Item
                    name={["characterEditorSettings", "savingOutfitSettings", "allowSaveOutfit"]}
                    label="Allow Save Outfit"
                    valuePropName="checked">
                    <Switch />
                </Form.Item>
            </Card>

            <Card title="Zoom">
                <Form.Item
                    name={["characterEditorSettings", "zoomSettings", "allowZooming"]}
                    label="Allow Zooming"
                    valuePropName="checked">
                    <Switch />
                </Form.Item>
            </Card>
        </>
    );
}
