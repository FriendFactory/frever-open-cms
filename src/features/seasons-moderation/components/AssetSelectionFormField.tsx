import React from "react";
import { Button, Form, FormInstance } from "antd";

import { AssetCardContainer, SelectAssetDropdown } from "shared";
import { AssetData } from "features/search-assets/services";

export const seasonRewardAssetTypes: { key: keyof AssetData; label: string }[] = [
    { key: "Wardrobe", label: "Wardrobe" },
    { key: "SetLocation", label: "Set Location" },
    { key: "CameraFilter", label: "Camera Filter" },
    { key: "VFX", label: "VFX" },
    { key: "VoiceFilter", label: "Voice Filter" },
    { key: "BodyAnimation", label: "Body Animation" }
];

export function AssetSelectionFormField({
    stage,
    setFieldValue,
    validateFields,
    getFieldValue
}: { stage: string } & FormInstance) {
    const handleOnSelect = (assetId: number, assetType: string) => {
        setFieldValue("assetId", assetId);
        setFieldValue("assetType", assetType);
        validateFields(["assetId", "assetType"]);
    };

    const id = getFieldValue("assetId");
    const asset = getFieldValue("assetType");

    return (
        <>
            <Form.Item name="assetId" noStyle>
                <div></div>
            </Form.Item>
            <Form.Item name="assetType" noStyle>
                <div></div>
            </Form.Item>
            <SelectAssetDropdown stage={stage} menuItems={seasonRewardAssetTypes} onSelect={handleOnSelect}>
                <Button type="primary" ghost>
                    Select
                </Button>
            </SelectAssetDropdown>
            <br />
            {asset && id && <AssetCardContainer stage={stage} assetType={asset} assetId={id} width={200} />}
        </>
    );
}
