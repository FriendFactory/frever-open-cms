import React from "react";
import { Table } from "antd";
import { useSelector } from "react-redux";
import { ColumnsType, TableProps } from "antd/es/table";
import { useHistory } from "react-router";

import { useWatermarkSearch } from "features/watermark-moderation";
import { INTELLECTUAL_PROPERTY_DETAILS_URL, INTELLECTUAL_PROPERTY_LIST_URL, WATERMARK_DETAILS_URL } from "urls";
import { createSortableColumnProps, ProtectedLink } from "shared";
import { ReadinessTag } from "shared/components/ReadinessTag";
import { IntellectualProperty, IntellectualPropertyQueryParams } from "../services";
import { intellectualPropertyListPageSelector } from "../store/reducer";

interface IntellectualPropertyListContainerProps {
    stage: string;
    params: IntellectualPropertyQueryParams;
}

export function IntellectualPropertyListContainer({ stage, params }: IntellectualPropertyListContainerProps) {
    const history = useHistory();
    const watermarkInfo = useWatermarkSearch({ stage });
    const info = useSelector(intellectualPropertyListPageSelector(stage, params));

    const sortableColumnProps = createSortableColumnProps(params?.orderBy, params?.sortDirection);

    const onRow = (universe: IntellectualProperty) => ({
        onClick: () => history.push(INTELLECTUAL_PROPERTY_DETAILS_URL.format({ stage, id: universe.id }))
    });

    const handleOnChange: TableProps<IntellectualProperty>["onChange"] = (_paging, _filter, sorter: any) => {
        const params: IntellectualPropertyQueryParams = {
            orderBy: sorter.order ? (sorter.columnKey as IntellectualPropertyQueryParams["orderBy"]) : undefined,
            sortDirection: sorter.order && sorter.columnKey ? (sorter.order === "descend" ? "desc" : "asc") : undefined
        };

        const newUrl = INTELLECTUAL_PROPERTY_LIST_URL.replace(location, {}, { ...params });
        newUrl && history.push(newUrl);
    };

    const columns: ColumnsType<IntellectualProperty> = [
        {
            title: "ID",
            dataIndex: "id",
            width: 80,
            ...sortableColumnProps("id")
        },
        {
            title: "Name",
            dataIndex: "name",
            width: 100,
            ...sortableColumnProps("name")
        },
        {
            title: "Watermark",
            dataIndex: "watermarkId",
            width: 100,
            render: (_, entity) =>
                entity.watermarkId ? (
                    <ProtectedLink
                        onClick={(e) => e.stopPropagation()}
                        feature="CategoriesFull"
                        to={WATERMARK_DETAILS_URL.format({ stage, id: entity.watermarkId })}>
                        {watermarkInfo.info?.data?.find((watermark) => watermark.id === entity.watermarkId)?.name}
                    </ProtectedLink>
                ) : (
                    ""
                )
        },
        {
            title: "Readiness",
            width: 120,
            render: (_, entity) => <ReadinessTag stage={stage} readinessId={entity.readinessId} />
        }
    ];

    return (
        <Table
            onRow={onRow}
            onChange={handleOnChange}
            rowKey="id"
            scroll={{ x: 700 }}
            loading={info.loading}
            dataSource={info.data}
            columns={columns}
            pagination={false}
        />
    );
}
