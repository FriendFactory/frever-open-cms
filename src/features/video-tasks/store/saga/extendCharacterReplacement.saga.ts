import { all, call } from "redux-saga/effects";

import { Character } from "features/user-moderation/services";
import { CharacterReplacement, getLevelCharacters, Task } from "features/video-tasks/services";
import { getCharacterDetails } from "features/search-characters/services";

export function* extendCharacterReplacementSaga(stage: string, task: Task) {
    const taskCharacterReplacement = task.characterReplacement;
    const levelId = task.levelId;

    if (!taskCharacterReplacement || !levelId) {
        return task.characterReplacement;
    }

    const allOriginalCharacters: Character[] = yield call(getLevelCharacters, stage, levelId);

    const extendedCharacterReplacement: CharacterReplacement[] = yield all(
        allOriginalCharacters.map(function* (character) {
            const replacementValue = taskCharacterReplacement.find((el) => el.originalCharacterId === character.id);

            if (replacementValue) {
                let replaceCharacter: Character | null = null;

                if (replacementValue.replaceCharacterId) {
                    replaceCharacter = yield call(getCharacterDetails, stage, replacementValue.replaceCharacterId);
                }

                return {
                    ...replacementValue,
                    originalCharacter: character,
                    replaceCharacter
                };
            }

            return {
                originalCharacterId: character.id,
                originalCharacter: character,
                replaceWithMainCharacter: false,
                replaceCharacterId: null
            };
        })
    );

    return extendedCharacterReplacement;
}
