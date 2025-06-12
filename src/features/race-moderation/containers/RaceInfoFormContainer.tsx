import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card as AntdCard, Button, message } from "antd";
import { useForm } from "antd/es/form/Form";
import styled from "styled-components";

import { useIntellectualPropertySearch } from "features/intellectual-property";
import { FixedPageHeader } from "shared";
import { Race } from "../services";
import { upsertSingleRaceAction } from "../store/actions";
import { raceInfoByIdSelector } from "../store/reducer";
import { RaceInfoForm } from "../components/RaceInfoForm";

export interface RaceInfoFormContainerProps {
    stage: string;
    id: number;
}

export function RaceInfoFormContainer({ stage, id }: RaceInfoFormContainerProps) {
    const dispatch = useDispatch();
    const { info: IpInfo } = useIntellectualPropertySearch({ stage });
    const info = useSelector(raceInfoByIdSelector(stage, id));

    const [isSaveHeaderOpen, setIsSaveHeaderOpen] = useState<boolean>(false);

    const [form] = useForm<Race>();

    const showSaveHeader = () => setIsSaveHeaderOpen(true);

    const handleOnClickSave = async () => {
        const formData = await form.validateFields();

        if (!formData || !info.data) {
            message.error("Something went wrong. Source data is missing");
            return;
        }

        dispatch(upsertSingleRaceAction({ stage, data: { ...info.data, ...formData } }));
        setIsSaveHeaderOpen(false);
    };

    const discard = () => {
        setIsSaveHeaderOpen(false);
        form.resetFields();
    };

    return (
        <Card loading={!info.data && info.loading} title="Info">
            <RaceInfoForm
                form={form}
                initialValues={info.data}
                onFieldsChange={showSaveHeader}
                intellectualProperty={IpInfo}
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
