import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card as AntdCard, Button, message } from "antd";
import styled from "styled-components";
import { useForm } from "antd/es/form/Form";

import { FixedPageHeader } from "shared";
import { VMEBackground } from "../services";
import { vmeBackgroundInfoByIdSelector } from "../store/reducer/vmeBackgroundListReducer";
import { upsertSingleVMEBackgroundAction } from "../store/actions";
import { VMEBackgroundInfoForm } from "../components/VMEBackgroundInfoForm";

export interface VMEBackgroundInfoFormContainerProps {
    stage: string;
    id: number;
}

export function VMEBackgroundInfoFormContainer({ stage, id }: VMEBackgroundInfoFormContainerProps) {
    const dispatch = useDispatch();
    const info = useSelector(vmeBackgroundInfoByIdSelector(stage, id));

    const [isSaveHeaderOpen, setIsSaveHeaderOpen] = useState<boolean>(false);

    const [form] = useForm<VMEBackground>();

    const showSaveHeader = () => setIsSaveHeaderOpen(true);

    const handleOnClickSave = async () => {
        const formData = await form.validateFields();

        if (!formData || !info.data) {
            message.error("Something went wrong. Source data is missing");
            return;
        }

        dispatch(upsertSingleVMEBackgroundAction({ stage, data: { item: { ...info.data, ...formData } } }));
        setIsSaveHeaderOpen(false);
    };

    const discard = () => {
        setIsSaveHeaderOpen(false);
        form.resetFields();
    };

    return (
        <Card loading={!info.data && info.loading} title="Info">
            <VMEBackgroundInfoForm form={form} initialValues={info.data} onFieldsChange={showSaveHeader} />
            <FixedPageHeader
                title="Unsaved chagnes"
                open={isSaveHeaderOpen}
                extra={[
                    <Button onClick={discard}>Discard</Button>,
                    <Button type="primary" onClick={handleOnClickSave}>
                        Save
                    </Button>
                ]}
            />
        </Card>
    );
}

const Card = styled(AntdCard)`
    height: 100%;
`;
