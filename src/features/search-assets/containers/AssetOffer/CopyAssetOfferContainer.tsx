import React from "react";
import { Form, FormInstance, Select } from "antd";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { assetOfferListLoadAction } from "features/search-assets/store";
import { assetOfferListSelector } from "features/search-assets/store/reducer/assetOffer/assetOfferList.reducer";
import { AssetOfferInfo } from "features/search-assets/components/AssetOffer/AssetOfferInfo";

const { Option } = Select;

interface CopyAssetOfferContainerProps {
    stage: string;
    form: FormInstance<any>;
}

export function CopyAssetOfferContainer({ form, stage }: CopyAssetOfferContainerProps) {
    const dispatch = useDispatch();

    const assetOfferList = useSelector(assetOfferListSelector(stage));

    const loadAssetOfferList = () => {
        if (!assetOfferList.data && !assetOfferList.loading) {
            dispatch(assetOfferListLoadAction({ stage }));
        }
    };

    const handleOnClick = (index: number) => {
        const assetOffer = assetOfferList.data?.[index];

        if (assetOffer) {
            form.setFieldsValue({
                title: assetOffer.assetOffer.title,
                description: assetOffer.assetOffer.description,
                softCurrencyPrice: assetOffer.assetOffer.softCurrencyPrice,
                hardCurrencyPrice: assetOffer.assetOffer.hardCurrencyPrice
            });
        }
    };
    return (
        <Form.Item label="Copy Existing Asset Offer" labelCol={{ span: 24 }}>
            <Select allowClear onChange={handleOnClick} onFocus={loadAssetOfferList} loading={assetOfferList?.loading}>
                {assetOfferList.data?.map((el, i) => (
                    <Option key={i} value={i}>
                        <AssetOfferInfo value={el} />
                    </Option>
                ))}
            </Select>
        </Form.Item>
    );
}
