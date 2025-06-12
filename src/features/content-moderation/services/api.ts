import { ThumbnailFile } from "shared";

export const CreatePageContentTypes = {
    Video: "videos",
    Hashtag: "hashtags",
    Template: "templates",
    Song: "songs"
} as const;

export const CreatePageContentQuery = {
    PopularVideoRemixes: "popular_video_remixes",
    PopularHashtags: "popular_hashtags",
    PopularSongs: "popular_songs",
    PopularTemplates: "popular_templates",
    PopularSoloTemplates: "popular_solo_templates",
    PopularDuoTemplates: "popular_duo_templates",
    PopularTrioTemplates: "popular_trio_templates",
    FollowingTemplates: "following_templates"
} as const;

export const CreatePageContentQueryMap = {
    videos: ["PopularVideoRemixes"],
    hashtags: ["PopularHashtags"],
    templates: ["FollowingTemplates", "PopularSoloTemplates", "PopularDuoTemplates", "PopularTrioTemplates"],
    songs: ["PopularSongs"]
} as const;

export interface CreatePageRow {
    id: number;
    title: string;
    sortOrder: number | null;
    testGroup: string;
    contentType: string;
    contentQuery: string | null;
    content: CreatePageRowContentShortInfo[];
    isEnabled: boolean;
}

export interface CreatePageRowDto extends Partial<Omit<CreatePageRow, "contents">> {
    contentIds: number[];
}

export interface CreatePageRowContentShortInfo {
    id: number;
    title?: string;
    thumbnailUrl?: string;
    files?: ThumbnailFile[];
}
