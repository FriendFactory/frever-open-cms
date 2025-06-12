import React from "react";
import { Card, Col, Row, ColProps } from "antd";
import dayjs from "dayjs";

import { Template } from "features/video-templates/services";
import { EVENT_DETAILS_PAGE_URL, USER_DETAILS_INFO_URL } from "urls";
import { CreateTaskContainer } from "features/video-tasks/containers/CreateTask/CreateTaskContainer";
import { ProtectedLink } from "shared";

const colSize: ColProps = { xs: 24, xl: 12, xxl: 8 };

export interface TemplateInfoProps {
    stage: string;
    loading: boolean;
    template?: Template;
    onClickDelete: () => void;
}

export function TemplateInfo({ stage, loading, template, onClickDelete }: TemplateInfoProps) {
    const startTime: number = template?.videoClipStartTimeMs ? +template.videoClipStartTimeMs : 0;
    const endTime: number = template?.videoClipEndTimeMs ? +template.videoClipEndTimeMs : 1000;
    const duration = dayjs.duration(endTime - startTime).format("m:s");
    return (
        <Card
            loading={loading}
            title="Information"
            extra={
                template && <CreateTaskContainer stage={stage} button={<a>Create Task</a>} templateId={template.id} />
            }>
            <Row gutter={[24, 24]}>
                <Col {...colSize}>Usage Count: {template?.usageCount}</Col>
                <Col {...colSize}>
                    Creator Name:{" "}
                    {template && (
                        <ProtectedLink
                            feature="Social"
                            to={USER_DETAILS_INFO_URL.format({
                                stage,
                                selector: "mainGroupId",
                                id: template.creatorId
                            })}>
                            {template.creatorName}
                        </ProtectedLink>
                    )}
                </Col>
                <Col {...colSize}>Artist Name: {template?.artistName}</Col>
                <Col {...colSize}>
                    Event:&nbsp;
                    {template?.eventId ? (
                        <ProtectedLink
                            feature="Social"
                            to={EVENT_DETAILS_PAGE_URL.format({ stage, id: template.eventId })}>
                            {template.eventId}
                        </ProtectedLink>
                    ) : (
                        "None"
                    )}
                </Col>
                <Col {...colSize}>
                    Is Deleted:&nbsp;
                    {template?.isDeleted ? "Yes" : "No"}&nbsp;
                    <a onClick={onClickDelete}>{template?.isDeleted ? "Undo" : "Delete"}</a>
                </Col>
                <Col {...colSize}>Character count: {template?.characterCount}</Col>
                <Col {...colSize}>Song Name: {template?.songName}</Col>
                <Col {...colSize}>Start Time: {startTime}ms</Col>
                <Col {...colSize}>End Time: {endTime}ms</Col>
                <Col {...colSize}>Duration: {duration}ms</Col>
            </Row>
        </Card>
    );
}
