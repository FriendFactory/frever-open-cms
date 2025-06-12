import React from "react";
import { Card, Col, Empty, Row, Typography } from "antd";
import dayjs from "dayjs";

import { ExternalSongListCommandsContainer } from "features/search-assets/containers/ExternalSongList/ExternalSongListCommandsContainer";
import { ExternalSong } from "features/search-assets/services";
import { countryNamesByISONames } from "./ExternalSongList";
import { ExtraDataResult } from "shared/store";

export interface ExternalSongInfoProps {
    loading: boolean;
    data?: ExternalSong;
    countries: ExtraDataResult<"Country">;
}

export function ExternalSongInfo({ loading, data, countries }: ExternalSongInfoProps) {
    return (
        <Card
            loading={loading || countries?.loading}
            title="Information"
            extra={
                data && (
                    <ExternalSongListCommandsContainer
                        id={data.id}
                        isDeleted={data.isDeleted}
                        isManuallyDeleted={data.isManuallyDeleted}
                    />
                )
            }>
            {data ? (
                <Row gutter={[24, 24]}>
                    <Col xs={24} xl={12} xxl={8}>
                        ISRC: {data?.isrc ?? "None"}
                    </Col>
                    <Col xs={24} xl={12} xxl={8}>
                        Last License Check:{" "}
                        {data?.lastLicenseStatusCheckAt
                            ? dayjs.utc(data?.lastLicenseStatusCheckAt).format("DD MMM YYYY  HH:mm:ss")
                            : "Unknown"}
                    </Col>
                    <Col xs={24} xl={12} xxl={8}>
                        Uncleared Since:{" "}
                        {data?.notClearedSince
                            ? dayjs.utc(data?.notClearedSince).format("DD MMM YYYY  HH:mm:ss")
                            : "Unknown"}
                    </Col>
                    <Col xs={24} xl={12} xxl={8}>
                        <Typography.Paragraph ellipsis={{ expandable: true, symbol: "more" }}>
                            Excluded Countries:{" "}
                            {countryNamesByISONames(countries.data, data.excludedCountries)?.join(", ")}
                        </Typography.Paragraph>
                    </Col>
                </Row>
            ) : (
                <Empty />
            )}
        </Card>
    );
}
