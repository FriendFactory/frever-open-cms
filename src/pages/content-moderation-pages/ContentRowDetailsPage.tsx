import React from "react";
import { RouteComponentProps } from "react-router";

import { CREATE_PAGE_DETAILS_URL } from "urls";
import { PageURLNotMatch } from "shared";
import { ColumnsLayout, ContentBlankLayout, ContentWithHeaderFragment, SideMenuLayout } from "layout";
import {
    CreatePageDetailsContent,
    CreatePageDetailsHeader,
    CreatePageRowInfoFormContainer
} from "features/content-moderation";

export function ContentRowDetailsPage(props: RouteComponentProps) {
    const urlMatch = CREATE_PAGE_DETAILS_URL.match(props.location);

    return (
        <SideMenuLayout>
            {!urlMatch.isMatched ? (
                <PageURLNotMatch />
            ) : (
                <ContentWithHeaderFragment>
                    <CreatePageDetailsHeader {...urlMatch.params} />
                    <ContentBlankLayout>
                        <ColumnsLayout>
                            <CreatePageRowInfoFormContainer {...urlMatch.params} />
                            <CreatePageDetailsContent {...urlMatch.params} />
                        </ColumnsLayout>
                    </ContentBlankLayout>
                </ContentWithHeaderFragment>
            )}
        </SideMenuLayout>
    );
}
