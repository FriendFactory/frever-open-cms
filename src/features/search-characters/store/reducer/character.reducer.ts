import { Action } from "redux";

import { Character, User } from "features/user-moderation/services";
import { characterDetailsLoadedOkAction, characterListLoadedOkAction } from "../actions";
import { userDetailsLoadedOkAction, userListLoadedOkAction } from "features/user-moderation/store";

export interface CharacterEntitiesState {
    [key: string]: Character;
}

export const characterEntitiesReducer = (
    state: CharacterEntitiesState | undefined,
    action: Action
): CharacterEntitiesState => {
    if (!state) {
        state = {};
    }

    if (characterListLoadedOkAction.is(action)) {
        return { ...state, ...createCharactersWithKey(action.result, action.stage, state) };
    }

    if (characterDetailsLoadedOkAction.is(action)) {
        return {
            ...state,
            [characterKeySelector(action.stage, action.id)]: {
                ...state[characterKeySelector(action.stage, action.id)],
                ...action.result
            }
        };
    }

    if (userListLoadedOkAction.is(action)) {
        const newCharacters = action.result.reduce((acc: any, user: User) => {
            if (user.mainCharacter) {
                acc[characterKeySelector(action.stage, user.mainCharacter.id)] = user.mainCharacter;
            }

            return acc;
        }, {});
        return { ...state, ...newCharacters };
    }

    if (userDetailsLoadedOkAction.is(action)) {
        const newState = action.result.character?.length
            ? { ...state, ...createCharactersWithKey(action.result.character, action.stage, state) }
            : state;

        if (action.result.mainCharacter) {
            newState[characterKeySelector(action.stage, action.result.mainCharacter.id)] = action.result.mainCharacter;
        }

        return newState;
    }

    return state;
};

function createCharactersWithKey(
    data: Character[],
    stage: string,
    currentState: CharacterEntitiesState
): CharacterEntitiesState {
    return data.reduce((accumulator: { [key: string]: Character }, character) => {
        accumulator[characterKeySelector(stage, character.id)] = {
            ...currentState[characterKeySelector(stage, character.id)],
            ...character,
            characterAndUmaRecipe: currentState[characterKeySelector(stage, character.id)]?.characterAndUmaRecipe ?? []
        };
        return accumulator;
    }, {});
}

export const characterKeySelector = (stage: string, id: number): string => `${stage}/${id}`;
