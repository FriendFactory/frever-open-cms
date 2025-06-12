import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { CREATOR_CANDIDATE_BASE_URL } from "urls";
import { executeCreatorCandidateCommandAction } from "../store/actions";
import { CreatorCandidateForm } from "../components/CreatorCandidateForm";

export function CreatorCandidateFormContainer() {
    const location = useLocation();
    const dispatch = useDispatch();

    const ref = useRef<any>();

    const urlMatch = CREATOR_CANDIDATE_BASE_URL.match(location);

    if (!urlMatch.isMatched) return null;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitBtnActive, setIsSubmitBtnActive] = useState<boolean>(false);

    const showModal = () => setIsModalOpen(true);
    const hideModal = () => setIsModalOpen(false);

    const handleOnFinish = async (emails: string[]) => {
        dispatch(
            executeCreatorCandidateCommandAction({ stage: urlMatch.params.stage, command: { type: "create", emails } })
        );
        hideModal();
    };

    const handleOnSubmit = () => ref.current?.onSubmit();

    return (
        <>
            <Button type="primary" ghost icon={<PlusOutlined />} onClick={showModal} />

            <Modal
                title="Add Star Creator Candidate"
                open={isModalOpen}
                destroyOnClose
                onCancel={hideModal}
                footer={[
                    <Button key="close" onClick={hideModal}>
                        Close
                    </Button>,
                    <Button key="add" disabled={!isSubmitBtnActive} onClick={handleOnSubmit} type="primary">
                        Add
                    </Button>
                ]}>
                <CreatorCandidateForm ref={ref} onValidate={setIsSubmitBtnActive} onFinish={handleOnFinish} />
            </Modal>
        </>
    );
}
