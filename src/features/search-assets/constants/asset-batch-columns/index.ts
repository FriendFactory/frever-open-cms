import { ExtendedEditableColumn } from "shared";
import { AssetTypes } from "config";
import { AssetData } from "features/search-assets/services";
import { wardrobeColumns } from "./wardrobeColumns";
import { bodyAnimationColumns } from "./bodyAnimationColumns";
import { cameraAnimationColumns } from "./cameraAnimationColumns";
import { songColums } from "./songsColumns";
import { sfxColumns } from "./sfxColumns";
import { vfxColumns } from "./vfxColumns";
import { cameraFilterColumns } from "./cameraFilterColumns";
import { voiceFilterColumns } from "./voiceFilterColumns";
import { setLocationColumns } from "./setLocationColumns";
import { spawnPositionColumns } from "./spawnPositionColumns";

const assetColumnsMap: { [Key in AssetTypes]: ExtendedEditableColumn<AssetData[Key]>[] } = {
    SetLocation: setLocationColumns,
    Wardrobe: wardrobeColumns,
    SFX: sfxColumns,
    VFX: vfxColumns,
    BodyAnimation: bodyAnimationColumns,
    CameraAnimationTemplate: cameraAnimationColumns,
    Song: songColums,
    CameraFilter: cameraFilterColumns,
    VoiceFilter: voiceFilterColumns,
    CharacterSpawnPosition: spawnPositionColumns
};

export const getAssetColumns = <T extends AssetTypes>(assetName: T): ExtendedEditableColumn<AssetData[T]>[] =>
    assetColumnsMap[assetName];
