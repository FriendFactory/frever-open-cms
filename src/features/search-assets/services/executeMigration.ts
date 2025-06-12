import { request } from "shared";
import { getAssetMigrateId } from "config";
import { MigrationOperation } from "../store/actions";
import { MigrationEntity } from ".";

export async function executeMigration(
    operation: MigrationOperation,
    entityType: string,
    fromStage: string,
    toStage: string,
    id: number
): Promise<MigrationResponse> {
    const migrateId = getAssetMigrateId() || "";

    const response = await request(migrateId)
        .migrate()
        .post<(UpdateEntityRelationsStep | MigrateEntityStep)[]>(`/api/asset/${entityType}/${id}/${operation}`, {
            fromStage,
            toStage
        });

    if (response.status === 403) {
        throw new Error(`Something went wrong. ${response.status}`);
    }

    return {
        ok: response.status === 200 && !response.data.some((s) => s.errors?.length),
        data: response.data
    };
}

export interface MigrationResponse {
    ok: boolean;
    data: (UpdateEntityRelationsStep | MigrateEntityStep)[];
}

export type UpdateEntityRelationsStep = {
    stepType: "UpdateEntityRelations";
    entityType: MigrationEntity;
    errors: string[];
    sourceEntityId: number;
    resolutionErrors: ResolutionError[];
    path: string;
    operation: "Update" | "Create" | "Delete";
    sourceEntity: any;
    originalTargetEntity: any | undefined;
    updatedTargetEntity: any;
};

export type MigrateEntityStep = {
    stepType: "MigrateEntity";
    entityType: MigrationEntity;
    actualTargetEntity: any;
    errors: string[];
    sourceEntityId: number;
    path: string;
    needsUpdate: true;
    sourceEntity: any;
    originalTargetEntity: any | undefined;
    updatedTargetEntity: any;
    propertyChanges: PropertyChangeInfo[];
    operation: "Update" | "Create" | "Delete";
};

export type ResolutionError = {
    entityType: MigrationEntity;
    sourceEntityId: number;
    path: string;
};

export type PropertyChangeInfo = {
    name: string;
    sourceValue: any;
    originalTargetValue: any;
    updatedTargetValue: any;
    isUpdated: boolean;
    isForeignKey: boolean;
    isEntityProperty: boolean;
    error: string | null;
};

