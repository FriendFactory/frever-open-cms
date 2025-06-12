import React from "react";
import { UrlPath } from "rd-url-utils";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { Alert, Row, Typography } from "antd";
import dayjs from "dayjs";

import { PageHeader } from "shared";
import { outfitDetailsPageSelector } from "../store/reducer/outfitDetails.reducer";

const { Title, Text } = Typography;

export interface OutfitHeaderContainerProps {
    url: UrlPath<{ stage: string; id: number }, {}>;
}

export function OutfitHeaderContainer({ url }: OutfitHeaderContainerProps) {
    const location = useLocation();

    const urlMatch = url.match(location);
    if (!urlMatch.isMatched) return <Alert message="Invalid URL" />;

    const { data } = useSelector(outfitDetailsPageSelector(urlMatch.params.stage, urlMatch.params.id));
    return (
        <PageHeader
            title={"Outfit: " + data?.id ?? "..."}
            withBackButton
            extra={
                <Title level={3} type={data?.isDeleted ? "danger" : "secondary"}>
                    {data?.isDeleted ? "Deleted" : "Active"}
                </Title>
            }>
            <Row justify="space-between">
                <Text type="secondary">
                    {data?.createdTime
                        ? `Created Time: ${dayjs.utc(data?.createdTime).format("DD MMM YYYY HH:mm:ss")}`
                        : null}
                </Text>

                <Text type="secondary">
                    {data?.modifiedTime
                        ? `Modified Time: ${dayjs.utc(data?.modifiedTime).format("DD MMM YYYY HH:mm:ss")}`
                        : null}
                </Text>
            </Row>
        </PageHeader>
    );
}
