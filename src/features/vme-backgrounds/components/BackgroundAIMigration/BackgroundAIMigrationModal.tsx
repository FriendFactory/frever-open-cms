import React from "react";
import { Button, Modal } from "antd";

import { MigrationOperation } from "features/search-assets/store";
import { StageInfo } from "features/auth";
import { MigrationResponse } from "features/search-assets/services";
import { MigrationList } from "./MigrationList";

interface BackgroundAIMigrationModalParams {
    loading: boolean;
    operation: MigrationOperation;
    responses: MigrationResponse[];
    migrateModalVisible: boolean;
    currentStage: string;
    entityType: string;
    backgroundsSelected: number[];
    nextStage: StageInfo | undefined;
    migrate: () => void;
    hideModal: () => void;
}

export function BackgroundAIMigrationModal({
    loading,
    operation,
    responses,
    migrateModalVisible,
    currentStage,
    entityType,
    backgroundsSelected,
    nextStage,
    migrate,
    hideModal
}: BackgroundAIMigrationModalParams) {
    responses;
    currentStage;
    entityType;
    return (
        <Modal
            destroyOnClose
            maskClosable={false}
            width="1280px"
            style={{ top: "20px" }}
            styles={{ body: { overflowY: "auto", maxHeight: "calc(100vh - 152px)" } }}
            title={`Migrate ${backgroundsSelected.length} AI Background(s) to ${nextStage?.title ?? ""}`}
            open={migrateModalVisible}
            footer={
                <Button type="primary" disabled={loading} onClick={operation === "preview" ? migrate : hideModal}>
                    {operation === "preview" ? "Migrate" : "Close"}
                </Button>
            }
            onCancel={hideModal}>
            <MigrationList
                responses={responses}
                operation={operation}
                loading={loading}
                backgroundsSelected={backgroundsSelected}
                currentStage={currentStage}
                stage={nextStage?.id ?? ""}
            />
        </Modal>
    );
}
