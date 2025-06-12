import { all } from "redux-saga/effects";
import { watchAssetListSaga } from "./watch.AssetList.saga";
import { watchAssetDetailsSaga } from "./watch.AssetDetails.saga";
import { watchAssetEditDetailsSaga } from "./watch.AssetEditDetails.saga";
import { watchAssetsDeleteSaga } from "./watch.AssetsDelete.saga";
import { watchUpdateThumbnailSaga } from "./watch.UpdateThumbnails.saga";
import { watchUpdateSongSaga } from "./watch.UpdateSong.saga";
import { watchAssetsMigrationSaga } from "./watch.AssetMigration.saga";
import { resetAssetStageCacheSaga } from "./watch.ResetCache.saga";
import { watchExpandDataSaga } from "./watch.ExpandData.saga";
import { watchMultipleEditingSaga } from "./watch.MultipleEditing.saga";
import { watchCreateAssetSaga } from "./watch.CreateAsset.saga";
import { watchUmaBundlesByTIdSaga } from "./watch.UmaBundlesByTId.saga";
import { watchBindUmaBundlesSaga } from "./watch.BindUmaBundles.saga";
import { watchUmaBundleListSaga } from "./watch.UmaBundleList.saga";
import { watchUmaBundleDetailsSaga } from "./watch.UmaBundleDetails.saga";
import { watchEditUmaAssetSaga } from "./watch.EditUmaAsset.saga";
import { watchBodyAnimationLinkerSaga } from "./watch.BodyAnimationLinker.saga";
import { watchAssetOfferSaga } from "./watch.AssetOffer.saga";
import { watchAssetOfferCommand } from "./watch.AssetOfferCommand.saga";
import { watchLoadAssetOfferListSaga } from "./watch.LoadAssetOfferList.saga";
import { watchExternalSongListSaga } from "./watch.ExternalSongList.saga";
import { watchExternalSongDetailsSaga } from "./watch.ExternalSong.saga";
import { watchExtSongEditDetailsSaga } from "./watch.ExtSongEditDetails.saga";
import { watchBulkAssetUpdateSaga } from "./watch.BulkAssetUpdate.saga";
import { executeGenderGroupCommandSaga } from "./executeGenderGroupCommand";
import { watchExtSongDeleteWithVideosSaga } from "./watch.ExtSongDeleteWithVideos.saga";
import { watchSongDeleteWithVideosSaga } from "./watch.SongDeleteWithVideos.saga";
import { watchAssetBatchUpdateSaga } from "./watchAssetBatchUpdateSaga";
import { watchTagAssetListSaga } from "./watchTagAssetListSaga";
import { watchEmotionAssetListSaga } from "./watchEmotionAssetListSaga";
import { watchUpdateAssetEmotionSaga } from "./watchUpdateAssetEmotionSaga";
import { watchWardrobeBakingAvailability } from "./watchWardrobeBakingAvailability";
import { watchDeleteBundleVfxAndBodyAnim } from "./watchDeleteBundleVfxAndBodyAnim";
import { watchUpdateBundleVfxAndBodyAnim } from "./watchUpdateBundleVfxAndBodyAnim";

export function* assetsSaga() {
    yield all([
        watchAssetListSaga(),
        watchAssetDetailsSaga(),
        watchAssetEditDetailsSaga(),
        watchAssetsDeleteSaga(),
        watchUpdateThumbnailSaga(),
        watchUpdateSongSaga(),
        watchAssetsMigrationSaga(),
        resetAssetStageCacheSaga(),
        watchExpandDataSaga(),
        watchMultipleEditingSaga(),
        watchCreateAssetSaga(),
        watchUmaBundlesByTIdSaga(),
        watchBindUmaBundlesSaga(),
        watchUmaBundleListSaga(),
        watchUmaBundleDetailsSaga(),
        watchEditUmaAssetSaga(),
        watchBodyAnimationLinkerSaga(),
        watchAssetOfferSaga(),
        watchAssetOfferCommand(),
        watchLoadAssetOfferListSaga(),
        watchExternalSongListSaga(),
        watchExternalSongDetailsSaga(),
        watchExtSongEditDetailsSaga(),
        watchExtSongDeleteWithVideosSaga(),
        watchSongDeleteWithVideosSaga(),
        watchTagAssetListSaga(),
        watchBulkAssetUpdateSaga(),
        executeGenderGroupCommandSaga(),
        watchAssetBatchUpdateSaga(),
        watchEmotionAssetListSaga(),
        watchUpdateAssetEmotionSaga(),
        watchWardrobeBakingAvailability(),
        watchDeleteBundleVfxAndBodyAnim(),
        watchUpdateBundleVfxAndBodyAnim()
    ]);
}
