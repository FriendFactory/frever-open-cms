import React from "react";

import { ContentWithHeaderFragment, SideMenuLayout, ContentBlankLayout } from "layout";
import { EditorSettingsFormContainer, HeaderContainer } from "features/categories-moderation";

export interface EditorSettingsDetailsPageProps {
    match: { params: { stage: string; id: number } };
}

function EditorSettingsDetailsPage({ match }: EditorSettingsDetailsPageProps) {
    return (
        <SideMenuLayout>
            <ContentWithHeaderFragment>
                <HeaderContainer stage={match.params.stage} id={match.params.id} />
                <ContentBlankLayout>
                    <EditorSettingsFormContainer stage={match.params.stage} id={match.params.id} />
                </ContentBlankLayout>
            </ContentWithHeaderFragment>
        </SideMenuLayout>
    );
}

export default EditorSettingsDetailsPage;
