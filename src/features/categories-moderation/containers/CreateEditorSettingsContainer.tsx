import React, { useState } from "react";
import { Button, message, Modal } from "antd";
import { useDispatch } from "react-redux";

import { createEditorSettingsAction } from "../store/actions/editorSettingsDetails";
import { EditorSettings } from "../services/api";
import { EditorSettingsForm } from "../components/EditorSettingsDetails/EditorSettingsForm";
import { ContentBlankLayout } from "layout/ContentBlankLayout";

export const formId = "CreateEditorSettingsForm";

const initialValues = {
    name: "",
    levelCreation: false,
    levelEditorSettings: null,
    postRecordEditorSettings: null,
    characterEditorSettings: null
};

export interface CreateTaskContainerProps {
    stage: string;
}

export function CreateEditorSettingsContainer({ stage }: CreateTaskContainerProps) {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const destroyModal = () => setIsModalOpen(false);
    const showModal = () => setIsModalOpen(true);

    const handleOnFinish = (data: EditorSettings) => {
        if (!data.characterEditorSettings && !data.levelEditorSettings && !data.postRecordEditorSettings) {
            message.error(`At least one "Page Settings" must be Not Empty`);
            return;
        }

        dispatch(createEditorSettingsAction({ stage, data }));
        destroyModal();
    };

    return (
        <>
            <a onClick={showModal}>Create new</a>
            <Modal
                title="Create Editor Settings"
                open={isModalOpen}
                destroyOnClose
                width="1024px"
                style={{ top: "20px" }}
                styles={{
                    body: {
                        overflowY: "auto",
                        maxHeight: "calc(100vh - 152px)",
                        margin: 0,
                        padding: 0
                    }
                }}
                footer={[
                    <Button key="cancel-editor-settings-form" onClick={destroyModal}>
                        Cancel
                    </Button>,
                    <Button key="submit-editor-settings-form" htmlType="submit" type="primary" form={formId}>
                        Create
                    </Button>
                ]}
                onCancel={destroyModal}
                maskClosable={false}>
                <ContentBlankLayout>
                    <EditorSettingsForm
                        id={formId}
                        stage={stage}
                        initialValues={initialValues}
                        onFinish={handleOnFinish}
                    />
                </ContentBlankLayout>
            </Modal>
        </>
    );
}
