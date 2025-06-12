import { request } from "shared";

export const getWardrobes = async (stage: string, query: string) => {
    const response = await request(stage).assetmanager().get(`api/asset/moderation/wardrobes?${query}`);

    if (response.status === 200) {
        return {
            ...response,
            data: response.data
        };
    }

    throw new Error(`Status code: ${response.status}.`);
};
