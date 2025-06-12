import React from "react";
import { Card, Form, Switch } from "antd";

import { UnionEditorSettingsCardProps } from ".";

export function VideoMessageCard({ editorType }: UnionEditorSettingsCardProps) {
    return (
        <Card title="Video Message">
            <Form.Item
                name={[editorType, "videoMessageSettings", "allowSwitch"]}
                label="Allow Switch"
                valuePropName="checked">
                <Switch />
            </Form.Item>
        </Card>
    );
}
