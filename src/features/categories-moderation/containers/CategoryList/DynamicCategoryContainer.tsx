import React from "react";
import { Result } from "antd";

import { Categories, CategoryTypes } from "config";
import { EditableCategoriesTableContainer } from "./EditableCategoriesTableContainer";
import { UMAAdjustmentContainer } from "./UMAAdjustmentContainer";
import { UmaColorListContainer } from "./UmaColorListContainer";
import { CountriesContainer } from "./CountriesContainer";

export interface DynamicCategoryContainerProps {
    stage: string;
    category: CategoryTypes;
}

export const DynamicCategoryContainer = ({ stage, category }: DynamicCategoryContainerProps) => {
    if (!Object.keys(Categories).some((el) => el === category)) return <Result status="error" title="Page not found" />;

    const Component = CustomCategoryComponents[category];

    if (typeof Component !== "undefined") return <Component />;

    return <EditableCategoriesTableContainer stage={stage} category={category} />;
};

const CustomCategoryComponents: { [x: string]: () => JSX.Element } = {
    UmaSharedColor: UmaColorListContainer,
    UMAAdjustment: UMAAdjustmentContainer,
    Country: CountriesContainer
};
