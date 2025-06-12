import { Action } from "redux";
import { ActionGroup } from "rd-redux-utils";
import { ActionCreatorFn } from "rd-redux-utils/dist/action-utils/defineAction";

import { hashKeySelector, pageKeySelector } from "utils";

export interface ListPageHashedState {
    loading: boolean;
    error?: string;
    total?: number;
    pages?: {
        [pageKey: string]: string[];
    };
}

export const createListPageHashedReducer = <
    GroupBaseProps extends { stage: string; params: { skip?: number; take?: number } },
    EntityType
>({
    group,
    loading,
    loadedOk,
    loadedError,
    keyFactory
}: {
    group: ActionGroup<GroupBaseProps>;
    loading?: ActionCreatorFn<GroupBaseProps>;
    loadedError?: ActionCreatorFn<GroupBaseProps & { error: string }>;
    loadedOk?: ActionCreatorFn<GroupBaseProps & { data: EntityType[]; total?: number }>;
    keyFactory: (stage: string, entity: EntityType) => string;
}) =>
    group.hashedReducer(
        (props) => hashKeySelector(props.stage, props.params),
        (state: ListPageHashedState | undefined, action: Action): ListPageHashedState => {
            if (!state) {
                state = {
                    loading: false
                };
            }

            if (loading && loading.is(action)) {
                return {
                    ...state,
                    loading: true,
                    error: undefined
                };
            }

            if (loadedError && loadedError.is(action)) {
                return {
                    ...state,
                    loading: false,
                    error: action.error
                };
            }

            if (loadedOk && loadedOk.is(action)) {
                return {
                    ...state,
                    loading: false,
                    error: undefined,
                    total: action.total,
                    pages: {
                        ...state.pages,
                        [pageKeySelector(action.params.skip, action.params.take)]: action.data.map((el) =>
                            keyFactory(action.stage, el)
                        )
                    }
                };
            }

            return state;
        }
    );
