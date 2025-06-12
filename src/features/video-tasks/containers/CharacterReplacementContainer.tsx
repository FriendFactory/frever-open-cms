import React, { useCallback } from "react";

import { Character } from "features/user-moderation/services";
import { CharacterReplacement } from "../services";
import { CharacterReplacementList } from "../components/CharacterReplacementList";

export interface CharacterReplacementContainerProps {
    stage: string;
    value?: CharacterReplacement[];
    onChange: (value: CharacterReplacement[]) => void;
}

export function CharacterReplacementContainer({ stage, value, onChange }: CharacterReplacementContainerProps) {
    if (!value) return null;

    const createHandleOnCharacterClick = useCallback(
        (item: CharacterReplacement) => (character: Character) =>
            onChange(
                value.map((el) =>
                    el.originalCharacterId === item.originalCharacterId
                        ? {
                              ...el,
                              replaceCharacter: character,
                              replaceCharacterId: character.id,
                              replaceWithMainCharacter: false
                          }
                        : el
                )
            ),
        [value, onChange]
    );

    const handleSelectMainCharacter = useCallback(
        (item: CharacterReplacement) =>
            onChange(
                value.map((el) => {
                    if (el.originalCharacterId === item.originalCharacterId) {
                        return {
                            ...el,
                            replaceWithMainCharacter: true,
                            replaceCharacter: null,
                            replaceCharacterId: null
                        };
                    }

                    if (el.replaceWithMainCharacter) {
                        return {
                            ...el,
                            replaceWithMainCharacter: false,
                            replaceCharacterId: null,
                            replaceCharacter: null
                        };
                    }

                    return el;
                })
            ),
        [value, onChange]
    );

    const handleRemoveReplaceCharacter = useCallback(
        (item: CharacterReplacement) =>
            onChange(
                value.map((el) =>
                    el.originalCharacterId === item.originalCharacterId
                        ? {
                              ...el,
                              replaceCharacter: null,
                              replaceCharacterId: null
                          }
                        : el
                )
            ),
        [value, onChange]
    );

    return (
        <CharacterReplacementList
            stage={stage}
            characterReplacement={value}
            removeReplaceCharacter={handleRemoveReplaceCharacter}
            createHandleOnCharacterClick={createHandleOnCharacterClick}
            selectMainCharacter={handleSelectMainCharacter}
        />
    );
}
