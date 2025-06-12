import React, { useState } from "react";
import { Button, Divider, Modal } from "antd";
import { useDispatch } from "react-redux";
import { useForm } from "antd/lib/form/Form";

import { executeAssetOfferCommand } from "features/search-assets/store";
import { AssetOfferType, CreateAssetOffer, WardrobeAsset } from "features/search-assets/services";
import { AssetOfferForm } from "features/search-assets/components/AssetOffer/AssetOfferForm";
import { CopyAssetOfferContainer } from "./CopyAssetOfferContainer";
import { SelectBasePriceContainer } from "./SelectBasePriceContainer";

export const CREATE_ASSET_OFFER_FORM_ID = "CREATE_ASSET_OFFER_FORM_ID";

export interface CreateAssetOfferContainerProps {
    stage: string;
    assetHasActiveOffer: boolean;
    assetIds: number[];
    assetType: AssetOfferType;
    wardrobe?: WardrobeAsset;
}

export function CreateAssetOfferContainer({
    assetHasActiveOffer,
    stage,
    assetType,
    assetIds,
    wardrobe
}: CreateAssetOfferContainerProps) {
    const dispatch = useDispatch();

    const [form] = useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOnFinish = (form: Omit<CreateAssetOffer, "assetId" | "assetType">) => {
        dispatch(
            executeAssetOfferCommand({ stage, command: { type: "create-new", assetIds, data: { ...form, assetType } } })
        );
        setIsModalOpen(false);
    };

    const handleOnSetBasePrice = ({ value, currencyType }: { value: number; currencyType: "hard" | "soft" }) => {
        form.setFieldValue("softCurrencyPrice", currencyType === "soft" ? value : null);
        form.setFieldValue("hardCurrencyPrice", currencyType === "hard" ? value : null);
    };

    const text = assetHasActiveOffer ? "Replace By New" : "Create Offer";
    return (
        <>
            <div onClick={() => setIsModalOpen(true)}>{text}</div>
            <Modal
                destroyOnClose
                title={text}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={[
                    <Button key="asset-offer-cancel" onClick={() => setIsModalOpen(false)}>
                        Cancel
                    </Button>,
                    <Button key="asset-offer-create" htmlType="submit" form={CREATE_ASSET_OFFER_FORM_ID}>
                        Create
                    </Button>
                ]}>
                <CopyAssetOfferContainer stage={stage} form={form} />

                <Divider dashed> or </Divider>

                {wardrobe && (
                    <>
                        <SelectBasePriceContainer value={wardrobe} onSetBasePrice={handleOnSetBasePrice} />
                        <Divider dashed />
                    </>
                )}

                <AssetOfferForm id={CREATE_ASSET_OFFER_FORM_ID} form={form} onFinish={handleOnFinish} />
            </Modal>
        </>
    );
}
