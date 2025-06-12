import React from "react";

import { ColumnsLayout, ContentBlankLayout, ContentWithHeaderFragment, SideMenuLayout } from "layout";
import {
    SeasonInfoContainer,
    SeasonDetailsHeaderContainer,
    QuestsTableContainer,
    RewardsTableContainer,
    ScreenshotsTableContainer
} from "features/seasons-moderation";

interface SeasonDetailsPageProps {
    match: { params: { stage: string; id: number } };
}

export function SeasonDetailsPage({ match: { params } }: SeasonDetailsPageProps) {
    return (
        <SideMenuLayout>
            <ContentWithHeaderFragment>
                <SeasonDetailsHeaderContainer />
                <ContentBlankLayout>
                    <ColumnsLayout>
                        <SeasonInfoContainer />
                        <QuestsTableContainer stage={params.stage} id={params.id} />
                        <RewardsTableContainer stage={params.stage} id={params.id} />
                        <ScreenshotsTableContainer stage={params.stage} id={params.id} />
                    </ColumnsLayout>
                </ContentBlankLayout>
            </ContentWithHeaderFragment>
        </SideMenuLayout>
    );
}
