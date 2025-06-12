import React, { useState } from "react";
import { Form, FormProps, Input, Radio, Select, Switch } from "antd";

import { AssetSelectionFormField } from "./AssetSelectionFormField";
import { SeasonQuest } from "../services";
import { useExtraData } from "shared/hooks/useExtraData";
import { ImageFormField } from "shared";

export interface RewardFormProps extends FormProps {
    stage: string;
    quests?: SeasonQuest[];
}

export function RewardForm({ stage, quests, ...formProps }: RewardFormProps) {
    const levels = useExtraData({ stage, name: "UserLevel" });
    const [currentReward, setCurrentReward] = useState<string>("softCurrency");

    return (
        <Form layout="vertical" {...formProps}>
            <ImageFormField pathname="thumbnail" />

            <Form.Item name="level" label="Level">
                <Select
                    loading={levels.loading}
                    options={levels.data?.map((el) => ({ label: el.name, value: el.level }))}
                    allowClear
                    showSearch
                    filterOption={(input, option) =>
                        (option?.label.toLocaleLowerCase() ?? "").includes(input.toLowerCase())
                    }
                    filterSort={(optionA, optionB) => optionA.value - optionB.value}
                />
            </Form.Item>

            <Form.Item name="seasonQuestId" label="Quest">
                <Select
                    options={quests?.map((quest) => ({ label: quest.title, value: quest.id }))}
                    allowClear
                    showSearch
                    filterOption={(input, option) =>
                        (option?.label.toLocaleLowerCase() ?? "").includes(input.toLowerCase())
                    }
                />
            </Form.Item>

            <Form.Item name="isPremium" label="Premium" valuePropName="checked">
                <Switch />
            </Form.Item>

            <Form.Item name="isEnabled" label="Enabled" valuePropName="checked">
                <Switch />
            </Form.Item>

            <Form.Item shouldUpdate noStyle>
                <Form.Item label="Reward Type">
                    <Radio.Group defaultValue="softCurrency" onChange={(e) => setCurrentReward(e.target.value)}>
                        <Radio.Button value="softCurrency">Soft Currency</Radio.Button>
                        <Radio.Button value="hardCurrency">Hard Currency</Radio.Button>
                        <Radio.Button value="xp">Xp</Radio.Button>
                        <Radio.Button value="asset">Asset</Radio.Button>
                    </Radio.Group>
                </Form.Item>
            </Form.Item>

            {currentReward === "asset" ? (
                <Form.Item shouldUpdate>
                    {(props) => <AssetSelectionFormField stage={stage} {...(props as any)} />}
                </Form.Item>
            ) : (
                <Form.Item name={currentReward} label="Reward Value">
                    <Input type="number" />
                </Form.Item>
            )}
        </Form>
    );
}
