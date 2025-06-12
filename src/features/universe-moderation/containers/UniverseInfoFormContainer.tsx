import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card as AntdCard, Button, message } from "antd";
import styled from "styled-components";
import { useForm } from "antd/es/form/Form";

import { FixedPageHeader } from "shared";
import { universeInfoByIdSelector } from "../store/reducer";
import { Universe } from "../services";
import { upsertSingleUniverseAction } from "../store/actions";
import { UniverseInfoForm } from "../components/UniverseInfoForm";

export interface UniverseInfoFormContainerProps {
    stage: string;
    id: number;
}

export function UniverseInfoFormContainer({ stage, id }: UniverseInfoFormContainerProps) {
    const dispatch = useDispatch();
    const info = useSelector(universeInfoByIdSelector(stage, id));

    const [isSaveHeaderOpen, setIsSaveHeaderOpen] = useState<boolean>(false);

    const [form] = useForm<Universe>();

    const showSaveHeader = () => setIsSaveHeaderOpen(true);

    const handleOnClickSave = async () => {
        const formData = await form.validateFields();

        if (!formData || !info.data) {
            message.error("Something went wrong. Source data is missing");
            return;
        }

        dispatch(upsertSingleUniverseAction({ stage, data: { item: { ...info.data, ...formData } } }));
        setIsSaveHeaderOpen(false);
    };

    const discard = () => {
        setIsSaveHeaderOpen(false);
        form.resetFields();
    };

    return (
        <Card loading={!info.data && info.loading} title="Info">
            <UniverseInfoForm form={form} initialValues={info.data} onFieldsChange={showSaveHeader} />
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
