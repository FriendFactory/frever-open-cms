import React from "react";
import { Redirect } from "react-router";

import { SEARCH_ASSET_URL } from "urls";
import { getDefaultStageId } from "features/auth";

import { AuthRoutes } from "routes/auth.routes";
import { SeasonModerationRoutes } from "routes/season-moderation.routes";
import { TemplateRoutes } from "routes/template-videos.routes";
import { TagRoutes } from "routes/tag-moderation.routes";
import { CharacterRoutes } from "routes/search-characters.routes";
import { SearchAssetRoutes } from "routes/search-assets.routes";
import { VideoTaskRoutes } from "routes/video-tasks.routes";
import { HashtagRoutes } from "routes/hashtag-moderation.routes";
import { ExternalMusicRoutes } from "routes/external-music.routes";
import { CreatorCandidatesRoutes } from "routes/creator-candidates.routes";
import { VideoModerationRoutes } from "routes/video-moderation.routes";
import { CategoriesRoutes } from "routes/categories.routes";
import { BankingModerationRoutes } from "routes/banking-moderation.routes";
import { UserModerationRoutes } from "routes/user-moderation.routes";
import { SettingsRoutes } from "routes/settings.routes";
import { BotsModerationRoutes } from "routes/bots-moderation.routes";
import { CreatorCodesRoutes } from "routes/creator-codes.routes";
import { ChatModerationRoutes } from "routes/chat-moderation.routes";
import { OnboardingModerationRoutes } from "routes/onboarding-moderation.routes";
import { ThemeCollectionsRoutes } from "routes/theme-collections.routes";
import { EmotionsRoutes } from "routes/emotion-moderation.routes";
import { CrewRoutes } from "routes/crews.routes";
import { VMEBackgroundRoutes } from "routes/vme-background.routes";
import { CommunityModerationRoutes } from "routes/community-moderation.routes";
import { SpawnFormationRoutes } from "routes/spawn-formation.routes";
import { ContentModerationRoutes } from "routes/content-moderation.routes";

export const AppRoutes = [
    ...AuthRoutes,
    ...SearchAssetRoutes,
    ...VideoModerationRoutes,
    ...TemplateRoutes,
    ...UserModerationRoutes,
    ...CharacterRoutes,
    ...HashtagRoutes,
    ...TagRoutes,
    ...CategoriesRoutes,
    ...VideoTaskRoutes,
    ...ExternalMusicRoutes,
    ...SeasonModerationRoutes,
    ...BankingModerationRoutes,
    ...CreatorCandidatesRoutes,
    ...SettingsRoutes,
    ...BotsModerationRoutes,
    ...CrewRoutes,
    ...CreatorCodesRoutes,
    ...ChatModerationRoutes,
    ...OnboardingModerationRoutes,
    ...ThemeCollectionsRoutes,
    ...EmotionsRoutes,
    ...VMEBackgroundRoutes,
    ...CommunityModerationRoutes,
    ...SpawnFormationRoutes,
    ...ContentModerationRoutes,
    <Redirect
        key="redirect-to-login-page"
        from="/"
        to={SEARCH_ASSET_URL.format({ asset: "Wardrobe", stage: getDefaultStageId() })}
    />
];
