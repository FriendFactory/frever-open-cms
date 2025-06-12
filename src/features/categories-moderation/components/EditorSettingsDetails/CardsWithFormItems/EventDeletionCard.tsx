import React from "react";
import { Card, Form, Switch } from "antd";

import { UnionEditorSettingsCardProps } from ".";

export function EventDeletionCard({ editorType }: UnionEditorSettingsCardProps) {
    return (
        <Card title="Event Deletion">
            <Form.Item
                name={[editorType, "eventDeletionSettings", "allowDeleting"]}
                label="Allow Deleting"
                valuePropName="checked">
                <Switch />
            </Form.Item>
        </Card>
    );
}
