import { API_SERVERS } from "config";
import { AuthData, AUTH_SERVER_STORAGE_KEY } from "./storage";

export type StageInfo = typeof API_SERVERS[0] & {
    auth: AuthData;
};

export function getActiveStages(): StageInfo[] {
    const storedCreds: { [id: string]: AuthData } = JSON.parse(localStorage.getItem(AUTH_SERVER_STORAGE_KEY) ?? "{}");

    return API_SERVERS.filter((s) => !!storedCreds[s.id]).map((srv) => {
        return {
            ...srv,
            auth: storedCreds[srv.id]
        };
    });
}

export function getActiveStageById(id: string): StageInfo | undefined {
    return getActiveStages().find((s) => s.id === id);
}

export function getNxtStageByCurrStageId(id: string): StageInfo | undefined {
    const stages = getActiveStages();
    const currentStage = getActiveStageById(id);
    return stages.find((stg) => currentStage && stg.ordinal === currentStage?.ordinal + 1);
}

export function getDefaultStageId(): string {
    return getActiveStages()[0]?.id ?? API_SERVERS[0].id;
}
