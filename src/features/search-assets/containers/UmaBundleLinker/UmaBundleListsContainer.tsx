import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "antd";

import {
    setBaseBundleToLinkerAction,
    setVersionBundleToLinkerAction,
    umaBundlesByTIdLoadAction,
    umaBundlestByTypeIdSelector
} from "features/search-assets/store";
import { UmaBundleList } from "../../components";
import { useLocation } from "react-router";
import { UMA_BUNDLE_LINKER_URL } from "urls";
import { UmaBundle, umaBundleTypes } from "features/search-assets/services";
import { AppState } from "app-state";

export function UmaBundleListsContainer() {
    const location = useLocation();
    const dispatch = useDispatch();

    const urlMatch = UMA_BUNDLE_LINKER_URL.match(location);

    if (!urlMatch.isMatched) return <div></div>;

    const { stage } = urlMatch.params;
    const { baseBunId, baseBunName, baseBunSkip, versionBunId, versionBunName, versionBunSkip } = urlMatch.query ?? {};
    const { base, version } = useSelector((appState: AppState) => appState.umaBundleLinker);

    useEffect(() => {
        dispatch(
            umaBundlesByTIdLoadAction({
                stage,
                umaBundleTypeId: umaBundleTypes.version,
                params: { id: versionBunId, name: versionBunName, skip: versionBunSkip }
            })
        );
    }, [versionBunId, versionBunName, versionBunSkip]);

    useEffect(() => {
        dispatch(
            umaBundlesByTIdLoadAction({
                stage,
                umaBundleTypeId: umaBundleTypes.base,
                params: { id: baseBunId, name: baseBunName, skip: baseBunSkip }
            })
        );
    }, [baseBunId, baseBunName, baseBunSkip]);

    const versionBunInfo = useSelector(umaBundlestByTypeIdSelector(stage, umaBundleTypes.version));
    const baseBunInfo = useSelector(umaBundlestByTypeIdSelector(stage, umaBundleTypes.base));

    return (
        <Row gutter={16}>
            <Col span={12}>
                <UmaBundleList
                    stage={urlMatch.params.stage}
                    data={baseBunInfo.data ?? []}
                    loading={baseBunInfo.loading}
                    selectedValue={base?.id}
                    handleSelectBundle={(data: UmaBundle) => dispatch(setBaseBundleToLinkerAction({ data }))}
                />
            </Col>
            <Col span={12}>
                <UmaBundleList
                    stage={urlMatch.params.stage}
                    data={versionBunInfo.data ?? []}
                    loading={versionBunInfo.loading}
                    selectedValue={version?.id}
                    handleSelectBundle={(data: UmaBundle) => dispatch(setVersionBundleToLinkerAction({ data }))}
                />
            </Col>
        </Row>
    );
}
