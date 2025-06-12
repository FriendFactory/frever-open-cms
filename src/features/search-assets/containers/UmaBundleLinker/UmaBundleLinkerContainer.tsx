import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";

import { AppState } from "app-state";
import { bindUmaBundlesAction, clearLinkerAction } from "features/search-assets/store";
import { UmaBundleLinkerRow } from "features/search-assets/components/UmaBundleLinker/UmaBundleLinkerRow";
import { UMA_BUNDLE_LINKER_URL } from "urls";

export function UmaBundleLinkerContainer() {
    const location = useLocation();
    const dispatch = useDispatch();

    const urlMatch = UMA_BUNDLE_LINKER_URL.match(location);

    if (!urlMatch.isMatched) return <div></div>;

    const { stage } = urlMatch.params;
    const { base, version } = useSelector((appState: AppState) => appState.umaBundleLinker);

    useEffect(
        () => () => {
            dispatch(clearLinkerAction({}));
        },
        []
    );

    const isBundlesLinked = useMemo(
        () =>
            (base &&
                version &&
                base.umaBundleAllDependencyDependsOnBundle.some((el) => el.umaBundleId === version.id) &&
                base.umaBundleDirectDependencyDependsOnBundle.some((el) => el.umaBundleId === version.id)) ??
            false,
        [base, version]
    );

    const handleBindBundles = () =>
        base?.id &&
        version?.id &&
        dispatch(
            bindUmaBundlesAction({
                stage,
                baseBundleId: base.id,
                versionBundleId: version.id,
                operation: isBundlesLinked ? "unbind" : "bind"
            })
        );

    return (
        <UmaBundleLinkerRow
            baseBundle={base}
            versionBundle={version}
            isBundlesLinked={isBundlesLinked}
            handleBindBundles={handleBindBundles}
        />
    );
}
