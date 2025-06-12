import React from "react";
import { RouteComponentProps } from "react-router";

import { INTELLECTUAL_PROPERTY_DETAILS_URL } from "urls";
import { PageURLNotMatch } from "shared";
import { ColumnsLayout, ContentBlankLayout, ContentWithHeaderFragment, SideMenuLayout } from "layout";
import {
    IntellectualPropertyDetailsHeader,
    IntellectualPropertyInfoFormContainer
} from "features/intellectual-property";

export function IntellectualPropertyDetailsPage(props: RouteComponentProps) {
    const urlMatch = INTELLECTUAL_PROPERTY_DETAILS_URL.match(props.location);

    return (
        <SideMenuLayout>
            {!urlMatch.isMatched ? (
                <PageURLNotMatch />
            ) : (
                <ContentWithHeaderFragment>
                    <IntellectualPropertyDetailsHeader {...urlMatch.params} />
                    <ContentBlankLayout>
                        <ColumnsLayout>
                            <IntellectualPropertyInfoFormContainer {...urlMatch.params} />
                        </ColumnsLayout>
                    </ContentBlankLayout>
                </ContentWithHeaderFragment>
            )}
        </SideMenuLayout>
    );
}
