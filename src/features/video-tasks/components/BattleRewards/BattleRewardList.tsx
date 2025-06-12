import React from "react";
import { List, Space } from "antd";

import { BattleReward } from "../../services";
import { RewardSoftCurrency } from "./RewardSoftCurrency";
import { ListTitle } from "./ListTitle";
import CrownIcon from "shared/components/CustomIcons/CrownIcon";
import { InitialBattleReward } from "features/video-tasks/store/actions";

export interface TaskRewardsProps {
    data?: InitialBattleReward[];
    onEditFinish: <T extends BattleReward | InitialBattleReward>(reward: T) => (softCurrencyPayout: number) => void;
}

export const BattleRewardList = ({ data, onEditFinish }: TaskRewardsProps) => {
    return (
        <List
            dataSource={data}
            renderItem={(item) => (
                <List.Item>
                    <Space align="baseline">
                        {PlaceIcons[item.place] ?? ""}
                        <ListTitle level={5}>{PlaceNames[item.place] ?? "Others"}</ListTitle>
                    </Space>
                    <RewardSoftCurrency defaultValue={item.softCurrencyPayout} onEditFinish={onEditFinish(item)} />
                </List.Item>
            )}
        />
    );
};

const PlaceIcons: { [x: number]: React.ReactElement } = {
    1: <CrownIcon iconType="gold" />,
    2: <CrownIcon iconType="silver" />,
    3: <CrownIcon iconType="bronze" />
};

const PlaceNames: any = {
    1: "First place",
    2: "Second place",
    3: "Third place"
};
