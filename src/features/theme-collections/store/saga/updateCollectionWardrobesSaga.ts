import { all, call, put, spawn, takeEvery } from "redux-saga/effects";

import { updateThemeCollectionWardrobesAction, upsertCollectionsOkAction } from "../actions";
import { ThemeCollection, ThemeCollectionWardrobeAction, WardrobeShortInfo } from "features/theme-collections/services";
import { WardrobeAsset, getAssetDetails } from "features/search-assets/services";
import { transformThemeCollection } from "./upsertCollectionsSaga";
import { postThemeCollection } from "features/theme-collections/services/postThemeCollection";
import { DETAILS_ASSET_URL } from "urls";
import { loadThemeCollections } from "./watchThemeCollectionsListSaga";
import { addPopUpMessageAction } from "shared/store";

const UPDATE_COLLECTION_WARDROBES = "UPDATE_COLLECTION_WARDROBES";

export function* updateCollectionWardrobesSaga() {
    yield takeEvery(
        updateThemeCollectionWardrobesAction.TYPE,
        function* (action: typeof updateThemeCollectionWardrobesAction.typeOf.action) {
            try {
                yield put(
                    addPopUpMessageAction({
                        messageText: `Pending...`,
                        messageStyle: "loading",
                        duration: 0,
                        key: UPDATE_COLLECTION_WARDROBES
                    })
                );

                const wardrobes: WardrobeAsset[] = yield all(
                    action.targetWardrobeIds.map(function* (el) {
                        const wardrobe: WardrobeAsset = yield call(getAssetDetails, action.stage, "Wardrobe", el);
                        return wardrobe;
                    })
                );
                const itemToUpdate = handleThemeCollectionWardrobesList(action.item, wardrobes, action.action);

                const result: ThemeCollection = yield call(
                    postThemeCollection,
                    action.stage,
                    transformThemeCollection(itemToUpdate)
                );

                const urlMatch = DETAILS_ASSET_URL.match(location);
                if (urlMatch.isMatched) {
                    yield spawn(loadThemeCollections, urlMatch.params.stage, { wardrobeId: urlMatch.params.id });
                }

                yield put(
                    upsertCollectionsOkAction({
                        stage: action.stage,
                        data: [result]
                    })
                );

                yield put(
                    addPopUpMessageAction({
                        messageText: `Updated Theme collection(${action.item.name}) wardrobes.`,
                        messageStyle: "success",
                        key: UPDATE_COLLECTION_WARDROBES
                    })
                );
            } catch (e) {
                yield put(
                    addPopUpMessageAction({
                        messageStyle: "error",
                        messageText: `Failed to update theme collection(${action.item.name}) wardrobes. ${
                            (e as Error).message
                        }`,
                        key: UPDATE_COLLECTION_WARDROBES
                    })
                );
            }
        }
    );
}

export const handleThemeCollectionWardrobeList = (item: ThemeCollection, wardrobe: WardrobeAsset) => {
    const isAdded = item.wardrobes.some((el) => el.id === wardrobe.id);

    const groupWardrobes = [
        ...(wardrobe.wardrobeGenderGroup?.wardrobe.map((el) => ({ id: el.id })) || []),
        { id: wardrobe.id }
    ];

    const wardrobes = isAdded
        ? item.wardrobes.filter((el) => !groupWardrobes.some((wardrobe) => wardrobe.id === el.id))
        : [...item.wardrobes, ...(groupWardrobes as WardrobeShortInfo[])];

    return { ...item, wardrobes };
};

export const handleThemeCollectionWardrobesList = (
    item: ThemeCollection,
    wardrobes: WardrobeAsset[],
    action: ThemeCollectionWardrobeAction
) => {
    if (action === "Delete") {
        return {
            ...item,
            wardrobes: item.wardrobes.filter((currnet) => !wardrobes.some((target) => currnet.id === target.id))
        };
    }
    const existingWardrobeIds = new Set(item.wardrobes.map((el) => el.id));

    const wardrobesGenderPairs = wardrobes
        .filter((wardrobe) => !existingWardrobeIds.has(wardrobe.id))
        .map(({ wardrobeGenderGroup }) => {
            return wardrobeGenderGroup?.wardrobe.map((el) => ({ id: el.id })) || [];
        })
        .flat();

    const updatedWardrobes = Array.from(
        new Set([...item.wardrobes, ...wardrobes, ...wardrobesGenderPairs].map((val) => val.id))
    ).map((val) => ({ id: val }));

    return { ...item, wardrobes: updatedWardrobes as WardrobeShortInfo[] };
};
