import React from "react";
import { Form, Card } from "antd";

import { BattleRewardList } from "./BattleRewards/BattleRewardList";
import { checkIsTaskVotingType } from "../helpers";
import { InitialBattleReward } from "../store/actions";
import { defaultBattleRewards } from "../constants";

export function BattleRewardsFormItem() {
    return (
        <Form.Item shouldUpdate noStyle>
            {({ getFieldValue, setFieldValue }) => {
                const taskType = getFieldValue("taskType");

                const currentValues: InitialBattleReward[] = getFieldValue("defaultRewards");

                if (!currentValues) setFieldValue("defaultRewards", defaultBattleRewards);

                const onChange = (targetReward: InitialBattleReward) => (softCurrencyPayout: number) => {
                    const newValues = currentValues.map((el) =>
                        el.place === targetReward.place ? { ...el, softCurrencyPayout } : el
                    );

                    setFieldValue("defaultRewards", newValues);
                };
                return checkIsTaskVotingType(taskType) ? (
                    <Card type="inner">
                        <Form.Item name="defaultRewards" noStyle>
                            <BattleRewardList data={currentValues} onEditFinish={onChange} />
                        </Form.Item>
                    </Card>
                ) : null;
            }}
        </Form.Item>
    );
}
