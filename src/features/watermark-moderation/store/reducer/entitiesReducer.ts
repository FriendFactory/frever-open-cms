import { Action } from "redux";

import { reduceState } from "utils";
import { Watermark } from "features/watermark-moderation";
import { watermarkListLoadedOkAction, upsertWatermarksOkAction } from "../actions";

interface WatermarkState {
    [key: string]: Watermark | undefined;
}

export const entitiesReducer = (state: WatermarkState | undefined, action: Action): WatermarkState => {
    if (!state) {
        state = {};
    }

    if (watermarkListLoadedOkAction.is(action) || upsertWatermarksOkAction.is(action)) {
        return {
            ...state,
            ...reduceState(action.data, (id) => watermarkKeySelector(action.stage, id))
        };
    }

    return state;
};

export const watermarkKeySelector = (stage: string, id: number | string) => `${stage}/watermark/${id}`;
