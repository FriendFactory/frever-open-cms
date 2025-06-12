import React, { useState } from "react";
import { Button, Form, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";

import {
    checkSongAvailabilityInBannerMarket,
    PromotedSongForm,
    PromotedSongFormValues
} from "../components/PromotedSongForm";
import { useCurrentStage } from "shared";
import { promotedSongPostAction } from "../store/actions";

export function PromotedSongFormContainer() {
    const dispatch = useDispatch();
    const stage = useCurrentStage();

    const [form] = Form.useForm<PromotedSongFormValues>();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => !isModalOpen && setIsModalOpen(true);
    const destroyModal = () => isModalOpen && setIsModalOpen(false);

    const handleOnReset = () => {
        form.resetFields();
        destroyModal();
    };

    const handleOnFinish = async () => {
        const formData = await form.validateFields();

        const { file, songName, songCountries, ...data } = formData;

        if (!checkSongAvailabilityInBannerMarket(formData.availableForCountries, songCountries)) {
            message.warning("Selected Song is not available in all the banner markets");
            return;
        }

        if (!data.songId && !data.externalSongId) {
            message.warning("Song not selected");
            return;
        }

        if (!file) {
            message.warning("Image not selected");
            return;
        }

        dispatch(promotedSongPostAction({ stage, items: [{ data, file }] }));

        destroyModal();
    };

    return (
        <>
            <Button type="primary" ghost icon={<PlusOutlined />} onClick={showModal} />

            <Modal
                title="Create Promoted Song"
                destroyOnClose
                open={isModalOpen}
                onCancel={handleOnReset}
                footer={[
                    <Button key="reset" onClick={handleOnReset}>
                        Discard
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOnFinish}>
                        Submit
                    </Button>
                ]}>
                <PromotedSongForm form={form} stage={stage} />
            </Modal>
        </>
    );
}
