import React from "react";
import { Row, Typography } from "antd";
import dayjs from "dayjs";

import { PageHeader } from "shared";

export interface DetailsHeaderProps {
    id?: number;
    createdTime?: string;
    modifiedTime?: string;
    deletedAt?: string | null;
}

export function DetailsHeader({ id, createdTime, modifiedTime, deletedAt }: DetailsHeaderProps) {
    return (
        <PageHeader title={"ID: " + id ?? ""} withBackButton>
            <Row justify="space-between">
                {createdTime && (
                    <Typography.Text type="secondary">
                        Created Time: {dayjs.utc(createdTime).format("DD MMM YYYY HH:mm:ss")}
                    </Typography.Text>
                )}

                {modifiedTime && (
                    <Typography.Text type="secondary">
                        Modified Time: {dayjs.utc(modifiedTime).format("DD MMM YYYY HH:mm:ss")}
                    </Typography.Text>
                )}
            </Row>
            {deletedAt && (
                <Typography.Text style={{ float: "right" }} type="warning">
                    Notice: User Sound is deleted. All related videos are possibly hidden.
                </Typography.Text>
            )}
        </PageHeader>
    );
}
