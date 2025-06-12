import React from "react";
import { Alert, Badge, Table, TableColumnsType } from "antd";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import dayjs from "dayjs";

import { IN_APP_PRODUCT_INFO_URL, SEASON_DETAILS_PAGE_URL, USER_PURCHASE_HISTORY_TAB_URL } from "urls";
import { InAppPurchaseOrder } from "../services";
import { purchaseHistoryPageSelector } from "../store/purchaseHistorySelector";
import { ProtectedLink } from "shared";

export function PurchaseHistoryListContainer() {
    const location = useLocation();
    const urlMatch = USER_PURCHASE_HISTORY_TAB_URL.match(location);
    if (!urlMatch.isMatched) return <Alert type="error" message="Invalid URL" />;

    const info = useSelector(
        purchaseHistoryPageSelector(urlMatch.params.stage, urlMatch.params.id, urlMatch.query || {})
    );

    const columns: TableColumnsType<InAppPurchaseOrder> = [
        {
            title: "In-App Product ID",
            render: (_, record) => (
                <ProtectedLink
                    feature="Banking"
                    to={IN_APP_PRODUCT_INFO_URL.format({
                        stage: urlMatch.params.stage,
                        id: record.inAppProductOfferPayload.inAppProductId
                    })}>
                    {record.inAppProductOfferPayload.inAppProductId}
                </ProtectedLink>
            )
        },
        { title: "Premium Pass", render: (_, record) => (record.premiumPassPurchase ? "Premium Pass" : "") },
        {
            title: "Season ID",
            render: (_, record) =>
                record.seasonId && (
                    <ProtectedLink
                        feature="Seasons"
                        to={SEASON_DETAILS_PAGE_URL.format({
                            stage: urlMatch.params.stage,
                            id: record.seasonId
                        })}>
                        {record.seasonId}
                    </ProtectedLink>
                )
        },
        { title: "Hard Currency Amount", dataIndex: "refHardCurrencyAmount" },
        { title: "Price Usd Cents", dataIndex: "refPriceUsdCents" },
        { title: "Platform", dataIndex: "platform" },
        { title: "Store Order Identifier", dataIndex: "storeOrderIdentifier" },
        { title: "Was Refund", render: (_, record) => (record.wasRefund ? "Refunded" : "") },
        {
            title: "Created",
            render: (_, record) =>
                record.createdTime ? dayjs.utc(record.createdTime).format("DD MMM YYYY HH:mm:ss") : ""
        },
        {
            title: "Completed",
            render: (_, record) =>
                record.isPending ? (
                    <Badge color="blue" text="Pending" />
                ) : record.completedTime ? (
                    <Badge color="green" text={dayjs.utc(record.completedTime).format("DD MMM YYYY HH:mm:ss")} />
                ) : (
                    <Badge color="red" text={record.errorCode} />
                )
        }
    ];

    return (
        <Table
            rowKey={handleRowKey}
            loading={info.loading && !info.data}
            dataSource={info.data}
            columns={columns}
            pagination={false}
            scroll={{ x: 1200 }}
        />
    );
}

const handleRowKey = (record: { id: string }) => record.id;
