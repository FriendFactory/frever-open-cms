import React from "react";

import { Categories, CategoryTypes } from "config";
import { CATEGORY_LIST_URL } from "urls";
import { ContentWithHeaderFragment, SideMenuLayout } from "layout";
import { StageSwitchTabsContainer, PageHeader } from "shared";
import { DynamicCategoryContainer } from "features/categories-moderation";

export interface CategoryListPageProps {
    match: { params: { category: CategoryTypes; stage: string } };
}

function CategoryListPage({ match: { params } }: CategoryListPageProps) {
    return (
        <SideMenuLayout>
            <ContentWithHeaderFragment>
                <PageHeader title={Categories[params.category]?.title ?? ""} />
                <StageSwitchTabsContainer url={CATEGORY_LIST_URL}>
                    <DynamicCategoryContainer stage={params.stage} category={params.category} />
                </StageSwitchTabsContainer>
            </ContentWithHeaderFragment>
        </SideMenuLayout>
    );
}

export default CategoryListPage;
