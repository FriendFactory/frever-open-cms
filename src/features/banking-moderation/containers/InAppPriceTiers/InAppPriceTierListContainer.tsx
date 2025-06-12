import React from "react";
import { useDispatch } from "react-redux";

import { EditableTable, EditableTableColumn } from "shared";
import { InAppPriceTier } from "features/banking-moderation/services";
import { inAppPriceTiersPostInfoAction } from "features/banking-moderation/store/actions";
import { useInAppPriceTiers } from "features/banking-moderation/hooks/useInAppPriceTiers";
import { CreatePriceTierModalContainer } from "../CreatePriceTierModalContainer";

export interface InAppPriceTierListContainerProps {
    stage: string;
}

export function InAppPriceTierListContainer({ stage }: InAppPriceTierListContainerProps) {
    const dispatch = useDispatch();
    const info = useInAppPriceTiers(stage);
    const handleOnFinish = (data: InAppPriceTier) => dispatch(inAppPriceTiersPostInfoAction({ stage, data }));
    const actionColumnProps = { title: <CreatePriceTierModalContainer stage={stage} /> };
    return (
        <EditableTable
            loading={info.loading}
            dataSource={info.data}
            columns={columns}
            actionColumnProps={actionColumnProps}
            pagination={false}
            scroll={{ x: 500 }}
            onFinish={handleOnFinish}
        />
    );
}

const columns: EditableTableColumn<InAppPriceTier>[] = [
    {
        title: "ID",
        dataIndex: "id",
        width: 90
    },
    { title: "Title", dataIndex: "title", editableCellProps: { type: "string" }, width: 160 },
    {
        title: "App Store Product Ref",
        dataIndex: "appStoreProductRef",
        editableCellProps: { type: "string" },
        width: 160
    },
    {
        title: "Play Market Product Ref",
        dataIndex: "playMarketProductRef",
        editableCellProps: { type: "string" },
        width: 160
    },
    { title: "Ref Price Usd Cents", dataIndex: "refPriceUsdCents", editableCellProps: { type: "number" }, width: 160 }
];
