import { Action } from "redux";

import { InAppProduct } from "features/banking-moderation/services";
import { inAppProductInfoLoadedOkAction, inAppProductListLoadedOkAction } from "../../actions";

export interface InAppProductsEntitiesState {
    [key: string]: InAppProduct;
}

export const inAppProductEntitiesReducer = (
    state: InAppProductsEntitiesState | undefined,
    action: Action
): InAppProductsEntitiesState => {
    if (!state) {
        state = {};
    }

    if (inAppProductListLoadedOkAction.is(action)) {
        return { ...state, ...createInAppProductsWithKeys(action.result.data, action.stage) };
    }

    if (inAppProductInfoLoadedOkAction.is(action)) {
        const entityKey = inAppProductKeySelector(action.stage, action.result.id);
        return { ...state, [entityKey]: { ...state[entityKey], ...action.result } };
    }

    return state;
};

const createInAppProductsWithKeys = (data: InAppProduct[], stage: string) =>
    data.reduce<InAppProductsEntitiesState>((accumulator: { [key: string]: InAppProduct }, item) => {
        accumulator[inAppProductKeySelector(stage, item.id)] = item;
        return accumulator;
    }, {});

export const inAppProductKeySelector = (stage: string, id: number) => `in-app-product/${stage}/${id}`;
