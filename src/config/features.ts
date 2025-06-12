export const features = [
    "AssetRead",
    "AssetFull",
    "ChatMessageSending",
    "VideoModeration",
    "Social",
    "Seasons",
    "Banking",
    "CategoriesRead",
    "CategoriesFull",
    "Settings"
] as const;

export type FeaturesTypes = typeof features[number];
