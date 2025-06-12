import { FileExtensions } from "config";
import { CommonExtraDataType } from "shared";

export interface CommonCreateAssetProps {
    stage: string;
    formId: string;
    readiness?: CommonExtraDataType[];
    files: Array<any>;
    multiUpload: boolean;
    assetFileExtensions: {
        mainFile: FileExtensions;
        thumbnail: FileExtensions;
    };
    changeMultiUploadStatus: () => void;
    uploadOnChange: (file: any) => void;
    uploadOnRemove: (file: any) => void;
    onSubmit: (data: FormData) => void;
}

export * from "./CreateSFXForm";
export * from "./CreateSongForm";
export * from "./AssetDetails";
export * from "./AssetMigration";
export * from "./AssetsGrid";
export * from "./UmaBundleLinker/UmaBundleLinker";
