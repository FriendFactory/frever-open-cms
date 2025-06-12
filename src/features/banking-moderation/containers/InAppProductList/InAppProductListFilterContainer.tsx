import React, { useCallback } from "react";
import { useHistory, useLocation } from "react-router";

import { IN_APP_PRODUCT_LIST_URL } from "urls";
import { InAppProductsQueryParams } from "features/banking-moderation/services";
import {
    InAppProductListFilter,
    InAppProductListFilterParams
} from "features/banking-moderation/components/InAppProductListFilter";
import { dateToForm, dateToUrl } from "utils";

export function InAppProductListFilterContainer() {
    const location = useLocation();
    const history = useHistory();
    const urlMatch = IN_APP_PRODUCT_LIST_URL.match(location);

    if (!urlMatch.isMatched) return <div></div>;

    const handleChange = useCallback(
        ({ publicationDate, depublicationDate, ...restData }: InAppProductListFilterParams) => {
            const params: InAppProductsQueryParams = {
                ...restData,
                publicationDate: publicationDate ? dateToUrl(publicationDate) : undefined,
                depublicationDate: depublicationDate ? dateToUrl(depublicationDate) : undefined
            };

            const newUrl = IN_APP_PRODUCT_LIST_URL.replace(
                location,
                {},
                {
                    ...params,
                    skip: undefined
                }
            );

            if (newUrl) {
                history.push(newUrl);
            }
        },
        [history, location]
    );

    const values = {
        ...urlMatch.query,
        depublicationDate: urlMatch.query?.depublicationDate
            ? dateToForm(urlMatch.query?.depublicationDate)
            : undefined,
        publicationDate: urlMatch.query?.publicationDate ? dateToForm(urlMatch.query?.publicationDate) : undefined
    };

    return <InAppProductListFilter values={values} onChange={handleChange} />;
}
