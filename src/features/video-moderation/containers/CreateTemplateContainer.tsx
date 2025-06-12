import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Empty, Modal } from "antd";
import { Store } from "antd/lib/form/interface";

import { CreateTemplateForm } from "../components/CreateTemplateForm";
import { eventsOfLevelLoadAction, eventsOfLevelSelector } from "../store";
import { LoadingContainer } from "shared";
import { createTemplateAction } from "features/video-moderation/store/actions/createTemplate";

export interface CreateTemplateContainerProps {
    btnText: string;
    stage: string;
    levelId: number;
}

export function CreateTemplateContainer({ btnText, stage, levelId }: CreateTemplateContainerProps) {
    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const hideModal = () => setIsModalOpen(false);

    const events = useSelector(eventsOfLevelSelector(stage, levelId));

    useEffect(() => {
        if (!events?.data && !events?.loading) {
            dispatch(eventsOfLevelLoadAction({ stage: stage, levelId }));
        }
    }, [stage, levelId]);

    const createTemplate = (form: Store) => {
        hideModal();
        dispatch(createTemplateAction({ stage: stage, data: { ...form, useLevelVideo: true } }));
    };

    if (!events?.loading && !events?.data?.length) return <Empty description="Level Data Not Found" />;

    return (
        <>
            <div onClick={() => setIsModalOpen(true)}>{btnText}</div>
            <Modal
                title="Create Template"
                width={768}
                style={{ top: "20px" }}
                styles={{ body: { overflowY: "auto", maxHeight: "calc(100vh - 152px)" } }}
                open={isModalOpen}
                destroyOnClose
                footer={
                    <>
                        <Button onClick={hideModal}>Cancel</Button>
                        <Button htmlType="submit" type="primary" form="create-template">
                            Create Template
                        </Button>
                    </>
                }
                onCancel={hideModal}
                maskClosable={false}>
                {events?.data && (
                    <CreateTemplateForm stage={stage} events={events?.data} createTemplate={createTemplate} />
                )}
                {events?.loading && !events?.data && <LoadingContainer loading />}
            </Modal>
        </>
    );
}
