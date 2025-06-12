export interface AdminRole {
    id: number;
    name: string;
    accessScopes: {
        name: string;
        value: string;
    }[];
}

export interface AdminAccessScope {
    name: string;
    value: string;
}

export interface AdminUser {
    groupId: number;
    email: string;
    nickname: string;
    roles: AdminRole[];

    freverOfficialGroupIds: number[];
}
