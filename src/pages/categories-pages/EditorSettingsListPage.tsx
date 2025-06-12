import React from "react";

import { ContentWithHeaderFragment, SideMenuLayout } from "layout";
import { StageSwitchTabsContainer, PageHeader } from "shared";
import { EDITOR_SETTINGS_LIST_URL } from "urls";
import { EditorSettingsListContainer } from "features/categories-moderation";

export interface EditorSettingsListPageProps {
    match: { params: { stage: string } };
}

function EditorSettingsListPage({ match }: EditorSettingsListPageProps) {
    return (
        <SideMenuLayout>
            <ContentWithHeaderFragment>
                <PageHeader title="Editor Settings List" />
                <StageSwitchTabsContainer url={EDITOR_SETTINGS_LIST_URL}>
                    <EditorSettingsListContainer stage={match.params.stage} />
                </StageSwitchTabsContainer>
            </ContentWithHeaderFragment>
        </SideMenuLayout>
    );
}

export default EditorSettingsListPage;
