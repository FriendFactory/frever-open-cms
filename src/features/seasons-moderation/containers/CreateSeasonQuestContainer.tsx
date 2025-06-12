import React, { useState } from "react";
import { Button, Modal } from "antd";
import { BaseButtonProps } from "antd/lib/button/button";
import { useDispatch } from "react-redux";
import { useForm } from "antd/lib/form/Form";
import { useLocation } from "react-router";

import { postSeasonEntityAction } from "../store/actions";
import { SEASON_DETAILS_PAGE_URL } from "urls";
import { SeasonEntity } from "../services";
import { QuestForm } from "../components/QuestForm";

export function CreateSeasonQuestContainer({ children, ...restProps }: BaseButtonProps) {
    const location = useLocation();
    const dispatch = useDispatch();
    const urlMatch = SEASON_DETAILS_PAGE_URL.match(location);

    if (!urlMatch.isMatched) {
        return null;
    }

    const [form] = useForm<SeasonEntity>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const destroyModal = () => setIsModalOpen(false);
    const showModal = () => setIsModalOpen(true);

    const handleOnSubmit = async () => {
        const data = await form.validateFields();
        dispatch(
            postSeasonEntityAction({
                stage: urlMatch.params.stage,
                entityName: "quests",
                data: { ...data, seasonId: urlMatch.params.id }
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
                title="Create New Season Quest"
                open={isModalOpen}
                destroyOnClose
                maskClosable={false}
                onCancel={handleOnReset}
                footer={[
                    <Button key="reset" onClick={handleOnReset}>
                        Cancel
                    </Button>,
                    <Button key="submit" onClick={handleOnSubmit} type="primary">
                        Create
                    </Button>
                ]}>
                <QuestForm form={form} />
            </Modal>
        </>
    );
}
