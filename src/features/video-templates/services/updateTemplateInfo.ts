import { request } from "shared";
import { Template } from ".";

export async function updateTemplateInfo(
    stage: string,
    id: number,
    data: Partial<Template & { thumbnailUploadId?: string }>
): Promise<Template> {
    const response = await request(stage)
        .assetmanager()
        .patch<Template>(`api/Template/${id}`, { ...data, useLevelVideo: data.useLevelVideo ?? false });

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}.`);
}
