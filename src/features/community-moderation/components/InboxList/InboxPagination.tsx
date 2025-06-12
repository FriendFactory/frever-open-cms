import React from "react";

import { Pagination, PaginationProps, Tooltip } from "antd";

export interface InboxPaginationProps {
    total: number;
    currentPage: number;
    pageSize: number;
    pageChange: (page: number, take: number) => void;
}

export const InboxPagination = ({ total, currentPage, pageSize, pageChange }: InboxPaginationProps) => {
    const itemRender: PaginationProps["itemRender"] = (_, type, renderElement) => {
        if (type === "prev") {
            return <Tooltip title="Newer">{renderElement}</Tooltip>;
        }
        if (type === "next") {
            return <Tooltip title="Older">{renderElement}</Tooltip>;
        }
        return null;
    };

    return (
        <Pagination
            itemRender={itemRender}
            showTitle={false}
            current={currentPage}
            pageSize={pageSize}
            total={total}
            showSizeChanger={false}
            onChange={pageChange}
        />
    );
};
