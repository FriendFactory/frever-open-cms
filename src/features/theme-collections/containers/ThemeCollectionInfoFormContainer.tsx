import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card as AntdCard, Button, message } from "antd";
import styled from "styled-components";
import { useForm } from "antd/es/form/Form";

import { ThemeCollectionInfoForm } from "../components/ThemeCollectionInfoForm";
import { themeCollectionInfoByIdSelector } from "../store/reducer/collectionListReducer";
import { FixedPageHeader } from "shared";
import { ThemeCollection } from "../services";
import { upsertSingleCollectionAction } from "../store/actions";
import { seasonListPageSelector } from "features/seasons-moderation";

export interface ThemeCollectionInfoFormContainerProps {
    stage: string;
    id: number;
}

export function ThemeCollectionInfoFormContainer({ stage, id }: ThemeCollectionInfoFormContainerProps) {
    const dispatch = useDispatch();
    const info = useSelector(themeCollectionInfoByIdSelector(stage, id));
    const seasonList = useSelector(seasonListPageSelector(stage, {}));

    const [isSaveHeaderOpen, setIsSaveHeaderOpen] = useState<boolean>(false);

    const [form] = useForm<ThemeCollection>();

    const showSaveHeader = () => setIsSaveHeaderOpen(true);

    const handleOnClickSave = async () => {
        const formData = await form.validateFields();

        if (!formData || !info.data) {
            message.error("Something went wrong. Source data is missing");
            return;
        }

        dispatch(upsertSingleCollectionAction({ stage, data: { item: { ...info.data, ...formData } } }));
        setIsSaveHeaderOpen(false);
    };

    const discard = () => {
        setIsSaveHeaderOpen(false);
        form.resetFields();
    };

    return (
        <Card loading={!info.data && info.loading} title="Info">
            <ThemeCollectionInfoForm
                form={form}
                initialValues={info.data}
                onFieldsChange={showSaveHeader}
                seasonList={seasonList}
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
