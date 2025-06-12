import React, { useState } from "react";
import { Button, Form, FormProps, Input, Radio, Switch } from "antd";

import { ImageFormField } from "shared";
import { AssetSelectionFormField } from "features/seasons-moderation/components/AssetSelectionFormField";
import { LootBox } from "features/lootbox-moderation/services";

export type LootBoxSearchWindowComponentType = React.ComponentType<{
    children: React.ReactNode;
    onLootBoxClick: (value: LootBox) => void;
}>;
export type LootBoxCardComponentType = React.ComponentType<{
    lootBoxId: number;
    markers?: React.ReactNode[];
    width?: number;
}>;

export interface RewardFormProps extends FormProps {
    stage: string;
    lootBoxSearchComponent: LootBoxSearchWindowComponentType;
    lootBoxCardComponent: LootBoxCardComponentType;
}

export function RewardForm({ stage, lootBoxSearchComponent, lootBoxCardComponent, ...formProps }: RewardFormProps) {
    const LootBoxSearchWindowComponent = lootBoxSearchComponent;
    const LootBoxCardComponent = lootBoxCardComponent;

    const [currentReward, setCurrentReward] = useState<string>("softCurrency");

    return (
        <Form layout="vertical" {...formProps}>
            <ImageFormField pathname="thumbnail" />

            <Form.Item name="title" label="Title">
                <Input />
            </Form.Item>

            <Form.Item name="requiredTrophyScore" label="Trophy Score">
                <Input type="number" />
            </Form.Item>

            <Form.Item name="isEnabled" label="Enabled" valuePropName="checked">
                <Switch />
            </Form.Item>

            <Form.Item shouldUpdate noStyle>
                <Form.Item label="Reward Type">
                    <Radio.Group defaultValue="softCurrency" onChange={(e) => setCurrentReward(e.target.value)}>
                        <Radio.Button value="softCurrency">Soft Currency</Radio.Button>
                        <Radio.Button value="hardCurrency">Hard Currency</Radio.Button>
                        <Radio.Button value="lootBox">Loot Box</Radio.Button>
                        <Radio.Button value="asset">Asset</Radio.Button>
                    </Radio.Group>
                </Form.Item>
            </Form.Item>

            <Form.Item name="reward">
                {currentReward === "asset" ? (
                    <Form.Item shouldUpdate label="Reward Value" required>
                        {(props) => <AssetSelectionFormField stage={stage} {...(props as any)} />}
                    </Form.Item>
                ) : currentReward === "lootBox" ? (
                    <Form.Item shouldUpdate label="Reward Value" required>
                        {({ getFieldValue, setFieldValue, validateFields }) => {
                            const lootBoxId = getFieldValue("lootBoxId");

                            const onLootBoxClick = (item: LootBox) => {
                                setFieldValue("lootBoxId", item.id);
                                validateFields();
                            };

                            return (
                                <>
                                    <LootBoxSearchWindowComponent onLootBoxClick={onLootBoxClick}>
                                        <Button type="primary" ghost>
                                            Select
                                        </Button>
                                    </LootBoxSearchWindowComponent>

                                    {lootBoxId && <LootBoxCardComponent lootBoxId={lootBoxId} width={200} />}

                                    <Form.Item name="lootBoxId" noStyle>
                                        <></>
                                    </Form.Item>
                                </>
                            );
                        }}
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
