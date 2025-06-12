import React, { useState } from "react";
import { Button, Form } from "antd";
import { useForm } from "antd/es/form/Form";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { Dayjs } from "dayjs";

import { ODATA_DATE_FORMAT_UTC, ScrollableModal, useCurrentStage } from "shared";
import { replaceFalsyValuesWithNull } from "utils";
import { FormMessageItems } from "features/community-moderation/components/MassSendOuts/FormMessageItems";
import { FormUserGroupIds } from "features/community-moderation/components/MassSendOuts/FormUserGroupIds";
import { FormAudienceSegmentation } from "features/community-moderation/components/MassSendOuts/FormAudienceSegmentation";
import { ScheduledMessage } from "features/community-moderation/services/api";
import { upsertScheduledMessageAction } from "features/community-moderation/store/actions/scheduledMessageList";

export interface ScheduledMessageFormDataType
    extends Omit<
        ScheduledMessage,
        | "scheduledForTime"
        | "registrationAfterDate"
        | "registrationBeforeDate"
        | "lastLoginAfterDate"
        | "lastLoginBeforeDate"
        | "groupIds"
        | "status"
        | "files"
    > {
    scheduledForTime: Dayjs;
    registrationAfterDate: Dayjs;
    registrationBeforeDate: Dayjs;
    lastLoginAfterDate: Dayjs;
    lastLoginBeforeDate: Dayjs;
    groupIds: string;
    image: File;
}

interface CreateMassSendOutsContainerProps {}

export function CreateMassSendOutsContainer({}: CreateMassSendOutsContainerProps) {
    const dispatch = useDispatch();
    const stage = useCurrentStage();
    const [form] = useForm<ScheduledMessageFormDataType>();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const showModal = () => setIsModalOpen(true);

    const handleDiscard = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    const handleOnFinish = async () => {
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
                : null
        };

        const data = replaceFalsyValuesWithNull(scheduledMessage);

        dispatch(upsertScheduledMessageAction({ stage, data, file: image }));
        setIsModalOpen(false);
        form.resetFields();
    };

    return (
        <>
            <Button type="primary" ghost icon={<PlusOutlined />} onClick={showModal} />

            <ScrollableModal
                title="Create Send Out"
                open={isModalOpen}
                onOk={handleOnFinish}
                onCancel={handleDiscard}
                destroyOnClose>
                <Form form={form} layout="vertical">
                    <FormMessageItems />
                    <FormUserGroupIds />
                    <FormAudienceSegmentation />
                </Form>
            </ScrollableModal>
        </>
    );
}
