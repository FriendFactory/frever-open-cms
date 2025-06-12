import React from "react";
import { useDispatch } from "react-redux";

import { AssetTypes } from "config";
import {
    BodyAnimFormContainer,
    CameraAnimTemplFormContainer,
    CameraFilterFormContainer,
    SetLocationFormContainer,
    VFXFormContainer,
    WardrobeFormContainer,
    SongFormContainer,
    SFXFormContainer,
    VoiceFilterFormContainer,
    SpawnPositionFormContainer,
    CommonFormContainerProps
} from "./AssetOrganization";
import { AssetData } from "features/search-assets/services";
import { assetEditAction } from "features/search-assets/store";
import { replaceFalsyValuesWithNull } from "utils";

export interface AssetDynamicFormComponentProps {
    stage: string;
    asset: AssetTypes;
    id: number;
}

export function AssetDynamicFormComponent({ stage, asset, id }: AssetDynamicFormComponentProps) {
    const dispatch = useDispatch();
    const Component = components[asset.toLowerCase()];

    const handleOnSubmit = (data: Partial<AssetData[keyof AssetData]>) =>
        dispatch(assetEditAction({ stage, asset, data: { id, ...replaceFalsyValuesWithNull(data) } }));

    return <Component stage={stage} id={id} onSubmit={handleOnSubmit} />;
}

type Components = {
    [key: string]: React.ComponentType<CommonFormContainerProps>;
};

const components: Components = {
    bodyanimation: BodyAnimFormContainer,
    cameraanimationtemplate: CameraAnimTemplFormContainer,
    camerafilter: CameraFilterFormContainer,
    setlocation: SetLocationFormContainer,
    vfx: VFXFormContainer,
    wardrobe: WardrobeFormContainer,
    song: SongFormContainer,
    sfx: SFXFormContainer,
    voicefilter: VoiceFilterFormContainer,
    characterspawnposition: SpawnPositionFormContainer
};
