import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Card, message } from "antd";
import { useForm } from "antd/es/form/Form";

import { FixedPageHeader } from "shared";
import { upsertEmotionsAction } from "../store/actions";
import { CreateEmotionForm } from "../components/CreateEmotionForm";
import { emotionsByIdSelector } from "../store/reducer/emotionsListReducer";

interface EmotionFormContainerProps {
    stage: string;
    id: number;
}

export function EmotionFormContainer({ stage, id }: EmotionFormContainerProps) {
    const dispatch = useDispatch();
    const info = useSelector(emotionsByIdSelector(stage, id));

    const [form] = useForm();
    const [isSaveHeaderOpen, setIsSaveHeaderOpen] = useState<boolean>(false);

    const showSaveHeader = () => setIsSaveHeaderOpen(true);
    const discardChanges = () => {
        form.resetFields();
        setIsSaveHeaderOpen(false);
    };

    const onFinish = async () => {
        const sourceData = info.data;

        if (!sourceData) message.error("Source data is missing");

        const data = await form.validateFields();

        dispatch(upsertEmotionsAction({ stage, data: { ...sourceData, ...data } }));

        setIsSaveHeaderOpen(false);
    };

    return (
        <Card title="Info" loading={info.loading}>
            <CreateEmotionForm form={form} initialValues={info.data} onFieldsChange={showSaveHeader} />
            <FixedPageHeader
                title="Unsaved changes"
                open={isSaveHeaderOpen}
                extra={[
                    <Button key="discard" onClick={discardChanges}>
                        Discard
                    </Button>,
                    <Button key="save" type="primary" onClick={onFinish}>
                        Save
                    </Button>
                ]}
            />
        </Card>
    );
}
