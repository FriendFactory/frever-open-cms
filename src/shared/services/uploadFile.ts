import Axios from "axios";

export async function uploadFile(uploadUrl: string, data: File) {
    const response = await Axios.put(uploadUrl, data);

    if (response.status === 200) {
        return response.data;
    }

    throw new Error(`Upload Status code: ${response.status}.`);
}
