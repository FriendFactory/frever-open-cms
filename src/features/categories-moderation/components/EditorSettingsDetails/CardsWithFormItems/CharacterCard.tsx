import React from "react";
import { Card, Form, Switch } from "antd";

import { UnionEditorSettingsCardProps } from ".";

export function CharacterCard({ editorType }: UnionEditorSettingsCardProps) {
    return (
        <Card title="Character">
            <Form.Item
                name={[editorType, "characterSettings", "allowEditing"]}
                label="Allow Editing"
                valuePropName="checked">
                <Switch />
            </Form.Item>
        </Card>
    );
}
