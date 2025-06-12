import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import { Form } from "antd";

import { FilterForm, FilterFormFields, ExtraFilter } from "../../components/AssetsGrid";
import { dateToForm, dateToUrl } from "utils";
import { AssetTypes } from "config";
import { AssetListParams } from "features/search-assets/services";
import { extraFilters } from "features/search-assets/constants/assetExtraFilters";
import { ExtraDataType, ExtraDataTypes, useExtraDataBundle, WardrobeSubCategory } from "shared";
import { UrlPath } from "rd-url-utils";

interface FilterFormContainer {
    stage: string;
    asset: AssetTypes;
    params: AssetListParams;
    url: UrlPath<{ stage: string; asset: AssetTypes }, AssetListParams>;
}

export function FilterFormContainer({ asset, params, url }: FilterFormContainer) {
    const [form] = Form.useForm();
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        form.resetFields();
    }, [asset]);

    const names = extraFilters[asset].map((el) => el.extraDataName);
    const extraData = useExtraDataBundle(names);

    const labelSubCategory = (label: string, category: ExtraDataType) =>
        `${label} (${
            extraData.bundle?.WardrobeCategory?.data?.find((val) =>
                "wardrobeCategoryId" in category ? val.id === category.wardrobeCategoryId : null
            )?.name
        })`;

    const extraSelectOptions = (extraDataName: keyof ExtraDataTypes) => {
        if (extraDataName === "WardrobeSubCategory") {
            const selectedCategories: string[] = valueToArray(form?.getFieldValue("wardrobeCategoryId"));

            if (selectedCategories?.length) {
                return selectedCategories.reduce<WardrobeSubCategory[]>((acc, categoryId) => {
                    if (categoryId !== "<Null>") {
                        const filteredSubCategories =
                            extraData.bundle[extraDataName]?.data?.filter(
                                (val) => val.wardrobeCategoryId === +categoryId
                            ) ?? [];

                        acc = [...acc, ...filteredSubCategories];
                    }
                    return acc;
                }, []);
            }
        }
        return extraData.bundle[extraDataName]?.data;
    };

    const extraSelectFilters = extraFilters[asset].map<ExtraFilter>(({ width, name, extraDataName, label }) => {
        return {
            label,
            width,
            name,
            options: extraSelectOptions(extraDataName)
                ?.map((category) => ({
                    label: category.name,
                    value: category.id.toString(),
                    wardrobeSubCategory: labelSubCategory(category.name, category)
                }))
                .concat({ label: "<Null>", value: "null", wardrobeSubCategory: "<Null>" })
        };
    });

    const handleOnFinish = (form: FilterFormFields) => {
        const newUrl = url.replace(location, {}, toAssetUrlValues(form));
        newUrl && history.push(newUrl);
    };

    const handleOnChangeExtraFilter = (fieldName: string) => (value: string | string[]) =>
        handleOnFinish({ [fieldName]: value });

    return (
        <FilterForm
            form={form}
            assetType={asset}
            disabled={extraData.loading}
            extraFilters={extraSelectFilters}
            initialValues={toAssetFilterFormValues(params)}
            onFinish={handleOnFinish}
            onChangeExtraFilter={handleOnChangeExtraFilter}
        />
    );
}

export const toAssetFilterFormValues = (params: AssetListParams): FilterFormFields => ({
    ...params,
    search: params?.search,
    searchFilter: params?.searchFilter ?? "contains",
    caseSensitive: params?.caseSensitive === "true",
    hasGenderPair: params?.hasGenderPair ? params?.hasGenderPair : undefined,
    modifiedTime: params?.modifiedTime ? dateToForm(params?.modifiedTime) : undefined,
    createdTime: params?.createdTime ? dateToForm(params?.createdTime) : undefined
});

export const toAssetUrlValues = (form: FilterFormFields): AssetListParams => ({
    ...form,
    search: form.search ? form.search : undefined,
    searchFilter: form.search ? form.searchFilter ?? "contains" : undefined,
    caseSensitive: form.search ? (form.caseSensitive ? "true" : "false") : undefined,
    createdTime: form.createdTime ? dateToUrl(form.createdTime) : undefined,
    modifiedTime: form.modifiedTime ? dateToUrl(form.modifiedTime) : undefined,
    skip: undefined
});

const valueToArray = (value?: string | string[]) => {
    if (typeof value === "undefined") return [];
    return Array.isArray(value) ? value : [value];
};
