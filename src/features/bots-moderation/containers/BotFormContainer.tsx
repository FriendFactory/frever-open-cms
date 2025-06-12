import React, { useState } from "react";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { Alert, Button, Card, message } from "antd";

import { BOT_DETAILS_PAGE_URL } from "urls";
import { botInfoPageSelector } from "../store/reducer/bot";
import { BotForm, UserCard, UserSearchWindow } from "../components/BotForm";
import { FixedPageHeader } from "shared";
import { useForm } from "antd/es/form/Form";
import { useDispatch } from "react-redux";
import { upsertBotAction } from "../store/actions";

export interface BotFormContainerProps {
    userSearchWindowComponent: UserSearchWindow;
    userCardComponent: UserCard;
}

export function BotFormContainer({ userSearchWindowComponent, userCardComponent }: BotFormContainerProps) {
    const dispatch = useDispatch();
    const [form] = useForm();
    const location = useLocation();
    const urlMatch = BOT_DETAILS_PAGE_URL.match(location);

    if (!urlMatch.isMatched) return <Alert message="Invalid URL" />;
    const info = useSelector(botInfoPageSelector(urlMatch.params.stage, urlMatch.params.id));

    const [isSaveHeaderOpen, setIsSetHeaderOpen] = useState<boolean>(false);

    const handleOnFinish = async () => {
        const formData = await form.validateFields();
        if (info.data) {
            dispatch(upsertBotAction({ stage: urlMatch.params.stage, data: { ...info.data, ...formData } }));
        } else {
            message.error("Something went wrong. The source data is missing");
        }
        setIsSetHeaderOpen(false);
    };

    const handleOnCancel = () => {
        setIsSetHeaderOpen(false);
        form.resetFields();
    };

    return (
        <Card title="Info" loading={!info.data && info.loading}>
            <BotForm
                form={form}
                onFieldsChange={() => setIsSetHeaderOpen(true)}
                layout="horizontal"
                labelCol={{ flex: "180px" }}
                wrapperCol={{ span: 12, xs: 18 }}
                initialValues={info.data}
                disabled={info.loading}
                userSearchWindowComponent={userSearchWindowComponent}
                userCardComponent={userCardComponent}
            />
            {isSaveHeaderOpen && (
                <FixedPageHeader
                    extra={[
                        <Button key="cancel" onClick={handleOnCancel}>
                            Cancel
                        </Button>,
                        <Button type="primary" key="save" onClick={handleOnFinish}>
                            Save
                        </Button>
                    ]}
                />
            )}
        </Card>
    );
}
