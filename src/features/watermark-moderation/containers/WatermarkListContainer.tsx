import React from "react";
import { Table } from "antd";
import { useSelector } from "react-redux";
import { ColumnsType, TableProps } from "antd/es/table";
import { useHistory } from "react-router";

import { WATERMARK_DETAILS_URL, WATERMARK_LIST_URL } from "urls";
import { watermarkListPageSelector } from "../store/reducer";
import { Watermark, WatermarkListQueryParams } from "../services";
import { WatermarkListThumbnailContainer } from "./WatermarkListThumbnailContainer";
import { CreateWatermarkContainer } from "./CreateWatermarkContainer";
import { createSortableColumnProps } from "shared";

interface WatermarkListContainerProps {
    stage: string;
    params: WatermarkListQueryParams;
}

export function WatermarkListContainer({ stage, params }: WatermarkListContainerProps) {
    const history = useHistory();
    const info = useSelector(watermarkListPageSelector(stage, params));
    const sortableColumnProps = createSortableColumnProps(params?.orderBy, params?.sortDirection);

    const onRow = (universe: Watermark) => ({
        onClick: () => history.push(WATERMARK_DETAILS_URL.format({ stage, id: universe.id }))
    });

    const handleOnChange: TableProps<Watermark>["onChange"] = (_paging, _filter, sorter: any) => {
        const params: WatermarkListQueryParams = {
            orderBy: sorter.order ? (sorter.columnKey as WatermarkListQueryParams["orderBy"]) : undefined,
            sortDirection: sorter.order && sorter.columnKey ? (sorter.order === "descend" ? "desc" : "asc") : undefined
        };

        const newUrl = WATERMARK_LIST_URL.replace(location, {}, { ...params });
        newUrl && history.push(newUrl);
    };

    const columns: ColumnsType<Watermark> = [
        {
            title: "ID",
            dataIndex: "id",
            width: 80,
            ...sortableColumnProps("id")
        },
        {
            title: "Name",
            dataIndex: "name",
            width: 200,
            ...sortableColumnProps("name")
        },
        {
            title: "Thumbnail",
            width: 100,
            render: (_, record) => (
                <WatermarkListThumbnailContainer stage={stage} id={record.id} version={record.files[0].version} />
            )
        },
        {
            title: "Duration Seconds",
            dataIndex: "durationSeconds",
            width: 100,
            ...sortableColumnProps("durationSeconds")
        },
        {
            title: <CreateWatermarkContainer />,
            width: 65,
            align: "right",
            fixed: "right"
        }
    ];

    return (
        <Table
            rowKey="id"
            onRow={onRow}
            onChange={handleOnChange}
            scroll={{ x: 700 }}
            loading={info.loading}
            dataSource={info.data}
            columns={columns}
            pagination={false}
        />
    );
}
