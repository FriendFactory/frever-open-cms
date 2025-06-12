import React, { useState } from "react";
import { Button, Modal } from "antd";
import { BaseButtonProps } from "antd/lib/button/button";
import { useDispatch } from "react-redux";
import { useForm } from "antd/lib/form/Form";
import { useLocation } from "react-router";

import { postSeasonEntityAction } from "../store/actions";
import { SEASON_DETAILS_PAGE_URL } from "urls";
import { SeasonEntity } from "../services";
import { ScreenshotForm } from "../components/ScreenshotForm";
import { SCREENSHOT_RESOLUTION } from "./SeasonDetails/ScreenshotsTableContainer";

export function CreateSeasonScreenshotContainer({ children, ...restProps }: BaseButtonProps) {
    const location = useLocation();
    const dispatch = useDispatch();
    const urlMatch = SEASON_DETAILS_PAGE_URL.match(location);

    if (!urlMatch.isMatched) {
        return null;
    }

    const { stage, id } = urlMatch.params;

    const [form] = useForm<SeasonEntity & { thumbnail: File }>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const destroyModal = () => setIsModalOpen(false);
    const showModal = () => setIsModalOpen(true);

    const handleOnSubmit = async () => {
        const { thumbnail, ...restData } = await form.validateFields();

        dispatch(
            postSeasonEntityAction({
                stage,
                entityName: "screenshots",
                data: { ...restData, seasonId: id },
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
                title="Create Season Marketing Screenshot"
                open={isModalOpen}
                destroyOnClose
                maskClosable={false}
                onCancel={handleOnReset}
                onOk={handleOnSubmit}
                okType="primary"
                okText="Create">
                <ScreenshotForm requiredResolution={SCREENSHOT_RESOLUTION} form={form} />
            </Modal>
        </>
    );
}
