import React from "react";
import { Radio, RadioChangeEvent } from "antd";

import { AssetTypes } from "config";
import { AssetListParams } from "features/search-assets/services";
import { useExtraDataBundle } from "shared";

interface SelectAssetIpProps {
    asset: AssetTypes;
    search: (newParams: AssetListParams) => void;
}

export function AssetIpFilter({ asset, search }: SelectAssetIpProps) {
    const extra = useExtraDataBundle(["Gender", "Race/moderation"]);

    const handleOnChange = (event: RadioChangeEvent) => {
        const genderIds = extra.bundle.Gender?.data
            ?.filter((val) => val.raceId === event.target.value)
            .map((gender) => gender.id.toString());

        search({ genderId: genderIds });
    };

    return (
        <>
            {asset === "Wardrobe" && extra.bundle["Race/moderation"]?.data && (
                <Radio.Group onChange={handleOnChange}>
                    <Radio.Button value={undefined}>All</Radio.Button>
                    {extra.bundle["Race/moderation"]?.data?.map((val) => (
                        <Radio.Button key={val.id} value={val.id}>
                            {val.name}
                        </Radio.Button>
                    ))}
                </Radio.Group>
            )}
        </>
    );
}
