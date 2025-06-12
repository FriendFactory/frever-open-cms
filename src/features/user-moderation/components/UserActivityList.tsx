import React from "react";
import { Card, List, Tooltip } from "antd";
import dayjs from "dayjs";
import { CalendarOutlined } from "@ant-design/icons";

import { getActionTypeName } from "features/user-moderation/constants/action-types-names";
import { UserActivity } from "../services";

interface UserActivityListProps {
    stage: string;
    loading: boolean;
    dataSource?: UserActivity[];
    renderItemActions: (item: UserActivity) => React.ReactNode[];
}

export function UserActivityList({ loading, dataSource, renderItemActions }: UserActivityListProps) {
    return (
        <Card bordered={false}>
            <List
                rowKey="occurredAt"
                itemLayout="vertical"
                loading={loading}
                dataSource={dataSource}
                pagination={false}
                renderItem={(item) => (
                    <List.Item
                        actions={renderItemActions(item)}
                        extra={[
                            <Tooltip title="Occurred At">
                                <CalendarOutlined /> {dayjs.utc(item.occurredAt).format("DD MMM YYYY  HH:mm")}
                            </Tooltip>
                        ]}>
                        <List.Item.Meta title={getActionTypeName(item.actionType)} />
                    </List.Item>
                )}
            />
        </Card>
    );
}
