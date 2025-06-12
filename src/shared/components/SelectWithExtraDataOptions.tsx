import React from "react";
import { Select, SelectProps } from "antd";
import { DefaultOptionType } from "antd/lib/select";

import { ExtraDataName } from "shared/services";
import { useExtraData, UseGetExtraDataProps } from "shared/hooks/useExtraData";

export const handleFilterOption = (input: string, option: DefaultOptionType | undefined) =>
    ((option?.label as string) ?? "").toLowerCase().startsWith(input.toLowerCase());

export type SelectWithExtraDataOptionsProps<T extends ExtraDataName = ExtraDataName> = UseGetExtraDataProps<T> &
    SelectProps;

export function SelectWithExtraDataOptions<T extends ExtraDataName>({
    stage,
    name,
    forceUpdate,
    ...restProps
}: SelectWithExtraDataOptionsProps<T>) {
    const info = useExtraData({ stage, name, forceUpdate });
    return (
        <Select
            showSearch
            optionFilterProp="children"
            filterOption={handleFilterOption}
            loading={info.loading}
            options={info.data?.map((entity) => ({
                label: entity.name,
                value: entity.id
            }))}
            {...restProps}
        />
    );
}
