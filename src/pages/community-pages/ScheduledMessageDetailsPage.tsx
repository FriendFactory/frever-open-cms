import React from "react";
import { RouteComponentProps } from "react-router";

import { ColumnsLayout, ContentBlankLayout, ContentWithHeaderFragment, SideMenuLayout } from "layout";
import { MASS_SEND_OUTS_DETAILS_PAGE_URL } from "urls";
import { PageURLNotMatch } from "shared";
import {
    ScheduledMessageDetailsHeaderContainer,
    ScheduledMessageInfoFormContainer
} from "features/community-moderation";

export function ScheduledMessageDetailsPage(props: RouteComponentProps) {
    const urlMatch = MASS_SEND_OUTS_DETAILS_PAGE_URL.match(props.location);
    return (
        <SideMenuLayout>
            {!urlMatch.isMatched ? (
                <PageURLNotMatch />
            ) : (
                <ContentWithHeaderFragment>
                    <ScheduledMessageDetailsHeaderContainer stage={urlMatch.params.stage} id={urlMatch.params.id} />
                    <ContentBlankLayout>
                        <ColumnsLayout>
                            <ScheduledMessageInfoFormContainer stage={urlMatch.params.stage} id={urlMatch.params.id} />
                        </ColumnsLayout>
                    </ContentBlankLayout>
                </ContentWithHeaderFragment>
            )}
        </SideMenuLayout>
    );
}
