import React from "react";
import { Card, Form, Switch } from "antd";

import { UnionEditorSettingsCardProps } from ".";

export function OutfitCard({ editorType }: UnionEditorSettingsCardProps) {
    return (
        <Card title="Outfit">
            <Form.Item
                name={[editorType, "outfitSettings", "allowEditing"]}
                label="Allow Editing"
                valuePropName="checked">
                <Switch />
            </Form.Item>
            <Form.Item
                name={[editorType, "outfitSettings", "allowForOwnCharacters"]}
                label="Allow For Own Characters"
                valuePropName="checked">
                <Switch />
            </Form.Item>
            <Form.Item
                name={[editorType, "outfitSettings", "allowForFreverStars"]}
                label="Allow For Frever Stars"
                valuePropName="checked">
                <Switch />
            </Form.Item>
            <Form.Item
                name={[editorType, "outfitSettings", "allowForFriendCharacters"]}
                label="Allow For Friend Characters"
                valuePropName="checked">
                <Switch />
            </Form.Item>
            <Form.Item
                name={[editorType, "outfitSettings", "allowCreateNew"]}
                label="Allow Create New"
                valuePropName="checked">
                <Switch />
            </Form.Item>
        </Card>
    );
}
