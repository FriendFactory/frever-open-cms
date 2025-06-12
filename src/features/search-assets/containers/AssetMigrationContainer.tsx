import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppState } from "app-state";
import { closeMigration, runAssetMigrationAction } from "../store";
import { AssetsMigrationModal } from "../components";
import { getActiveStageById } from "features/auth";
import { useExtraData } from "shared/hooks/useExtraData";

export interface AssetMigrationContainerProps {
    stage: string;
}

export function AssetMigrationContainer({ stage }: AssetMigrationContainerProps) {
    const dispatch = useDispatch();

    const info = useSelector((state: AppState) => state.assetMigrationStatus);
    const readinessList = useExtraData({ stage, name: "Readiness" });

    const nextStage = useMemo(() => getActiveStageById(info.params?.toStage ?? ""), [info.params?.toStage]);

    if (info.migrationState === "closed") return null;

    const handleCloseMigration = () => dispatch(closeMigration({}));

    const handleMigrate = () => {
        const assetToMigrateList = info.responses?.reduceRight((acc: number[], entitys) => {
            if (entitys.ok) {
                const id = entitys.data.find((entity) =>
                    info.assetList?.includes(entity.sourceEntityId)
                )?.sourceEntityId;
                return id ? [id, ...acc] : acc;
            }
            return acc;
        }, []);

        info.params &&
            assetToMigrateList?.length &&
            dispatch(
                runAssetMigrationAction({
                    params: {
                        operation: "migrate",
                        assetType: info.params.assetType,
                        fromStage: info.params.fromStage,
                        toStage: info.params.toStage
                    },
                    assetList: assetToMigrateList
                })
            );
    };

    return (
        <AssetsMigrationModal
            loading={info.loading}
            operation={info.params?.operation ?? "preview"}
            responses={info.responses ?? []}
            migrateModalVisible={info.migrationState === "launched"}
            currentStage={info.params?.fromStage ?? ""}
            readinessList={readinessList.data}
            assetType={info.params?.assetType ?? ""}
            assetsSelected={info.assetList ?? []}
            nextStage={nextStage}
            migrate={handleMigrate}
            hideModal={handleCloseMigration}
        />
    );
}
