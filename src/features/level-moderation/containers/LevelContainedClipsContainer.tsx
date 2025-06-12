import React, { useCallback } from "react";
import { UrlPath } from "rd-url-utils";
import { useHistory, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { Avatar, Card, Table } from "antd";
import { ColumnType } from "antd/lib/table";
import dayjs from "dayjs";

import { EVENT_DETAILS_PAGE_URL } from "urls";
import { createCdnURLFromFiles } from "shared";
import { levelDetailsPageSelector } from "../store/reducer/levelDetails.reducer";
import { LevelEvent } from "../services";

export interface LevelContainedClipsContainerProps {
    url: UrlPath<{ stage: string; id: number }, {}>;
}

export function LevelContainedClipsContainer({ url }: LevelContainedClipsContainerProps) {
    const location = useLocation();
    const history = useHistory();
    const urlMatch = url.match(location);

    if (!urlMatch.isMatched) {
        return <div></div>;
    }
    const { stage, id } = urlMatch.params;

    const info = useSelector(levelDetailsPageSelector(stage, id));

    const handleOnRow = (record: LevelEvent) => ({
        onClick: () => history.push(EVENT_DETAILS_PAGE_URL.format({ stage, id: record.id }))
    });

    const columns: ColumnType<LevelEvent>[] = [
        { key: "event-id", title: "ID", dataIndex: "id", width: 100, fixed: "left" },
        {
            key: "event-thumbnail",
            title: "Thumbnail",
            width: 105,
            render: (_, { id, files }) => (
                <Avatar
                    shape="square"
                    size={80}
                    src={
                        files
                            ? createCdnURLFromFiles({
                                  id,
                                  files,
                                  stage,
                                  entityType: "event",
                                  resolution: "128x128"
                              })
                            : ""
                    }
                />
            )
        },
        {
            key: "event-created-time",
            title: "Created Time",
            width: 165,
            render: (_, event) =>
                event.createdTime ? dayjs.utc(event.createdTime).format("DD MMM YYYY HH:mm:ss") : "Unknown"
        },
        {
            title: "Modified Time",
            width: 165,
            render: (_, event) =>
                event.modifiedTime ? dayjs.utc(event.modifiedTime).format("DD MMM YYYY HH:mm:ss") : "Unknown"
        }
    ];

    const getRowKey = useCallback((event) => event.id, []);

    return (
        <Card title={`Events (${info.data?.event.length ?? ""})`} loading={info.loading}>
            <Table
                rowKey={getRowKey}
                loading={!info.data && info.loading}
                onRow={handleOnRow}
                dataSource={info.data?.event}
                columns={columns}
                scroll={{ x: 500 }}
                pagination={false}
            />
        </Card>
    );
}
