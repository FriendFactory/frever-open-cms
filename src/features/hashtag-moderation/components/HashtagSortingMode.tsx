import React, { useCallback } from "react";
import { Input, Table } from "antd";

import { Hashtag } from "../services";

export interface HashtagSortingModeProps {
    data: Hashtag[];
    loading: boolean;
    addHashtagToUpdateList: (hashtag: Hashtag, newChallengeSortOrder: string) => void;
}

export function HashtagSortingMode({ data, loading, addHashtagToUpdateList }: HashtagSortingModeProps) {
    const getRowKey = useCallback((hashtag: Hashtag) => hashtag.id, [data]);

    const columns = [
        {
            title: "ID",
            width: 115,
            dataIndex: "id"
        },
        {
            title: "Name",
            dataIndex: "name",
            width: 225
        },
        { title: "Views Count", dataIndex: "viewsCount", width: 115 },
        { title: "VideoCount", dataIndex: "videoCount", width: 115 },
        {
            title: "Challenge Sort Order",
            dataIndex: "challengeSortOrder",
            width: 115,
            render: (_: unknown, hashtag: Hashtag) => {
                return (
                    <Input
                        defaultValue={hashtag.challengeSortOrder}
                        required
                        type="number"
                        onBlur={(event) => addHashtagToUpdateList(hashtag, event.target.value)}
                        onPressEnter={(event) => addHashtagToUpdateList(hashtag, event.currentTarget.value)}
                    />
                );
            }
        }
    ];

    return (
        <Table
            rowKey={getRowKey}
            dataSource={data}
            loading={loading}
            columns={columns}
            pagination={false}
            scroll={{ x: 600 }}
        />
    );
}
