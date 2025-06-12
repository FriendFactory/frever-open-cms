import React from "react";
import { Select, SelectProps } from "antd";

import { selectFilterProps } from "shared/select-options-helpers";
import { useCurrentStage, useExtraDataBundle } from "shared/hooks";

interface SelectMarketingCountriesProps extends SelectProps {}

export const SelectMarketingCountries = (props: SelectMarketingCountriesProps) => {
    const stage = useCurrentStage();
    const extra = useExtraDataBundle(["Country"], stage);
    const countriesAvailableForMarketing = extra.bundle.Country?.data?.filter(
        (country) => country.availableForMarketing
    );

    return (
        <Select
            loading={extra.loading}
            allowClear
            mode="multiple"
            options={countriesAvailableForMarketing?.map((val) => ({
                value: val.isoName,
                label: val.displayName
            }))}
            {...selectFilterProps}
            {...props}
        />
    );
};
