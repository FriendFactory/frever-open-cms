import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useLocation } from "react-router";
import { useForm, useWatch } from "antd/lib/form/Form";
import { Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { CREW_REWARDS_LIST_URL } from "urls";
import { crewRewardsListSelector } from "../../store/reducer";
import { LoadingContainer } from "shared";
import { CrewRewards } from "../../services";
import { postCrewRewardEntityAction } from "../../store/actions";
import { LootBoxCardComponentType, LootBoxSearchWindowComponentType, RewardForm } from "../../components/RewardForm";

export interface CreateCrewRewardContainerProps {
    lootBoxSearchComponent: LootBoxSearchWindowComponentType;
    lootBoxCardComponent: LootBoxCardComponentType;
}

export function CreateCrewRewardContainer({
    lootBoxSearchComponent,
    lootBoxCardComponent
}: CreateCrewRewardContainerProps) {
    const location = useLocation();
    const dispatch = useDispatch();
    const urlMatch = CREW_REWARDS_LIST_URL.match(location);

    if (!urlMatch.isMatched) return null;

    const { stage } = urlMatch.params;

    const info = useSelector(crewRewardsListSelector(stage, urlMatch.query || {}), shallowEqual);

    const [form] = useForm<CrewRewards & { thumbnail: File } & { reward: undefined }>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const watchFields = useWatch([], form);

    useEffect(() => {
        form.setFields([{ name: "reward", errors: undefined }]);
    }, [watchFields]);

    const destroyModal = () => setIsModalOpen(false);
    const showModal = () => setIsModalOpen(true);

    const handleOnSubmit = async () => {
        const { thumbnail, reward, ...data } = await form.validateFields();

        if (!hasFormReward(data, ["assetId", "softCurrency", "hardCurrency", "lootBoxId"])) {
            form.setFields([{ name: "reward", errors: ["Please enter/select reward value"] }]);
            return;
        }

        dispatch(postCrewRewardEntityAction({ data, thumbnail }));

        form.resetFields();
        destroyModal();
    };

    const handleOnReset = () => {
        form.resetFields();
        destroyModal();
    };

    return (
        <>
            <Button type="primary" ghost icon={<PlusOutlined />} onClick={showModal} />
            <Modal
                title="Create Crew Reward"
                open={isModalOpen}
                destroyOnClose
                width="768px"
                maskClosable={false}
                onCancel={handleOnReset}
                onOk={handleOnSubmit}
                okType="primary"
                okText="Create">
                <RewardForm
                    form={form}
                    stage={stage}
                    lootBoxSearchComponent={lootBoxSearchComponent}
                    lootBoxCardComponent={lootBoxCardComponent}
                />
                <LoadingContainer loading={info.loading} />
            </Modal>
        </>
    );
}

export const hasFormReward = <T extends {}>(formData: T, rewardsKeys: (keyof T)[]) =>
    rewardsKeys.some((key) => formData[key]);
