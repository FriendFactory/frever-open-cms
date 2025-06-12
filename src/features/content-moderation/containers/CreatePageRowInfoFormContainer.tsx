import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card as AntdCard, Button, message } from "antd";
import { useForm } from "antd/es/form/Form";
import styled from "styled-components";

import { FixedPageHeader } from "shared";
import { CreatePageRowDto } from "../services";
import { createPageInfoByIdSelector } from "../store/reducer";
import { upsertSingleCreatePageRowAction } from "../store/actions";
import { CreatePageRowInfoForm } from "../components/CreatePageRowInfoForm";
import { transformCreatePageRowContent } from "../helpers";

export interface CreatePageRowInfoFormContainerProps {
    stage: string;
    id: number;
}

export function CreatePageRowInfoFormContainer({ stage, id }: CreatePageRowInfoFormContainerProps) {
    const dispatch = useDispatch();
    const info = useSelector(createPageInfoByIdSelector(stage, id));

    const [isSaveHeaderOpen, setIsSaveHeaderOpen] = useState<boolean>(false);

    const [form] = useForm<CreatePageRowDto>();

    const showSaveHeader = () => setIsSaveHeaderOpen(true);

    const handleOnClickSave = async () => {
        const formData = await form.validateFields();

        if (!formData || !info.data) {
            message.error("Something went wrong. Source data is missing");
            return;
        }

        dispatch(
            upsertSingleCreatePageRowAction({
                stage,
                data: transformCreatePageRowContent({ ...info.data, ...formData })
            })
        );
        setIsSaveHeaderOpen(false);
    };

    const discard = () => {
        setIsSaveHeaderOpen(false);
        form.resetFields();
    };

    return (
        <Card loading={!info.data && info.loading} title="Info">
            <CreatePageRowInfoForm
                form={form}
                initialValues={info.data}
                onFieldsChange={showSaveHeader}
                disableChangeContent
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
