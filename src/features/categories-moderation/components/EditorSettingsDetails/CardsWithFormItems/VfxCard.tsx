import React from "react";
import { Card, Form, Switch } from "antd";

import { UnionEditorSettingsCardProps } from ".";
import { SelectWithExtraDataOptions } from "shared";

interface VfxCardProps extends UnionEditorSettingsCardProps {
    stage: string;
}

export function VfxCard({ stage, editorType }: VfxCardProps) {
    return (
        <Card title="VFX">
            <Form.Item name={[editorType, "vfxSettings", "allowEditing"]} label="Allow Editing" valuePropName="checked">
                <Switch />
            </Form.Item>
            <Form.Item name={[editorType, "vfxSettings", "categories"]} label="Categories">
                <SelectWithExtraDataOptions mode="multiple" stage={stage} name="VFXCategory" />
            </Form.Item>
        </Card>
    );
}
