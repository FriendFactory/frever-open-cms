import { request } from "shared";
import { EditorSettings } from "./api";

export async function updateEditorSettings(
    stage: string,
    id: number,
    data: Partial<EditorSettings>
): Promise<EditorSettings> {
    const response = await request(stage).assetmanager().put(`api/editor-settings/${id}`, data);

    if (response.status === 200) {
        return response.data;
    }
    throw new Error(`Status code ${response.status} ${response.statusText ?? ""}`);
}
