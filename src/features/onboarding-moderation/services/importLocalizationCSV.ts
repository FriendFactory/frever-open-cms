import { request } from "shared";
import { LocalizationImportType } from "./api";

export async function importLocalizationCSV(
    stage: string,
    importType: LocalizationImportType,
    data: File
): Promise<string> {
    var formData = new FormData();
    formData.append("file", data, "localization.csv");

    const response = await request(stage)
        .assetmanager()
        .post(`api/onboarding/moderation/import/${importType}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Content-Disposition": `form-data; name="file"; filename="localization.csv"`
            }
        });

    if (response.status === 204 || response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
}
