import React from "react";
import { FormInstance } from "antd";

import { GeoCluster } from "../../services/api";
import { GeoClusterForm } from "../../components/GeoClusterForm";
import { LoadingContainer, useExtraDataBundle } from "shared";

const all = {
    value: "*",
    label: "All"
};

export interface GeoClusterFormContainerProsp {
    form: FormInstance<Partial<GeoCluster>>;
    initialValues?: Partial<GeoCluster>;
    loading?: boolean;
    onChange?: () => void;
}

export function GeoClusterFormContainer({ initialValues, form, loading, onChange }: GeoClusterFormContainerProsp) {
    const extraData = useExtraDataBundle(["Country", "Language"]);

    const countriesOptions = [
        all,
        ...(extraData.bundle.Country?.data?.map((el) => ({
            value: el.isoName,
            label: el.displayName
        })) ?? [])
    ];

    const languagesOptions = [
        all,
        ...(extraData.bundle.Language?.data?.map((el) => ({
            value: el.isoCode,
            label: el.name
        })) ?? [])
    ];

    return (
        <div>
            <LoadingContainer loading={loading || extraData.loading} />
            <GeoClusterForm
                form={form}
                disabled={loading || extraData.loading}
                initialValues={initialValues}
                onValuesChange={onChange}
                languagesOptions={languagesOptions}
                countriesOptions={countriesOptions}
            />
        </div>
    );
}
