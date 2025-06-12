import { Store } from "antd/lib/form/interface";

export interface CommonFormContainerProps {
    stage: string;
    id: number;
    onSubmit: (data: Store) => void;
}

export * from "./BodyAnimFormContainer";
export * from "./CameraAnimTemplFormContainer";
export * from "./CameraFilterFormContainer";
export * from "./SetLocationFormContainer";
export * from "./VFXFormContainer";
export * from "./WardrobeFormContainer";
export * from "./SongFormContainer";
export * from "./SFXFormContainer";
export * from "./VoiceFilterFormContainer";
export * from "./SpawnPositionFormContainer";
