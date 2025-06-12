import React, { useState } from "react";
import { Button, DatePicker, Space, Typography } from "antd";
import { CheckOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";
import styled from "styled-components";

import { PageHeader } from "shared";
import { AssetUploaderUser } from "features/search-assets";

const { Text, Title } = Typography;

export interface AssetHeaderProps {
    id?: number;
    name?: string;
    createdTime?: string;
    modifiedTime?: string;
    stageTitle?: string;
    onSubmit: (createdTime: string) => void;
    extraHeader?: React.ReactNode;
}

export function AssetHeader({
    id,
    name,
    createdTime,
    modifiedTime,
    stageTitle,
    onSubmit,
    extraHeader
}: AssetHeaderProps) {
    const [editCreatedTime, setEditCreatedTime] = useState(false);

    const [value, setValue] = useState<Dayjs>();

    const handleOnSubmit = () => {
        value && onSubmit(value.format());
        setEditCreatedTime(false);
    };
    return (
        <PageHeader
            withBackButton
            title={name ?? ""}
            extra={
                <Title level={3} type="secondary">
                    ID: {id ?? "..."}
                </Title>
            }>
            <BottomSide>
                <div>
                    <Space direction="vertical" size={0}>
                        {createdTime && (
                            <Text type="secondary">
                                Created Time:{" "}
                                {editCreatedTime ? (
                                    <span>
                                        <DatePicker
                                            defaultOpen
                                            defaultValue={dayjs.utc(createdTime)}
                                            format="DD-MMM-YYYY HH:mm:ss"
                                            onChange={(event) => event && setValue(event)}
                                        />
                                        <Button type="link" icon={<CheckOutlined />} onClick={handleOnSubmit} />
                                        <Button
                                            danger
                                            type="text"
                                            icon={<CloseOutlined />}
                                            onClick={() => setEditCreatedTime(false)}
                                        />
                                    </span>
                                ) : (
                                    <span>
                                        {dayjs.utc(createdTime).format("DD MMM YYYY HH:mm:ss")}
                                        <Button
                                            type="text"
                                            icon={<EditOutlined />}
                                            onClick={() => setEditCreatedTime(true)}
                                        />
                                    </span>
                                )}
                            </Text>
                        )}
                        <AssetUploaderUser targetUser="uploaderUserId" />
                    </Space>
                </div>

                <div>
                    <Title level={3}>{stageTitle ?? ""}</Title>
                </div>

                <div>
                    <Space direction="vertical" size={0}>
                        {modifiedTime && (
                            <Text type="secondary">
                                Modified Time:
                                {dayjs.utc(modifiedTime).format("DD MMM YYYY HH:mm:ss")}
                            </Text>
                        )}
                        <AssetUploaderUser targetUser="updatedByUserId" />
                    </Space>
                </div>
            </BottomSide>
            {extraHeader}
        </PageHeader>
    );
}

const BottomSide = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;

    & > div {
        flex: 33.3%;

        &:nth-child(2) {
            text-align: center;
        }

        &:nth-child(3) {
            text-align: end;
        }
    }
`;
