import React from "react";
import { Button, Modal } from "antd";

import { CommonExtraDataType } from "shared";
import { MigrationOperation } from "features/search-assets/store";
import { StageInfo } from "features/auth";
import { MigrationList } from ".";
import { MigrationResponse } from "features/search-assets/services";

interface AssetsMigrationModalParams {
    loading: boolean;
    operation: MigrationOperation;
    responses: MigrationResponse[];
    migrateModalVisible: boolean;
    currentStage: string;
    readinessList?: CommonExtraDataType[];
    assetType: string;
    assetsSelected: number[];
    nextStage: StageInfo | undefined;
    migrate: () => void;
    hideModal: () => void;
}

export function AssetsMigrationModal({
    loading,
    operation,
    responses,
    migrateModalVisible,
    currentStage,
    readinessList,
    assetType,
    assetsSelected,
    nextStage,
    migrate,
    hideModal
}: AssetsMigrationModalParams) {
    return (
        <Modal
            destroyOnClose
            maskClosable={false}
            className="AssetsMigrate__modal"
            width="1280px"
            style={{ top: "20px" }}
            styles={{ body: { overflowY: "auto", maxHeight: "calc(100vh - 152px)" } }}
            title={`Migrate ${assetsSelected.length} asset(s) to ${nextStage?.title ?? ""}`}
            open={migrateModalVisible}
            footer={[
                <Button type="primary" disabled={loading} onClick={operation === "preview" ? migrate : hideModal}>
                    {operation === "preview" ? "Migrate" : "Close"}
                </Button>
            ]}
            onCancel={hideModal}>
            <MigrationList
                responses={responses}
                operation={operation}
                loading={loading}
                readinessList={readinessList}
                assetsSelected={assetsSelected}
                assetType={assetType}
                currentStage={currentStage}
                stage={nextStage?.id ?? ""}
                nextStage={nextStage?.id!}
            />
        </Modal>
    );
}
