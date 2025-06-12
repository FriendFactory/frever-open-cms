import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card as AntdCard, Button, message, Divider } from "antd";
import styled from "styled-components";
import { useForm } from "antd/es/form/Form";

import { FixedPageHeader } from "shared";
import { backgroundAIInfoByIdSelector } from "features/vme-backgrounds/store/reducer/BackgroundAI/backgroundAIListReducer";
import { BackgroundAI } from "features/vme-backgrounds/services";
import { upsertSingleBackgroundAIAction } from "features/vme-backgrounds/store/actions/BackgroundAI";
import { VMEBackgroundInfoForm } from "features/vme-backgrounds/components/VMEBackgroundInfoForm";
import {
    BackgroundAIGenerationForm,
    BackgroundAIOptionsForm,
    BackgroundAIPropmtsForm
} from "features/vme-backgrounds/components/BackgroundAI";

export interface BackgroundAIInfoFormContainerProps {
    stage: string;
    id: number;
}

export function BackgroundAIInfoFormContainer({ stage, id }: BackgroundAIInfoFormContainerProps) {
    const dispatch = useDispatch();
    const info = useSelector(backgroundAIInfoByIdSelector(stage, id));

    const [isSaveHeaderOpen, setIsSaveHeaderOpen] = useState<boolean>(false);

    const [form] = useForm<BackgroundAI>();

    const showSaveHeader = () => setIsSaveHeaderOpen(true);

    const handleOnClickSave = async () => {
        const formData = await form.validateFields();

        if (!formData || !info.data) {
            message.error("Something went wrong. Source data is missing");
            return;
        }

        dispatch(upsertSingleBackgroundAIAction({ stage, data: { item: { ...info.data, ...formData } } }));
        setIsSaveHeaderOpen(false);
    };

    const discard = () => {
        setIsSaveHeaderOpen(false);
        form.resetFields();
    };

    return (
        <Card loading={!info.data && info.loading} title="Info">
            <VMEBackgroundInfoForm form={form} initialValues={info.data} onFieldsChange={showSaveHeader} />

            <Divider orientation="left">Settings</Divider>
            <BackgroundAIGenerationForm form={form} initialValues={info.data} onFieldsChange={showSaveHeader} />
            <BackgroundAIPropmtsForm form={form} initialValues={info.data} onFieldsChange={showSaveHeader} />
            <br />
            <BackgroundAIOptionsForm form={form} initialValues={info.data} onFieldsChange={showSaveHeader} />
            <FixedPageHeader
                title="Unsaved chagnes"
                open={isSaveHeaderOpen}
                extra={
                    <>
                        <Button onClick={discard}>Discard</Button>
                        <Button type="primary" onClick={handleOnClickSave}>
                            Save
                        </Button>
                    </>
                }
            />
        </Card>
    );
}

const Card = styled(AntdCard)`
    height: 100%;
`;
