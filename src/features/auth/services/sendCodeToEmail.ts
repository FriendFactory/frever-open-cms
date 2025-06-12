import axios from "axios";

export async function sendCodeToEmail(auth_server: string, email: string) {
    if (!auth_server) {
        throw new Error("Server ID is required");
    }
    if (!email) {
        throw new Error("Phone number is required");
    }

    const response = await axios.post(`${auth_server}api/verify-email`, { email });

    if (response.status === 204) return true;

    throw new Error(`Status code: ${response.status} ${response.statusText ?? ""}`);
}
