import React from "react";
import { Button, Card, Col, Dropdown, Empty, Row } from "antd";
import dayjs from "dayjs";
import { MoreOutlined } from "@ant-design/icons";

import { Task } from "../services";
import { LEVEL_DETAILS_URL, VIDEO_MODERATION_LIST_URL } from "urls";
import { TEMPLATE_DETAILS_URL } from "urls";
import { ProtectedLink } from "shared";

export interface TaskInfoProps {
    stage: string;
    loading: boolean;
    data?: Task;
    handleOnClickCopyTask: () => void;
}

export function TaskInfo({ stage, loading, data, handleOnClickCopyTask }: TaskInfoProps) {
    const items = [{ key: "copy-task", label: "Copy task", onClick: handleOnClickCopyTask }];
    return (
        <Card
            loading={loading}
            title="Information"
            extra={
                <Dropdown menu={{ items }}>
                    <Button icon={<MoreOutlined />} />
                </Dropdown>
            }>
            {data ? (
                <Row gutter={[24, 24]}>
                    {data?.levelId && (
                        <Col xs={24} xl={12} xxl={8}>
                            Level:{" "}
                            <ProtectedLink feature="Social" to={LEVEL_DETAILS_URL.format({ stage, id: data.levelId })}>
                                {data.levelId}
                            </ProtectedLink>
                        </Col>
                    )}
                    {data?.templateId && (
                        <Col xs={24} xl={12} xxl={8}>
                            Template:{" "}
                            <ProtectedLink
                                feature="VideoModeration"
                                to={TEMPLATE_DETAILS_URL.format({ stage, id: data.templateId })}>
                                {data.templateId}
                            </ProtectedLink>
                        </Col>
                    )}
                    <Col xs={24} xl={12} xxl={8}>
                        Character Count: {data?.characterCount ?? "None"}
                    </Col>
                    <Col xs={24} xl={12} xxl={8}>
                        Total Videos:{" "}
                        <ProtectedLink
                            feature="VideoModeration"
                            to={VIDEO_MODERATION_LIST_URL.format({ stage }, { schoolTaskId: data.id })}>
                            {data.totalVideoCount}
                        </ProtectedLink>
                    </Col>
                    <Col xs={24} xl={12} xxl={8}>
                        Created Time:{" "}
                        {data?.createdTime ? dayjs.utc(data?.createdTime).format("DD MMM YYYY  HH:mm:ss") : "Unknown"}
                    </Col>
                    <Col xs={24} xl={12} xxl={8}>
                        Modified Time:{" "}
                        {data?.modifiedTime ? dayjs.utc(data?.modifiedTime).format("DD MMM YYYY  HH:mm:ss") : "Unknown"}
                    </Col>
                </Row>
            ) : (
                <Empty />
            )}
        </Card>
    );
}
