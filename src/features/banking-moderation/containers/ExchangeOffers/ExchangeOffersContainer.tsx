import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { DeleteOutlined } from "@ant-design/icons";
import { Badge, Button, message, Popconfirm } from "antd";

import { ExchangeOffer } from "features/banking-moderation/services";
import { EXCHANGE_OFFERS_URL } from "urls";
import { exchangeOffersPageSelector } from "features/banking-moderation/store/reducer";
import { EditableTable, EditableTableColumn } from "shared";
import { CreateExchangeOfferFormContainer } from "./CreateExchangeOfferFormContainer";
import { exchangeOfferExecuteComandAction } from "features/banking-moderation/store/actions";

export function ExchangeOffersContainer() {
    const dispatch = useDispatch();
    const location = useLocation();
    const urlMatch = EXCHANGE_OFFERS_URL.match(location);

    if (!urlMatch.isMatched) return null;

    const info = useSelector(exchangeOffersPageSelector(urlMatch.params.stage, urlMatch.query || {}));

    const handleOnFinish = (newValue: Partial<ExchangeOffer> & { id: number }) => {
        const sourceValue = info.data?.find((el) => el.id === newValue.id);

        sourceValue
            ? dispatch(
                  exchangeOfferExecuteComandAction({
                      stage: urlMatch.params.stage,
                      command: { type: "post", data: { ...sourceValue, ...newValue } }
                  })
              )
            : message.error("Something went wrong. Source value is missed");
    };

    const handleOnClickDeleteBtn = useCallback(
        (id: number) => () =>
            dispatch(
                exchangeOfferExecuteComandAction({
                    stage: urlMatch.params.stage,
                    command: { type: "delete", id }
                })
            ),
        [location]
    );

    const columns: EditableTableColumn<ExchangeOffer>[] = [
        { title: "ID", dataIndex: "id", width: 130 },
        { title: "Title", dataIndex: "title", editableCellProps: { type: "string" }, width: 220 },
        {
            title: "Hard Currency Required",
            dataIndex: "hardCurrencyRequired",
            editableCellProps: { type: "number" },
            width: 160
        },
        {
            title: "Soft Currency Given",
            dataIndex: "softCurrencyGiven",
            editableCellProps: { type: "number" },
            width: 160
        },
        { title: "Sort Order", dataIndex: "sortOrder", editableCellProps: { type: "number" }, width: 160 },

        {
            title: "Status",
            dataIndex: "isEnabled",
            width: 180,
            align: "center",
            editableCellProps: { type: "checkbox" },
            render: (_, offer) =>
                offer.isEnabled ? <Badge color="blue" text="Enabled" /> : <Badge color="red" text="Disabled" />
        },
        {
            title: "",
            width: 65,
            align: "right",
            render: (_, record) => (
                <Popconfirm
                    title="Delete the exchange offer"
                    description="Are you sure to delete this exchange offer?"
                    onConfirm={handleOnClickDeleteBtn(record.id)}
                    okText="Confirm"
                    okType="danger"
                    cancelText="Cancel">
                    <Button danger ghost icon={<DeleteOutlined />}></Button>
                </Popconfirm>
            )
        }
    ];

    return (
        <EditableTable
            loading={!info.data && info.loading}
            columns={columns}
            pagination={false}
            dataSource={info.data}
            onFinish={handleOnFinish}
            scroll={{ x: 600 }}
            actionColumnProps={actionColumnProps}
        />
    );
}

const actionColumnProps = { title: <CreateExchangeOfferFormContainer /> };
