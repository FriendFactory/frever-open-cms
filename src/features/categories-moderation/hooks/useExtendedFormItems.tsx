import { DefaultOptionType } from "antd/es/select";

import { CommonExtraDataType, useExtraDataBundle } from "shared";
import { CategoryFormItemType } from "../form-items";

export function useExtendedFormItems(baseItems: CategoryFormItemType[]) {
    const extraDataNames = baseItems.map((el) => el.extraDataName!).filter(Boolean);
    const { loading, bundle } = useExtraDataBundle(extraDataNames);

    const items = baseItems.map((el) => {
        if (el.extraDataName) {
            const options = createOptions(bundle[el.extraDataName]?.data);
            return { ...el, inputProps: { ...el.inputProps, options } };
        }

        return el;
    });

    return { items, loading };
}

const createOptions = (data?: CommonExtraDataType[]): DefaultOptionType[] | undefined =>
    data?.map((el) => ({ label: el.name, value: el.id }));
