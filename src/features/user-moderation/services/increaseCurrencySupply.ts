import { request } from "shared";

export interface CurrencySupply {
    softCurrencyAmount?: number;
    hardCurrencyAmount?: number;
    groupIds: number[];
}

export async function increaseCurrencySupply(stage: string, data: CurrencySupply) {
    const response = await request(stage).assetmanager().post("api/transaction/increase-currency-supply", data);
    if (response.status === 200) return response.data;
    throw new Error(`Error`);
}
