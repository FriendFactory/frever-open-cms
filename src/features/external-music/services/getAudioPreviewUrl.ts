import { request } from "shared";

export const getAudioPreviewUrl = async (stage: string, trackId: string | number, country: string = "SE") => {
    const response = await request(stage)
        .assetmanager()
        .post("api/music-provider/sign-url", {
            BaseUrl: `https://previews.7digital.com/clip/${trackId}`,
            HttpMethod: "GET",
            QueryParameters: { country }
        });
    return response.data.url;
};
