import React, { useState } from "react";
import { Form, FormProps, Input, Radio, Switch } from "antd";

import { ImageFormField, useCurrentStage } from "shared";
import { AssetSelectionFormField } from "features/seasons-moderation/components/AssetSelectionFormField";

export interface CreateQuestFormProps extends FormProps {}

export function CreateRewardForm({ ...formProps }: CreateQuestFormProps) {
    const [currentReward, setCurrentReward] = useState<string>("softCurrency");
    const stage = useCurrentStage();

    return (
        <Form layout="vertical" {...formProps}>
            <ImageFormField pathname="thumbnail" />

            <Form.Item name="title" label="Title" rules={[{ required: true, message: "This field is required" }]}>
                <Input />
            </Form.Item>

            <Form.Item name="isEnabled" label="Enabled" valuePropName="checked" initialValue={true}>
                <Switch />
            </Form.Item>

            <Form.Item shouldUpdate noStyle>
                <Form.Item label="Reward Type">
                    <Radio.Group defaultValue="softCurrency" onChange={(e) => setCurrentReward(e.target.value)}>
                        <Radio.Button value="softCurrency">Soft Currency</Radio.Button>
                        <Radio.Button value="hardCurrency">Hard Currency</Radio.Button>
                        <Radio.Button value="xp">XP</Radio.Button>
                        <Radio.Button value="asset">Asset</Radio.Button>
                    </Radio.Group>
                </Form.Item>
            </Form.Item>

            <Form.Item name="reward">
                {currentReward === "asset" ? (
                    <Form.Item shouldUpdate label="Reward Value" required>
                        {(props) => <AssetSelectionFormField stage={stage} {...(props as any)} />}
                    </Form.Item>
                ) : (
                    <Form.Item name={currentReward} label="Reward Value" required>
                        <Input type="number" />
                    </Form.Item>
                )}
            </Form.Item>
        </Form>
    );
}
