import React, { useCallback } from "react";
import { Avatar, Button, Table, TableColumnsType } from "antd";
import { useHistory, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { SorterResult } from "antd/es/table/interface";
import { DeleteOutlined, UndoOutlined } from "@ant-design/icons";

import { IN_APP_PRODUCT_INFO_URL, IN_APP_PRODUCT_LIST_URL } from "urls";
import { inAppProductListPageSelector } from "features/banking-moderation/store/reducer/inAppProducts/inAppProductList.reducer";
import { InAppProduct, InAppProductsQueryParams } from "features/banking-moderation/services";
import { CreateProductModalContainer } from "../CreateProductModalContainer";
import { createCdnURLFromFiles } from "shared";
import { createSortableColumnProps } from "shared";
import { inAppProductPostAction } from "features/banking-moderation/store/actions";

export interface ProductListContainerProps {}

export const InAppProductListContainer = ({}: ProductListContainerProps) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const urlMatch = IN_APP_PRODUCT_LIST_URL.match(location);

    if (!urlMatch.isMatched) return <div></div>;

    const info = useSelector(inAppProductListPageSelector(urlMatch.params.stage, urlMatch.query || {}));

    const handleOnRow = useCallback(
        (record: InAppProduct) => ({
            onClick: () => history.push(IN_APP_PRODUCT_INFO_URL.format({ stage: urlMatch.params.stage, id: record.id }))
        }),
        [urlMatch.params.stage]
    );

    const sortableColumn = createSortableColumnProps(urlMatch.query?.orderBy, urlMatch.query?.sortDirection);

    const handleOnClickChangeStatus = useCallback(
        (product: InAppProduct, isActive: boolean) => () =>
            dispatch(
                inAppProductPostAction({
                    stage: urlMatch.params.stage,
                    data: { ...product, isActive }
                })
            ),
        [urlMatch.params.stage]
    );

    const columns: TableColumnsType<InAppProduct> = [
        {
            dataIndex: "id",
            title: "ID",
            width: 100,
            ...sortableColumn("id")
        },
        {
            title: "Thumbnail",
            width: 100,
            render: (_, item) => (
                <Avatar
                    shape="square"
                    src={
                        createCdnURLFromFiles({
                            id: item.id,
                            entityType: "InAppProduct",
                            stage: urlMatch.params.stage,
                            resolution: "256x256",
                            files: item.files ?? []
                        }) || "/assets/no-image.png"
                    }
                    size={80}
                />
            )
        },
        {
            dataIndex: "title",
            title: "Title",
            width: 160,
            ...sortableColumn("title")
        },
        {
            dataIndex: "sortOrder",
            title: "Sort Order",
            width: 100,
            ...sortableColumn("sortOrder")
        },
        {
            title: "Publication",
            width: 160,
            render: (_, item) => (item.publicationDate ? dayjs.utc(item.publicationDate).format("DD MMM YYYY") : "Unknown"),
            ...sortableColumn("publicationDate")
        },
        {
            title: "Depublication",
            width: 160,
            render: (_, item) =>
                item.depublicationDate ? dayjs.utc(item.depublicationDate).format("DD MMM YYYY") : "Unknown",
            ...sortableColumn("depublicationDate")
        },
        {
            dataIndex: "isSeasonPass",
            title: "Season Pass",
            width: 80,
            render: (_, item) => (item.isSeasonPass ? "Yes" : "No")
        },
        {
            dataIndex: "isActive",
            title: "Active",
            width: 80,
            render: (_, item) => (item.isActive ? "Yes" : "No")
        },
        {
            title: <CreateProductModalContainer stage={urlMatch.params.stage} />,
            width: 65,
            align: "right" as const,
            render: (_, record) => (
                <div onClick={preventRedirect}>
                    {record.isActive ? (
                        <Button
                            ghost
                            danger
                            icon={<DeleteOutlined />}
                            onClick={handleOnClickChangeStatus(record, false)}
                        />
                    ) : (
                        <Button type="primary" ghost icon={<UndoOutlined />} onClick={handleOnClickChangeStatus(record, true)} />
                    )}
                </div>
            )
        }
    ];

    const handleOnChange = (
        _paging: unknown,
        _filter: unknown,
        sorter: SorterResult<InAppProductsQueryParams["orderBy"]>
    ) => {
        const params: InAppProductsQueryParams = { orderBy: undefined, sortDirection: undefined };

        if (sorter.columnKey && sorter.order) {
            params.orderBy = sorter.columnKey as any;
            params.sortDirection = sorter.order === "ascend" ? "asc" : "desc";
        }

        const newUrl = IN_APP_PRODUCT_LIST_URL.replace(location, {}, { ...params });
        newUrl && history.push(newUrl);
    };

    return (
        <Table
            rowKey={getRowKey}
            onRow={handleOnRow}
            onChange={handleOnChange as any}
            dataSource={info.data}
            loading={info.loading}
            columns={columns}
            pagination={false}
            scroll={{ x: 700 }}
        />
    );
};

const getRowKey = (item: InAppProduct) => item.id;

const preventRedirect = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation();
