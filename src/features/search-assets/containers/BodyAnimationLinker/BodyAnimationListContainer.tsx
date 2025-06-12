import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";

import { assetListHandleLoadAction, assetListPageSelector } from "features/search-assets/store";
import { BODY_ANIMATION_LINKER_URL } from "urls";
import { BodyAnimationAsset } from "features/search-assets/services";
import { BodyAnimationList } from "features/search-assets/components/BodyAnimationLinker/BodyAnimationList";

export function BodyAnimationListContainer() {
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();

    const urlMatch = BODY_ANIMATION_LINKER_URL.match(location);

    if (!urlMatch.isMatched) return <div></div>;

    const stage = urlMatch.params.stage;
    const { bodyAnimSkip: skip, bodyAnimSearch: search } = urlMatch.query ?? {};

    useEffect(() => {
        dispatch(
            assetListHandleLoadAction({
                stage,
                asset: "BodyAnimation",
                params: { skip, search },
                expand: ["bodyAnimationAndCharacterSpawnPosition"]
            })
        );
    }, [skip, search, stage]);

    const info = useSelector(assetListPageSelector(stage, { search, skip }, "BodyAnimation"));

    const rowSelection = {
        type: "radio" as "radio",
        onSelect: (record: BodyAnimationAsset) => {
            const newUrl = BODY_ANIMATION_LINKER_URL.replace(location, {}, { selectedBodyAnim: record.id.toString() });
            newUrl && history.replace(newUrl);
        },
        selectedRowKeys: urlMatch.query?.selectedBodyAnim ? [urlMatch.query?.selectedBodyAnim?.toString()] : []
    };

    return (
        <BodyAnimationList
            stage={stage}
            loading={!info.data && info.loading}
            data={info.data ?? []}
            rowSelection={rowSelection}
        />
    );
}
