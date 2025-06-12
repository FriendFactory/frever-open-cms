import { Action } from "redux";

import { User } from "features/user-moderation/services";
import {
    replaceUserInCurrentPageAction,
    updateUserDataOkAction,
    updateUserGroupDataOkAction,
    updateUserSocialProfieAction,
    userDetailsLoadedOkAction,
    userListLoadedOkAction
} from "../../actions";
import { characterKeySelector } from "features/search-characters/store";

export interface NormalizedUser extends Omit<User, "character" | "mainCharacter"> {
    charactersById?: string[];
    mainCharacterById?: string;
}

export interface UserEntitiesState {
    [key: string]: NormalizedUser;
}

export const userEntitiesReducer = (state: UserEntitiesState | undefined, action: Action): UserEntitiesState => {
    if (!state) {
        state = {};
    }

    if (userListLoadedOkAction.is(action)) {
        const newUserList = action.result.reduce((accumulator: UserEntitiesState, user: User) => {
            accumulator[userKeySelector(action.stage, user.id)] = {
                ...state?.[userKeySelector(action.stage, user.id)],
                ...normalizeUser(user, action.stage)
            };
            return accumulator;
        }, {});
        return { ...state, ...newUserList };
    }

    if (userDetailsLoadedOkAction.is(action)) {
        return {
            ...state,
            [userKeySelector(action.stage, action.result.id)]: normalizeUser(action.result, action.stage)
        };
    }

    if (updateUserDataOkAction.is(action)) {
        return {
            ...state,
            [userKeySelector(action.stage, action.id)]: normalizeUser(
                {
                    ...state[userKeySelector(action.stage, action.id)],
                    ...action.result
                },
                action.stage
            )
        };
    }

    if (updateUserGroupDataOkAction.is(action)) {
        const user = Object.values(state).find((user) => user.mainGroupId === action.groupId);
        if (user) {
            user.mainGroup = { ...user.mainGroup, ...action.result };

            return {
                ...state,
                [userKeySelector(action.stage, user.id)]: user
            };
        }
    }

    if (replaceUserInCurrentPageAction.is(action)) {
        if (action.newUser) {
            return {
                ...state,
                [userKeySelector(action.stage, action.newUser.id)]: normalizeUser(action.newUser, action.stage)
            };
        }
    }

    if (updateUserSocialProfieAction.is(action)) {
        const user = Object.values(state).find((el) => el.mainGroupId === action.groupId);
        if (user) {
            return {
                ...state,
                [userKeySelector(action.stage, user.id)]: {
                    ...state[userKeySelector(action.stage, user.id)],
                    userProfileKPI: action.result
                }
            };
        }
    }

    return state;
};

export const userKeySelector = (stage: string, id: number): string => `${stage}/user/${id}`;

export const normalizeUser = ({ character, mainCharacter, ...user }: User, stage: string): NormalizedUser => {
    const newUser: NormalizedUser = { ...user };

    if (character) {
        newUser.charactersById = character.map((el) => characterKeySelector(stage, el.id));
    }
    if (mainCharacter) {
        newUser.mainCharacterById = characterKeySelector(stage, mainCharacter.id);
    }

    return newUser;
};
