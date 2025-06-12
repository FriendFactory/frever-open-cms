import { request } from "shared";
import { InAppProduct } from "./api";

export const getInAppProductInfo = async (stage: string, id: number): Promise<InAppProduct> => {
    const response = await request(stage).assetmanager().get(`api/in-app-purchase/product/${id}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
};
