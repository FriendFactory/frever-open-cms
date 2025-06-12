import { applyMiddleware, combineReducers, compose, legacy_createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { connectRouter, routerMiddleware } from "connected-react-router";

import { history } from "./history-instance";
import { sharedSaga, popUpMessageReducer, extraDataReducer } from "shared/store";
import { authReducer, authSaga } from "features/auth";
import { categoriesSaga, editorSettingsReducer, geoClustersReducer } from "features/categories-moderation";
import { seasonsSaga, seasonReducer } from "features/seasons-moderation/";
import { hashtagSaga, hashtagsReducer } from "features/hashtag-moderation";
import { characterSaga, characterReducer } from "features/search-characters";
import { leaderboardListReducer, watchLeaderboardListSaga } from "features/user-leaderboard";
import { videoLeaderboardReducer, videoLeaderboardSaga } from "features/video-leaderboard";
import { taskBattleRewardsReducer, taskReducer, taskSaga } from "features/video-tasks";
import { creatorCandidateReducer, creatorCandidatesSaga } from "features/creator-candidates";
import { videoCommentsReducer, videoCommentsSaga } from "features/video-comments";
import { externalMusicSaga, playlistsReducer, trackDetailsReducer, trackSearchReducer } from "features/external-music";
import { templateSaga, templateReducer } from "features/video-templates";
import {
    assetReducer,
    assetsSaga,
    assetMigrationReducer,
    expandedDataReducer,
    multipleEditingReducer,
    assetsToDeleteModalReducer,
    umaBundlesByTIdReducer,
    umaBundleLinkerReducer,
    umaBundleListReducer,
    umaBundleDetailsReducer,
    assetOfferReducer,
    externalSongReducer,
    tagAssetListReducer
} from "features/search-assets";
import { reportVideoSaga, reportedVideoReducer } from "features/reported-videos";
import { userSaga, userReducer, purchasedAssetsReducer, userActivityReducer } from "features/user-moderation";
import {
    exchangeOffersReducer,
    inAppPriceTiersReducer,
    inAppProductsReducer,
    bankingSaga
} from "features/banking-moderation";
import {
    closerVideosIdsReducer,
    eventsOfLevelReducer,
    videoModerationListSaga,
    videoModerationReducer
} from "features/video-moderation";
import { purchaseHistoryReducer, watchLoadPurchaseHistorySaga } from "features/purchase-history";
import { storageFileReducer, storageFileSaga } from "features/storage-files";
import { outfitSaga, outfitReducer } from "features/outfit-moderation";
import { userMediaFileReducer, userMediaFilesSaga } from "features/user-media";
import { levelSaga, levelReducer, eventReducer } from "features/level-moderation";
import { permissionSaga, permissionReducer } from "features/permission-moderation";
import { sideMenuReducer } from "shared/store/reducer/sideMenu.reducer";
import { botsModerationSaga, botsReducer, botCommentsReducer } from "features/bots-moderation";
import { friendCodesSaga, creatorCodesReducer, creatorMessagesReducer } from "./features/friend-codes";
import { crewRewardsReducer, crewsSaga, crewReducer } from "features/crews-moderation";
import { reportedChatMessageSaga, reportedMessagesReducer } from "features/reported-messages";
import { lootBoxReducer, lootBoxSaga } from "features/lootbox-moderation";
import { promotedSongReducer, promotedSongSaga } from "features/promoted-songs";
import { onboardingReducer, onboardingSaga } from "features/onboarding-moderation";
import { themeCollectionsReducer, themeCollectionsSaga } from "features/theme-collections";
import { emotionsReducer, emotionsSaga } from "features/emotion-moderation";
import {
    chatListReducer,
    chatMessagesReducer,
    chatMessagesSearchListReducer,
    chatsSaga
} from "features/chats-moderation";
import { localizationReducer, localizationSaga } from "features/localization-moderation";
import {
    backgroundAIReducer,
    backgroundAISaga,
    vmeBackgroundReducer,
    vmeBackgroundSaga
} from "features/vme-backgrounds";
import {
    chatConversationReducer,
    communityChatSaga,
    communityInboxListReducer,
    scheduledMessageReducer,
    scheduledMessagesSaga
} from "features/community-moderation";
import { deviceBlacklistReducer, deviceBlacklistSaga } from "features/blacklist-moderation";
import { charactersBakingSaga, charactersBakingReducer } from "features/characters-baking";
import { spawnFormationReducer, spawnFormationSaga } from "features/spawn-formation";
import { universeReducer, universeSaga } from "features/universe-moderation";
import { watermarkReducer, watermarkSaga } from "features/watermark-moderation";
import { intellectualPropertyReducer, intellectualPropertySaga } from "features/intellectual-property";
import { raceReducer, raceSaga } from "features/race-moderation";
import { createPageReducer, createPageSaga } from "features/content-moderation";

const reducerMap = {
    router: connectRouter(history),
    sideMenuParams: sideMenuReducer,
    auth: authReducer,
    permission: permissionReducer,
    videoModeration: videoModerationReducer,
    reportedVideos: reportedVideoReducer,
    reportedMessages: reportedMessagesReducer,
    videoComments: videoCommentsReducer,
    closerVideosIdsStatus: closerVideosIdsReducer,
    asset: assetReducer,
    assetMigrationStatus: assetMigrationReducer,
    assetsToDeleteModal: assetsToDeleteModalReducer,
    expandedData: expandedDataReducer,
    multipleEditingStatus: multipleEditingReducer,
    user: userReducer,
    userMedia: userMediaFileReducer,
    purchasedAssets: purchasedAssetsReducer,
    template: templateReducer,
    eventsOfLevel: eventsOfLevelReducer,
    popUpMessage: popUpMessageReducer,
    character: characterReducer,
    charactersBaking: charactersBakingReducer,
    leaderboardList: leaderboardListReducer,
    umaBundlesByTId: umaBundlesByTIdReducer,
    umaBundleList: umaBundleListReducer,
    umaBundleLinker: umaBundleLinkerReducer,
    umaBundleDetails: umaBundleDetailsReducer,
    extraData: extraDataReducer,
    videoLeaderboard: videoLeaderboardReducer,
    hashtag: hashtagsReducer,
    assetOffer: assetOfferReducer,
    outfit: outfitReducer,
    level: levelReducer,
    event: eventReducer,
    task: taskReducer,
    externalSong: externalSongReducer,
    playlists: playlistsReducer,
    tracksSearch: trackSearchReducer,
    trackDetails: trackDetailsReducer,
    editorSettings: editorSettingsReducer,
    season: seasonReducer,
    exchangeOffers: exchangeOffersReducer,
    inAppProducts: inAppProductsReducer,
    inAppPriceTiers: inAppPriceTiersReducer,
    creatorCandidate: creatorCandidateReducer,
    purchaseHistory: purchaseHistoryReducer,
    storageFile: storageFileReducer,
    promotedSong: promotedSongReducer,
    bots: botsReducer,
    botComments: botCommentsReducer,
    taskBattleRewards: taskBattleRewardsReducer,
    creatorCodes: creatorCodesReducer,
    creatorMessages: creatorMessagesReducer,
    tags: tagAssetListReducer,
    geoClusters: geoClustersReducer,
    userActivity: userActivityReducer,
    crews: crewReducer,
    crewRewards: crewRewardsReducer,
    onboarding: onboardingReducer,
    chats: chatMessagesReducer,
    chatsList: chatListReducer,
    chatMessagesSearch: chatMessagesSearchListReducer,
    lootBox: lootBoxReducer,
    themeCollections: themeCollectionsReducer,
    emotions: emotionsReducer,
    localization: localizationReducer,
    vmeBackground: vmeBackgroundReducer,
    backgroundAI: backgroundAIReducer,
    communityChat: communityInboxListReducer,
    cummunityLiveChat: chatConversationReducer,
    scheduledMessage: scheduledMessageReducer,
    deviceBlacklist: deviceBlacklistReducer,
    spawnFormation: spawnFormationReducer,
    universe: universeReducer,
    watermark: watermarkReducer,
    intellectualProperty: intellectualPropertyReducer,
    race: raceReducer,
    createPage: createPageReducer
};

const reducers = combineReducers(reducerMap);

function* appSaga() {
    yield all([
        authSaga(),
        videoModerationListSaga(),
        reportVideoSaga(),
        assetsSaga(),
        userSaga(),
        sharedSaga(),
        templateSaga(),
        watchLeaderboardListSaga(),
        characterSaga(),
        videoLeaderboardSaga(),
        hashtagSaga(),
        taskSaga(),
        externalMusicSaga(),
        categoriesSaga(),
        seasonsSaga(),
        bankingSaga(),
        creatorCandidatesSaga(),
        videoCommentsSaga(),
        watchLoadPurchaseHistorySaga(),
        storageFileSaga(),
        outfitSaga(),
        userMediaFilesSaga(),
        levelSaga(),
        permissionSaga(),
        botsModerationSaga(),
        friendCodesSaga(),
        crewsSaga(),
        chatsSaga(),
        reportedChatMessageSaga(),
        lootBoxSaga(),
        promotedSongSaga(),
        onboardingSaga(),
        themeCollectionsSaga(),
        emotionsSaga(),
        localizationSaga(),
        vmeBackgroundSaga(),
        backgroundAISaga(),
        communityChatSaga(),
        deviceBlacklistSaga(),
        charactersBakingSaga(),
        scheduledMessagesSaga(),
        spawnFormationSaga(),
        universeSaga(),
        watermarkSaga(),
        intellectualPropertySaga(),
        raceSaga(),
        createPageSaga()
    ]);
}
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = (window as any)["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] || compose;

export const appStore = legacy_createStore(
    reducers,
    composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware))
);

sagaMiddleware.run(appSaga);

type FirstArg<TFunction> = TFunction extends (arg: infer TArg, ...rest: any[]) => any ? TArg : any;
type State<TReducerMap> = {
    [P in keyof TReducerMap]: Exclude<FirstArg<TReducerMap[P]>, undefined>;
};

export type AppState = State<typeof reducerMap>;
