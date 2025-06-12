export interface Bot {
    id: number;
    groupId: number;
    isEnabled: boolean;
    allowedActivityTypes: string[];
    runInSimulationMode: boolean;
    comments?: BotComment[];
}

export interface BotComment {
    id: number;
    commentText: string;
    isEnabled: boolean;
}
