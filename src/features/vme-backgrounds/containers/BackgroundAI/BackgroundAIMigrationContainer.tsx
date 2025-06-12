import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppState } from "app-state";
import { getActiveStageById } from "features/auth";
import {
    runBackgroundAIMigrationAction,
    closeBackgroundAIMigrationAction
} from "features/vme-backgrounds/store/actions";
import { BackgroundAIMigrationModal } from "features/vme-backgrounds/components/BackgroundAIMigration";

export interface BackgroundAIMigrationContainerProps {}

export function BackgroundAIMigrationContainer({}: BackgroundAIMigrationContainerProps) {
    const dispatch = useDispatch();

    const info = useSelector((state: AppState) => state.backgroundAI.migration);

    const nextStage = useMemo(() => getActiveStageById(info.params?.toStage ?? ""), [info.params?.toStage]);

    if (info.migrationState === "closed") return null;

    const handleCloseMigration = () => dispatch(closeBackgroundAIMigrationAction({}));

    const handleMigrate = () => {
        const backgroundToMigrateList = info.responses?.reduceRight((acc: number[], entitys) => {
            if (entitys.ok) {
                const id = entitys.data.find((entity) =>
                    info.backgroundsIds?.includes(entity.sourceEntityId)
                )?.sourceEntityId;
                return id ? [id, ...acc] : acc;
            }
            return acc;
        }, []);

        info.params &&
            backgroundToMigrateList?.length &&
            dispatch(
                runBackgroundAIMigrationAction({
                    params: {
                        operation: "migrate",
                        entityType: info.params.entityType,
                        fromStage: info.params.fromStage,
                        toStage: info.params.toStage
                    },
                    backgroundsIds: backgroundToMigrateList
                })
            );
    };

    return (
        <BackgroundAIMigrationModal
            loading={info.loading}
            operation={info.params?.operation ?? "preview"}
            responses={info.responses ?? []}
            migrateModalVisible={info.migrationState === "launched"}
            currentStage={info.params?.fromStage ?? ""}
            entityType={info.params?.entityType ?? ""}
            backgroundsSelected={info.backgroundsIds ?? []}
            nextStage={nextStage}
            migrate={handleMigrate}
            hideModal={handleCloseMigration}
        />
    );
}
