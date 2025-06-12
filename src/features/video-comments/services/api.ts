export interface VideoComment {
    id: number;
    videoId: number;
    groupId: number;
    time: string;
    text: string;
    isDeleted: boolean;
    groupNickname: string;
}
