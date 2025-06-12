import React from "react";
import { Card, Form, Switch } from "antd";

import { UnionEditorSettingsCardProps } from ".";
import { SelectWithExtraDataOptions } from "shared";

interface SetLocationCardProps extends UnionEditorSettingsCardProps {
    stage: string;
}

export function SetLocationCard({ stage, editorType }: SetLocationCardProps) {
    return (
        <Card title="Set Location">
            <Form.Item
                name={[editorType, "setLocationSettings", "allowPhotoUploading"]}
                label="Allow Photo Uploading"
                valuePropName="checked">
                <Switch />
            </Form.Item>

            <Form.Item
                name={[editorType, "setLocationSettings", "allowVideoUploading"]}
                label="Allow Video Uploading"
                valuePropName="checked">
                <Switch />
            </Form.Item>

            <Form.Item
                name={[editorType, "setLocationSettings", "allowChangeDayTime"]}
                label="Allow Change Day Time"
                valuePropName="checked">
                <Switch />
            </Form.Item>

            <Form.Item
                name={[editorType, "setLocationSettings", "allowChangeSetLocation"]}
                label="Allow Change Set Location"
                valuePropName="checked">
                <Switch />
            </Form.Item>

            <Form.Item name={[editorType, "setLocationSettings", "categories"]} label="Categories">
                <SelectWithExtraDataOptions mode="multiple" stage={stage} name="SetLocationCategory" />
            </Form.Item>

            <Form.Item name={[editorType, "setLocationSettings", "tags"]} label="Tags">
                <SelectWithExtraDataOptions stage={stage} name="Tag" mode="multiple" />
            </Form.Item>
        </Card>
    );
}
