import { BodyAnimationAsset } from "features/search-assets/services";
import { ExtendedEditableColumn } from "shared";
import {
    assetTierCol,
    createdTimeCol,
    depublicationDateCol,
    groupIdCol,
    idCol,
    isDefaultCol,
    isStartPackMemberCol,
    modifiedTimeCol,
    nameCol,
    publicationDateCol,
    readinessCol,
    requiredLevelCol,
    sortOrderCol,
    uploaderUserIdCol
} from "./sharedColumns";

const animationDirectionIdCol: ExtendedEditableColumn<BodyAnimationAsset> = {
    title: "Animation Direction",
    dataIndex: "animationDirectionId",
    width: 200,
    extraDataName: "AnimationDirection",
    editableCellProps: { type: "select" }
};

const locomotionCol: ExtendedEditableColumn<BodyAnimationAsset> = {
    title: "Locomotion",
    dataIndex: "locomotion",
    width: 200,
    editableCellProps: { type: "boolean" },
    isBoolean: true
};

const loopingCol: ExtendedEditableColumn<BodyAnimationAsset> = {
    title: "Looping",
    dataIndex: "looping",
    width: 200,
    editableCellProps: { type: "boolean" },
    isBoolean: true
};

const continousCol: ExtendedEditableColumn<BodyAnimationAsset> = {
    title: "Continous",
    dataIndex: "continous",
    width: 200,
    editableCellProps: { type: "boolean" },
    isBoolean: true
};

const splittableCol: ExtendedEditableColumn<BodyAnimationAsset> = {
    title: "Splittable",
    dataIndex: "splittable",
    width: 200,
    editableCellProps: { type: "boolean" },
    isBoolean: true
};

const sizeKbCol: ExtendedEditableColumn<BodyAnimationAsset> = {
    title: "Size Kb",
    dataIndex: "sizeKb",
    width: 200,
    editableCellProps: { type: "number" }
};

const durationCol: ExtendedEditableColumn<BodyAnimationAsset> = {
    title: "Duration",
    dataIndex: "duration",
    editableCellProps: { type: "number" },
    width: 200
};

const frameRateCol: ExtendedEditableColumn<BodyAnimationAsset> = {
    title: "Frame Rate",
    dataIndex: "frameRate",
    editableCellProps: { type: "number" },
    width: 200
};

const bodyAnimationCategoryIdCol: ExtendedEditableColumn<BodyAnimationAsset> = {
    title: "Body Animation Category",
    dataIndex: "bodyAnimationCategoryId",
    extraDataName: "BodyAnimationCategory",
    width: 200,
    editableCellProps: { type: "select" }
};

const bodyAnimationGroupIdCol: ExtendedEditableColumn<BodyAnimationAsset> = {
    title: "Body Animation Group",
    dataIndex: "bodyAnimationGroupId",
    extraDataName: "BodyAnimationGroup",
    width: 200,
    editableCellProps: { type: "select" }
};

const orderIndexInGroupCol: ExtendedEditableColumn<BodyAnimationAsset> = {
    title: "Order Index In Group",
    dataIndex: "orderIndexInGroup",
    width: 200,
    editableCellProps: { type: "number" },
    validation: ({ bodyAnimationGroupId, orderIndexInGroup }) => {
        const hasBodyAnimationGroupId = bodyAnimationGroupId !== null;
        const hasOrderIndexInGroup = orderIndexInGroup !== null;

        if (!hasBodyAnimationGroupId && !hasOrderIndexInGroup) {
            return { disabled: true };
        }

        if (hasBodyAnimationGroupId && !hasOrderIndexInGroup) {
            return { error: "This field is required" };
        }

        if (!hasOrderIndexInGroup && hasOrderIndexInGroup) {
            return { error: "This field is must be empty" };
        }

        return null;
    }
};

const movementTypeIdCol: ExtendedEditableColumn<BodyAnimationAsset> = {
    title: "Movement Type",
    dataIndex: "movementTypeId",
    extraDataName: "MovementType",
    width: 200,
    editableCellProps: { type: "select" }
};

const bodyAnimationSpaceSizeIdCol: ExtendedEditableColumn<BodyAnimationAsset> = {
    title: "Body Animation Space Size",
    dataIndex: "bodyAnimationSpaceSizeId",
    extraDataName: "BodyAnimationSpaceSize",
    width: 220,
    editableCellProps: { type: "select" }
};

const hasFaceAnimationCol: ExtendedEditableColumn<BodyAnimationAsset> = {
    title: "Has Face Animation",
    dataIndex: "hasFaceAnimation",
    width: 200,
    editableCellProps: { type: "boolean" },
    isBoolean: true
};

export const bodyAnimationColumns: ExtendedEditableColumn<BodyAnimationAsset>[] = [
    idCol,
    nameCol,
    readinessCol,
    assetTierCol,
    animationDirectionIdCol,
    locomotionCol,
    loopingCol,
    continousCol,
    splittableCol,
    bodyAnimationCategoryIdCol,
    bodyAnimationGroupIdCol,
    orderIndexInGroupCol,
    movementTypeIdCol,
    groupIdCol,
    createdTimeCol,
    modifiedTimeCol,
    sizeKbCol,
    durationCol,
    frameRateCol,
    uploaderUserIdCol,
    isDefaultCol,
    isStartPackMemberCol,
    bodyAnimationSpaceSizeIdCol,
    sortOrderCol,
    hasFaceAnimationCol,
    publicationDateCol,
    depublicationDateCol,
    requiredLevelCol
];
