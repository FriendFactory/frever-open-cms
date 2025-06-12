import { SelectProps } from "antd";
import { DefaultOptionType } from "antd/es/select";

import { ExtraDataName, ExtraDataType } from "./services";
import { ExtraDataBundleResult } from "./store";

export const createOptionsExtraBundle = <T extends ExtraDataName = ExtraDataName>(
    extraName: T,
    extraData: ExtraDataBundleResult["bundle"],
    extraOptions?: (data: ExtraDataType<T>) => DefaultOptionType,
    extraFilter?: (data: ExtraDataType<T>) => boolean
): SelectProps["options"] => {
    const data = extraData?.[extraName]?.data;

    const filteredData = extraFilter ? data?.filter(extraFilter) : data;

    return filteredData?.map((el) => (extraOptions ? extraOptions(el) : { label: el.name, value: el.id }));
};

export const selectFilterProps: Pick<SelectProps, "filterOption" | "filterSort"> = {
    filterOption: (input, option) => (option?.label as string)?.toLowerCase().includes(input.toLowerCase()),
    filterSort: (optionA, optionB) => (optionA.label as string).localeCompare(optionB.label as string)
};

const prefixOrder = { SC: 1, HC: 2 };
const sortOrder = { Base: 1, Mid: 2, Rare: 3, Legendary: 4, Premium: 5 };

const getPrefix = (label: string): keyof typeof prefixOrder => {
    return label.split(" ")[0] as keyof typeof prefixOrder;
};

const getNameSuffix = (label: string): keyof typeof sortOrder => {
    return label.split(" ").slice(1).join(" ") as keyof typeof sortOrder;
};

export const selectAssetTierFilterProps: Pick<SelectProps, "filterOption" | "filterSort" | "showSearch"> = {
    showSearch: true,
    filterOption: (input, option) => (option?.label as string)?.toLowerCase().includes(input.toLowerCase()),
    filterSort: (optionA, optionB) => {
        const labelA = optionA.label as string;
        const labelB = optionB.label as string;

        const prefixA = getPrefix(labelA);
        const prefixB = getPrefix(labelB);
        const nameA = getNameSuffix(labelA);
        const nameB = getNameSuffix(labelB);

        if (prefixOrder[prefixA] !== prefixOrder[prefixB]) return prefixOrder[prefixA] - prefixOrder[prefixB];

        return (sortOrder[nameA] || 0) - (sortOrder[nameB] || 0);
    }
};
