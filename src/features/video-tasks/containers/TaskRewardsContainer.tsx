import React from "react";
import { useSelector } from "react-redux";
import { Button, Card, Tooltip } from "antd";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { ToolOutlined } from "@ant-design/icons";

import { AppState } from "app-state";
import { taskBattleRewardsSelector } from "../store/reducer/battleRewards.reducer";
import { BattleReward } from "../services";
import { taskDetailsPageSelector } from "../store/reducer";
import { checkIsTaskVotingType } from "../helpers";
import { BattleRewardList } from "../components/BattleRewards/BattleRewardList";
import { generateBattleRewardsAction, updateBattleRewardsAction } from "../store/actions";

export interface TaskRewardsContainerProps {
    stage: string;
    id: number;
}

export const TaskRewardsContainer = ({ stage, id }: TaskRewardsContainerProps) => {
    const dispatch = useDispatch();
    const taskInfo = useSelector(taskDetailsPageSelector(stage, id));
    const info = useSelector((appState: AppState) => appState.taskBattleRewards[taskBattleRewardsSelector(stage, id)]);

    if (!checkIsTaskVotingType(taskInfo.data?.taskType)) return null;

    const handleOnEditFinish = (reward: Partial<BattleReward>) => (softCurrencyPayout: number) => {
        if (reward.softCurrencyPayout === softCurrencyPayout) return;
        dispatch(updateBattleRewardsAction({ stage, data: { ...reward, softCurrencyPayout } }));
    };

    const handleGenerateBattleRewards = () =>
        taskInfo.data?.id && dispatch(generateBattleRewardsAction({ stage, taskId: taskInfo.data?.id }));

    return (
        <CardStyled
            title="Battle Rewards"
            loading={info?.loading}
            extra={
                taskInfo?.data?.id &&
                !info?.data?.length &&
                !info?.loading && (
                    <Tooltip title="Fix battle rewards">
                        <Button type="primary" onClick={handleGenerateBattleRewards} icon={<ToolOutlined />} />
                    </Tooltip>
                )
            }>
            <BattleRewardList data={filterByPlace(info?.data)} onEditFinish={handleOnEditFinish} />
        </CardStyled>
    );
};

const filterByPlace = (battleRewards?: BattleReward[]): BattleReward[] | undefined =>
    battleRewards?.filter((reward) => reward.place >= 1 && reward.place <= 4).sort((a, b) => a.place - b.place);

const CardStyled = styled(Card)`
    .ant-card-body {
        padding: 0 24px;
    }
`;
