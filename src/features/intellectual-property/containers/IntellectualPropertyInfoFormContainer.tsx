import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card as AntdCard, Button, message } from "antd";
import { useForm } from "antd/es/form/Form";
import styled from "styled-components";

import { FixedPageHeader } from "shared";
import { useWatermarkSearch } from "features/watermark-moderation";
import { upsertSingleIntellectualPropertyAction } from "../store/actions";
import { intellectualPropertyInfoByIdSelector } from "../store/reducer";
import { IntellectualProperty } from "../services";
import { IntellectualPropertyInfoForm } from "../components/IntellectualPropertyInfoForm";

export interface IntellectualPropertyInfoFormContainerProps {
    stage: string;
    id: number;
}

export function IntellectualPropertyInfoFormContainer({ stage, id }: IntellectualPropertyInfoFormContainerProps) {
    const dispatch = useDispatch();
    const { info: watermarkInfo } = useWatermarkSearch({ stage });
    const info = useSelector(intellectualPropertyInfoByIdSelector(stage, id));

    const [isSaveHeaderOpen, setIsSaveHeaderOpen] = useState<boolean>(false);

    const [form] = useForm<IntellectualProperty>();

    const showSaveHeader = () => setIsSaveHeaderOpen(true);

    const handleOnClickSave = async () => {
        const formData = await form.validateFields();

        if (!formData || !info.data) {
            message.error("Something went wrong. Source data is missing");
            return;
        }

        dispatch(upsertSingleIntellectualPropertyAction({ stage, data: { ...info.data, ...formData } }));
        setIsSaveHeaderOpen(false);
    };

    const discard = () => {
        setIsSaveHeaderOpen(false);
        form.resetFields();
    };

    return (
        <Card loading={!info.data && info.loading} title="Info">
            <IntellectualPropertyInfoForm
                form={form}
                initialValues={info.data}
                onFieldsChange={showSaveHeader}
                watermarks={watermarkInfo}
            />
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
