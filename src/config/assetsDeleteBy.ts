export interface DeleteByParams {
    [key: string]: { name: string; objectId: string };
}

export interface FieldsToExpandWardrobeParams {
    idName: string;
    idTargetName: string;
    tableName: string;
    value: string;
}

export const deleteBy: DeleteByParams = {
    Wardrobe: { name: "umaBundle", objectId: "umaBundleId" },
    SetLocation: { name: "setLocationBundle", objectId: "setLocationBundleId" }
};

export const fieldsToExpandWardrobe: FieldsToExpandWardrobeParams[] = [
    { tableName: "UmaRecipe", idName: "umaRecipeId", idTargetName: "wardrobeId", value: "umaRecipeAndWardrobe" },
    { tableName: "Outfit", idName: "outfitId", idTargetName: "wardrobeId", value: "outfitAndWardrobe" }
];
