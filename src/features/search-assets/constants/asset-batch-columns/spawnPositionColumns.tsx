import React from "react";

import { CharacterSpawnPosition } from "features/search-assets/services";
import { ExtendedEditableColumn } from "shared";
import { createdTimeCol, groupIdCol, idCol, isDefaultCol, modifiedTimeCol, nameCol } from "./sharedColumns";
import { DefaultBodyAnimation } from "features/search-assets/components/DefaultBodyAnimation";

export const movingCol: ExtendedEditableColumn<CharacterSpawnPosition> = {
    title: "Moving",
    width: 200,
    dataIndex: "moving",
    editableCellProps: { type: "boolean" },
    isBoolean: true
};

export const availableForSelectionCol: ExtendedEditableColumn<CharacterSpawnPosition> = {
    title: "Available For Selection",
    width: 200,
    dataIndex: "availableForSelection",
    editableCellProps: { type: "boolean" },
    isBoolean: true
};

const setLocationBundleIdCol: ExtendedEditableColumn<CharacterSpawnPosition> = {
    title: "Set Location Bundle ID",
    width: 200,
    dataIndex: "setLocationBundleId"
};

const spawnPositionSpaceSizeIdCol: ExtendedEditableColumn<CharacterSpawnPosition> = {
    title: "Spawn Position Space Size",
    width: 220,
    dataIndex: "spawnPositionSpaceSizeId",
    extraDataName: "SpawnPositionSpaceSize",
    editableCellProps: { type: "select" }
};
const movementTypeIdCol: ExtendedEditableColumn<CharacterSpawnPosition> = {
    title: "Movement Type",
    width: 200,
    dataIndex: "movementTypeId",
    extraDataName: "MovementType",
    editableCellProps: { type: "select" }
};

const bodyAnimationSpaceSizeIdCol: ExtendedEditableColumn<CharacterSpawnPosition> = {
    title: "Body Animation Space Size",
    width: 220,
    dataIndex: "bodyAnimationSpaceSizeId",
    extraDataName: "BodyAnimationSpaceSize",
    editableCellProps: { type: "select" }
};

const spawnPositionGroupIdCol: ExtendedEditableColumn<CharacterSpawnPosition> = {
    title: "Spawn Position Group",
    width: 200,
    dataIndex: "spawnPositionGroupId"
};

const spawnOrderIndexCol: ExtendedEditableColumn<CharacterSpawnPosition> = {
    title: "Spawn Order Index",
    width: 200,
    dataIndex: "spawnOrderIndex",
    editableCellProps: { type: "number" },
    validation: ({ spawnPositionGroupId, spawnOrderIndex }) => {
        const hasSpawnPositionGroupId = spawnPositionGroupId !== null;
        const hasSpawnOrderIndex = spawnOrderIndex !== null;

        if (!hasSpawnPositionGroupId) {
            return { disabled: true };
        }

        if (hasSpawnPositionGroupId && !hasSpawnOrderIndex) {
            return { error: "This field is required" };
        }

        return null;
    }
};

const defaultBodyAnimationIdCol: ExtendedEditableColumn<CharacterSpawnPosition> = {
    title: "Default Body Animation",
    width: 220,
    dataIndex: "defaultBodyAnimationId",
    editableCellProps: {
        type: "custom-field",
        render: (values, onSave) => (
            <DefaultBodyAnimation
                defaultValue={values.defaultBodyAnimationId}
                onSave={(defaultBodyAnimationId) => onSave({ defaultBodyAnimationId })}
            />
        )
    }
};

const maxCharactersAmountCol: ExtendedEditableColumn<CharacterSpawnPosition> = {
    title: "Max Characters Amount",
    width: 200,
    dataIndex: "maxCharactersAmount"
};

const defaultDayTimeCol: ExtendedEditableColumn<CharacterSpawnPosition> = {
    title: "Default Day Time",
    width: 200,
    dataIndex: "defaultDayTime"
};

export const spawnPositionColumns: ExtendedEditableColumn<CharacterSpawnPosition>[] = [
    idCol,
    nameCol,
    spawnPositionSpaceSizeIdCol,
    movementTypeIdCol,
    bodyAnimationSpaceSizeIdCol,
    spawnPositionGroupIdCol,
    spawnOrderIndexCol,
    createdTimeCol,
    modifiedTimeCol,
    groupIdCol,
    defaultBodyAnimationIdCol,
    defaultDayTimeCol,
    maxCharactersAmountCol,
    availableForSelectionCol,
    movingCol,
    isDefaultCol,
    setLocationBundleIdCol
];
