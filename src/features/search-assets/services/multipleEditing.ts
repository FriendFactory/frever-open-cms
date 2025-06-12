import { request } from "shared";

export interface MultipleEditingParams {
    stage: string;
    itemsToEdit: Array<{ type: string; data: any }>;
}

export async function multipleEditing({ stage, itemsToEdit }: MultipleEditingParams): Promise<Array<boolean>> {
    if (!stage) {
        throw new Error("Stage is required");
    }

    const multipleEditingMap = itemsToEdit.map(async (item) => {
        const response = await request(stage)
            .assetmanager()
            .patch(`api/${item.type}/`, JSON.stringify(item.data), { headers: { "Content-Type": "application/json" } });

        if (response.status === 200) {
            return true;
        }

        return false;
    });

    const response = await Promise.all(multipleEditingMap);

    return response;
}
