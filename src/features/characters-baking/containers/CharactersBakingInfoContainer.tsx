import React from "react";
import { useLocation } from "react-router";
import { UrlPath } from "rd-url-utils";
import { useSelector, useDispatch } from "react-redux";

import { ODATA_DATE_FORMAT_UTC } from "shared";
import { charactersBakingDetailsPageSelector } from "../store/reducer";
import { charactersBakingLoadAction } from "../store/actions/charactersBakingActions";
import { CharactersBakingInfo } from "../components/CharactersBakingInfo";
import { CharacterBakingFormQueryParams } from "../components/CharactersBakingFilter";

export interface CharactersBakingInfoContainerProps {
    url: UrlPath<{ stage: string }, {}>;
}

export function CharactersBakingInfoContainer({ url }: CharactersBakingInfoContainerProps) {
    const location = useLocation();
    const dispatch = useDispatch();

    const urlMatch = url.match(location);
    if (!urlMatch.isMatched) return null;

    const { stage } = urlMatch.params;

    const handleChangeFilter = ({ startDate, endDate, agentName }: CharacterBakingFormQueryParams) => {
        if (!startDate && !endDate) {
            dispatch(charactersBakingLoadAction({ stage, params: { agentName } }));
            return;
        }

        const stringStartDate = startDate?.format(ODATA_DATE_FORMAT_UTC);
        const stringEndDate = endDate?.format(ODATA_DATE_FORMAT_UTC);

        dispatch(
            charactersBakingLoadAction({
                stage,
                params: { startDate: stringStartDate, endDate: stringEndDate, agentName }
            })
        );
    };

    const info = useSelector(charactersBakingDetailsPageSelector(stage));

    return (
        <CharactersBakingInfo
            loading={info.loading && !info.data}
            charactersBaking={info.data}
            onChangeFilter={handleChangeFilter}
        />
    );
}
