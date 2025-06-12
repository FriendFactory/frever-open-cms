export interface DecodedToken {
    [key: string]: any;
}

export function decodeToken(token: string): DecodedToken | null {
    const [header, payload, signature] = token.split(".");
    if (!header || !payload || !signature) {
        return null;
    }

    try {
        const decodedHeader = JSON.parse(Buffer.from(header, "base64").toString("utf-8"));
        const decodedPayload = JSON.parse(Buffer.from(payload, "base64").toString("utf-8"));
        const decodedToken: DecodedToken = {
            ...decodedHeader,
            ...decodedPayload
        };
        return decodedToken;
    } catch (err) {
        return null;
    }
}
