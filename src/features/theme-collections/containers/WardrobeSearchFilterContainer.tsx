import React from "react";
import { useForm } from "antd/es/form/Form";

import { useExtraDataBundle } from "shared";
import { AssetListParams } from "features/search-assets/services";
import { WardrobeSearchFilter } from "../components/WardrobeSearchFilter";

export interface WardrobeSearchContainerProps {
    onSearch: (newParams: AssetListParams) => void;
}

export function WardrobeSearchFilterContainer({ onSearch }: WardrobeSearchContainerProps) {
    const [form] = useForm();
    const extraData = useExtraDataBundle(["WardrobeCollection"]);

    const handleOnFinish = async () => {
        const data = await form.validateFields();
        onSearch(data);
    };

    return (
        <WardrobeSearchFilter
            form={form}
            onFinish={handleOnFinish}
            disabled={extraData.loading}
            wardrobeCollections={extraData.bundle.WardrobeCollection?.data}
        />
    );
}
