import React from "react";
import { Card, Form, Switch } from "antd";

import { UnionEditorSettingsCardProps } from ".";
import { SelectWithExtraDataOptions } from "shared";

interface BodyAnimationCardProps extends UnionEditorSettingsCardProps {
    stage: string;
}

export function BodyAnimationCard({ stage, editorType }: BodyAnimationCardProps) {
    return (
        <Card title="Body Animation">
            <Form.Item
                name={[editorType, "bodyAnimationSettings", "allowEditing"]}
                label="Allow Editing"
                valuePropName="checked">
                <Switch />
            </Form.Item>

            <Form.Item name={[editorType, "bodyAnimationSettings", "categories"]} label="Categories">
                <SelectWithExtraDataOptions mode="multiple" stage={stage} name="BodyAnimationCategory" />
            </Form.Item>
        </Card>
    );
}
