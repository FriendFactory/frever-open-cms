import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "antd/es/form/Form";
import { Button, Card, Empty, message } from "antd";

import { CrewDetails } from "../components/CrewDetails";
import { crewInfoByIdSelector } from "../store/reducer";
import { Crew } from "../services";
import { FixedPageHeader, useExtraData } from "shared";
import { deleteCrewAction, updateCrewAction } from "../store/actions";

interface CrewDetailsContainerProps {
    stage: string;
    id: number;
}

export function CrewDetailsContainer({ stage, id }: CrewDetailsContainerProps) {
    const dispatch = useDispatch();
    const [form] = useForm<Crew>();

    const [isSaveTitleVisible, setIsSaveTitleVisible] = useState<boolean>(false);

    const info = useSelector(crewInfoByIdSelector(stage, id));
    const languages = useExtraData({ stage, name: "Language" });

    const handleOnClickSave = async () => {
        const formData = await form.validateFields();

        if (!info.data) {
            message.error("Something went wrong.");
            return;
        }

        dispatch(updateCrewAction({ stage, data: { ...info.data, ...formData } }));
        setIsSaveTitleVisible(false);
    };

    const handleOnClickReset = () => {
        form.resetFields();
        setIsSaveTitleVisible(false);
    };

    const handleOnDelete = () => info.data && dispatch(deleteCrewAction({ stage, data: info.data }));

    return (
        <Card title="Info" loading={info.loading}>
            {info.data ? (
                <>
                    <CrewDetails
                        form={form}
                        onClickDelete={handleOnDelete}
                        onFieldsChange={() => !isSaveTitleVisible && setIsSaveTitleVisible(true)}
                        data={info.data}
                        languages={languages ?? []}
                    />
                    {isSaveTitleVisible && (
                        <FixedPageHeader
                            title="Unsaved changes"
                            extra={[
                                <Button key="crew-form-discard" onClick={handleOnClickReset}>
                                    Discard
                                </Button>,
                                <Button key="crew-form-save" type="primary" onClick={handleOnClickSave}>
                                    Save
                                </Button>
                            ]}
                        />
                    )}
                </>
            ) : (
                <Empty />
            )}
        </Card>
    );
}
