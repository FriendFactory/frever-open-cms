import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card as AntdCard, Button, message, Form } from "antd";
import styled from "styled-components";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";

import { replaceFalsyValuesWithNull } from "utils";
import { FixedPageHeader, ODATA_DATE_FORMAT_UTC } from "shared";
import { scheduledMessageByIdSelector } from "features/community-moderation/store/reducer/scheduledMessage/scheduledMessageListReducer";
import { ScheduledMessage } from "features/community-moderation/services/api";
import { upsertScheduledMessageAction } from "features/community-moderation/store/actions/scheduledMessageList";
import { FormUserGroupIds } from "features/community-moderation/components/MassSendOuts/FormUserGroupIds";
import { FormMessageItems } from "features/community-moderation/components/MassSendOuts/FormMessageItems";
import { FormAudienceSegmentation } from "features/community-moderation/components/MassSendOuts/FormAudienceSegmentation";
import { ScheduledMessageFormDataType } from "./CreateMassSendOutsContainer";

export interface ScheduledMessageInfoFormContainerProps {
    stage: string;
    id: number;
}

export function ScheduledMessageInfoFormContainer({ stage, id }: ScheduledMessageInfoFormContainerProps) {
    const dispatch = useDispatch();
    const info = useSelector(scheduledMessageByIdSelector(stage, id));
    const [isSaveHeaderOpen, setIsSaveHeaderOpen] = useState<boolean>(false);

    const [form] = useForm<ScheduledMessageFormDataType>();

    const showSaveHeader = () => setIsSaveHeaderOpen(true);

    const handleOnClickSave = async () => {
        const {
            scheduledForTime,
            registrationAfterDate,
            registrationBeforeDate,
            lastLoginAfterDate,
            lastLoginBeforeDate,
            image,
            groupIds,
            ...formData
        } = await form.validateFields();

        if (!formData || !info.data) {
            message.error("Something went wrong. Source data is missing");
            return;
        }

        const scheduledMessage: Partial<ScheduledMessage> = {
            ...formData,
            scheduledForTime: scheduledForTime?.utc(true).format(ODATA_DATE_FORMAT_UTC),
            registrationAfterDate: registrationAfterDate?.utc().startOf("day").format(ODATA_DATE_FORMAT_UTC),
            registrationBeforeDate: registrationBeforeDate?.utc().startOf("day").format(ODATA_DATE_FORMAT_UTC),
            lastLoginAfterDate: lastLoginAfterDate?.utc().startOf("day").format(ODATA_DATE_FORMAT_UTC),
            lastLoginBeforeDate: lastLoginBeforeDate?.utc().startOf("day").format(ODATA_DATE_FORMAT_UTC),
            groupIds: groupIds
                ? (groupIds
                      .split(",")
                      .map((id) => Number(id.trim()))
                      .filter((id) => !isNaN(id)) as number[])
                : null,
            files: Array.isArray(image) ? image : null
        };

        const data = replaceFalsyValuesWithNull(scheduledMessage);
        const isNewImage = !Array.isArray(image);

        dispatch(
            upsertScheduledMessageAction({
                stage,
                data: { ...info.data, ...data },
                file: isNewImage ? image : undefined
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
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    ...info.data,
                    scheduledForTime: info.data?.scheduledForTime ? dayjs.utc(info.data?.scheduledForTime) : null,
                    registrationAfterDate: info.data?.registrationAfterDate
                        ? dayjs.utc(info.data?.registrationAfterDate)
                        : null,
                    registrationBeforeDate: info.data?.registrationBeforeDate
                        ? dayjs.utc(info.data?.registrationBeforeDate)
                        : null,
                    lastLoginAfterDate: info.data?.lastLoginAfterDate ? dayjs.utc(info.data?.lastLoginAfterDate) : null,
                    lastLoginBeforeDate: info.data?.lastLoginBeforeDate
                        ? dayjs.utc(info.data?.lastLoginBeforeDate)
                        : null,
                    groupIds: info?.data?.groupIds?.join(", "),
                    image: info?.data?.files ?? null
                }}
                onFieldsChange={showSaveHeader}>
                <FormMessageItems id={info?.data?.id} />
                <FormUserGroupIds />
                <FormAudienceSegmentation />
            </Form>
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
