import { Action } from "redux";

import { Outfit } from "features/outfit-moderation/services";
import { outfitDetailsLoadedOkAction, outfitListLoadedOkAction } from "../actions";

export interface OutfitEntitiesState {
    [key: string]: Outfit | undefined;
}

export const outfitEntitiesReducer = (state: OutfitEntitiesState | undefined, action: Action): OutfitEntitiesState => {
    if (!state) {
        state = {};
    }

    if (outfitListLoadedOkAction.is(action)) {
        return { ...state, ...entitiesWithKey(action.result, action.stage) };
    }

    if (outfitDetailsLoadedOkAction.is(action)) {
        const value: Outfit = {
            ...action.result,
            outfitAndWardrobe: action.result.outfitAndWardrobe.map((el) => ({ ...el, wardrobe: null }))
        };

        return { ...state, [outfitKeySelector(action.stage, action.id)]: value };
    }

    return state;
};

export const entitiesWithKey = (data: Outfit[], stage: string): OutfitEntitiesState =>
    data.reduce((accumulator: { [key: string]: Outfit }, outfit) => {
        accumulator[outfitKeySelector(stage, outfit.id)] = outfit;
        return accumulator;
    }, {});

export const outfitKeySelector = (stage: string, id: number): string => `${stage}/outfit/${id}`;
