import React, { useState } from "react";
import { Button, Modal } from "antd";
import { BaseButtonProps } from "antd/lib/button/button";
import { useDispatch } from "react-redux";
import { useForm } from "antd/lib/form/Form";
import { useLocation } from "react-router";

import { postSeasonEntityAction } from "../store/actions";
import { SEASON_DETAILS_PAGE_URL } from "urls";
import { SeasonEntity } from "../services";
import { RewardForm } from "../components/RewardForm";
import { useSelector, shallowEqual } from "react-redux";
import { seasonDetailsPageSelector } from "../store/reducer/seasonDetails.reducer";
import { LoadingContainer } from "shared";

export function CreateSeasonRewardContainer({ children, ...restProps }: BaseButtonProps) {
    const location = useLocation();
    const dispatch = useDispatch();
    const urlMatch = SEASON_DETAILS_PAGE_URL.match(location);

    if (!urlMatch.isMatched) {
        return null;
    }

    const { stage, id } = urlMatch.params;

    const info = useSelector(seasonDetailsPageSelector(stage, id), shallowEqual);

    const [form] = useForm<SeasonEntity & { thumbnail: File }>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const destroyModal = () => setIsModalOpen(false);
    const showModal = () => setIsModalOpen(true);

    const handleOnSubmit = async () => {
        const { thumbnail, ...restData } = await form.validateFields();

        dispatch(
            postSeasonEntityAction({
                stage,
                entityName: "rewards",
                data: { ...restData, seasonId: urlMatch.params.id },
                thumbnail
            })
        );

        form.resetFields();
        destroyModal();
    };

    const handleOnReset = () => {
        form.resetFields();
        destroyModal();
    };

    return (
        <>
            <Button {...restProps} onClick={showModal}>
                {children}
            </Button>
            <Modal
                title="Create Season Reward"
                open={isModalOpen}
                destroyOnClose
                width="1024px"
                maskClosable={false}
                onCancel={handleOnReset}
                onOk={handleOnSubmit}
                okType="primary"
                okText="Create">
                <RewardForm form={form} stage={stage} quests={info.data?.quests} />
                <LoadingContainer loading={info.loading} />
            </Modal>
        </>
    );
}
