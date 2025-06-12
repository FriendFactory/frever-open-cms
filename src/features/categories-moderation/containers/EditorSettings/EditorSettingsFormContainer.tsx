import React, { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Button, message } from "antd";

import { editorSettingsPageSelector } from "features/categories-moderation/store/reducer";
import { updateEditorSettingsAction } from "features/categories-moderation/store/actions/editorSettingsDetails";
import { EditorSettings } from "features/categories-moderation/services/api";
import { EditorSettingsForm } from "features/categories-moderation/components/EditorSettingsDetails/EditorSettingsForm";
import { useForm } from "antd/lib/form/Form";
import { FixedPageHeader } from "shared";

export interface EditorSettingsFormContainerProps {
    stage: string;
    id: number;
}

export function EditorSettingsFormContainer({ stage, id }: EditorSettingsFormContainerProps) {
    const dispatch = useDispatch();

    const info = useSelector(editorSettingsPageSelector(stage, id), shallowEqual);

    const [form] = useForm();
    const [isSaveHeaderOpen, setIsSaveHeaderOpen] = useState(false);

    useEffect(() => {
        if (info.data) form.resetFields();
    }, [info.data]);

    const showSaveHeader = () => setIsSaveHeaderOpen(true);
    const hideSaveHeader = () => setIsSaveHeaderOpen(false);

    const handleOnFinish = (data: Partial<EditorSettings>) => {
        if (!data.characterEditorSettings && !data.levelEditorSettings && !data.postRecordEditorSettings) {
            message.error(`At least one "Page Settings" must be Not Empty`);
            return;
        }
        if (!info.data) {
            message.error("Something went wrong... Editor Settings data is missing.");
            return;
        }

        dispatch(updateEditorSettingsAction({ stage, id, data: { ...info.data, ...data } }));
        hideSaveHeader();
    };

    return (
        <>
            <EditorSettingsForm
                editorSettingsId={id}
                id="EditorSettingsForm"
                form={form}
                stage={stage}
                initialValues={info.data}
                loading={info.loading && !info.data}
                disabled={info.loading}
                onFinish={handleOnFinish}
                onReset={hideSaveHeader}
                onFieldsChange={showSaveHeader}
            />

            {isSaveHeaderOpen && (
                <FixedPageHeader
                    title="Unsaved changes"
                    extra={[
                        <Button key="reset" htmlType="reset" form="EditorSettingsForm">
                            Discard
                        </Button>,
                        <Button key="submit" type="primary" htmlType="submit" form="EditorSettingsForm">
                            Save
                        </Button>
                    ]}
                />
            )}
        </>
    );
}
