import React from "react";
import { RouteComponentProps } from "react-router";

import { RACE_DETAILS_URL } from "urls";
import { PageURLNotMatch } from "shared";
import { ColumnsLayout, ContentBlankLayout, ContentWithHeaderFragment, SideMenuLayout } from "layout";
import { RaceDetailsHeader, RaceInfoFormContainer } from "features/race-moderation";

export function RaceDetailsPage(props: RouteComponentProps) {
    const urlMatch = RACE_DETAILS_URL.match(props.location);

    return (
        <SideMenuLayout>
            {!urlMatch.isMatched ? (
                <PageURLNotMatch />
            ) : (
                <ContentWithHeaderFragment>
                    <RaceDetailsHeader {...urlMatch.params} />

                    <ContentBlankLayout>
                        <ColumnsLayout>
                            <RaceInfoFormContainer {...urlMatch.params} />
                        </ColumnsLayout>
                    </ContentBlankLayout>
                </ContentWithHeaderFragment>
            )}
        </SideMenuLayout>
    );
}
