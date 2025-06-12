import React from "react";
import { Select } from "antd";
import { SelectProps } from "antd/lib/select";

import { useExtraData } from "shared/hooks/useExtraData";

interface TagsSelectProps extends SelectProps {
    stage: string;
    value?: number[];
}

export function TagsSelect({ stage, value, ...restProps }: TagsSelectProps) {
    const tags = useExtraData({ stage, name: "Tag" });
    return (
        <Select
            style={{ width: "100%" }}
            loading={tags.loading}
            mode="tags"
            size="large"
            value={value?.map((el) => el.toString())}
            filterOption={(inputValue, option) => option?.value?.toString().startsWith(inputValue) ?? false}
            optionFilterProp="value"
            options={tags.data?.map((el) => ({ key: el.id, value: el.id.toString(), label: el.name }))}
            {...restProps}
        />
    );
}
