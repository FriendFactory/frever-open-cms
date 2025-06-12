import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { Form, Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { ExchangeOfferForm } from "features/banking-moderation/components/ExchangeOfferForm";
import { ExchangeOffer } from "features/banking-moderation/services";
import { exchangeOfferExecuteComandAction } from "features/banking-moderation/store/actions";
import { BANKING_BASE_URL } from "urls";

export function CreateExchangeOfferFormContainer() {
    const location = useLocation();
    const dispatch = useDispatch();
    const [form] = Form.useForm<ExchangeOffer>();

    const urlMatch = BANKING_BASE_URL.match(location);

    if (!urlMatch.isMatched) return null;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => setIsModalOpen(true);
    const hideModal = () => setIsModalOpen(false);

    const handleOnFinish = async () => {
        const data = await form.validateFields();

        dispatch(exchangeOfferExecuteComandAction({ stage: urlMatch.params.stage, command: { type: "post", data } }));
        hideModal();
    };

    return (
        <>
            <Button type="primary" ghost icon={<PlusOutlined />} onClick={showModal} />

            <Modal
                title="Create exchange offer"
                open={isModalOpen}
                destroyOnClose
                onCancel={hideModal}
                footer={[
                    <Button key="close" onClick={hideModal}>
                        Close
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOnFinish}>
                        Create
                    </Button>
                ]}>
                <ExchangeOfferForm form={form} />
            </Modal>
        </>
    );
}
