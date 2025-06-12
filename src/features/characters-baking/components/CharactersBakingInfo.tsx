import React from "react";
import { Card, Col, Divider, Row } from "antd";
import dayjs from "dayjs";

import { CharacterBakedViewStatistics } from "../services/api";
import { CharacterBakingFormQueryParams, CharactersBakingFilter } from "./CharactersBakingFilter";

const colArgs = { xs: 24, md: 12, xxl: 8 };

interface CharactersBakingInfoProps {
    loading: boolean;
    charactersBaking?: CharacterBakedViewStatistics;
    onChangeFilter: (query: CharacterBakingFormQueryParams) => void;
}

export function CharactersBakingInfo({ loading, charactersBaking, onChangeFilter }: CharactersBakingInfoProps) {
    return (
        <Card
            title="Information"
            loading={loading}
            extra={<CharactersBakingFilter charactersBaking={charactersBaking} onChangeFilter={onChangeFilter} />}>
            <Row gutter={[16, 16]} justify="start">
                <Col {...colArgs}>All Requests: {charactersBaking?.allRequestCount ?? "Unknown"}</Col>
                <Col {...colArgs}>Success Requests: {charactersBaking?.successRequestCount ?? "Unknown"}</Col>
                <Col {...colArgs}>Failed Requests: {charactersBaking?.failedRequestCount ?? "Unknown"}</Col>
                <Col {...colArgs}>Version Errors: {charactersBaking?.wrongVersionErrorRequestCount ?? "Unknown"}</Col>

                <Col {...colArgs}>Bakeable Characters: {charactersBaking?.bakeableCharactersCount ?? "Unknown"}</Col>
                <Col {...colArgs}>
                    Non-Bakeable Characters: {charactersBaking?.nonBakeableCharactersCount ?? "Unknown"}
                </Col>
                <Col {...colArgs}>Invalid Wardrobes: {charactersBaking?.invalidWardrobeCount ?? "Unknown"}</Col>

                <Divider style={{ margin: 0 }} />

                <Col {...colArgs}>Min Bake Time: {formatTime(charactersBaking?.minSecondsToBake)}</Col>
                <Col {...colArgs}>Max Bake Time: {formatTime(charactersBaking?.maxSecondsToBake)}</Col>
                <Col {...colArgs}>Avarage Bake Time: {formatTime(charactersBaking?.averageSecondsToBake)}</Col>
            </Row>
        </Card>
    );
}

const formatTime = (secondsInput?: number): string => {
    if (secondsInput === undefined) return "Unknown";

    const duration = dayjs.duration(secondsInput * 1000);

    const days = Math.floor(duration.asDays());
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
};
