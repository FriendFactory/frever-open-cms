import { request } from "shared";

export interface InitUpload {
    uploadUrl: string;
    uploadId: string;
}
export async function initUpload(stage: string): Promise<InitUpload> {
    if (!stage) {
        throw new Error("Stage is required");
    }

    const response = await request(stage).asset().get<InitUpload>(`api/File/PreUploadingUrl`);

    if (response.status === 200) {
        return response.data;
    }

    throw new Error(`Init Upload Status code: ${response.status}.`);
}
