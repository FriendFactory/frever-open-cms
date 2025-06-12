import { request } from "shared";
import { User } from "./api";

export interface EditUserContactData extends Pick<User, "phoneNumber" | "email"> {
    identityServerId: string;
}

export async function editUserContactData(stage: string, data: EditUserContactData): Promise<EditUserContactData> {
    const response = await request(stage).assetmanager().put(`api/account/moderation/user-data`, data);

    if (response.status === 204) return data;

    throw new Error("Error requesting to edit user contact data");
}
