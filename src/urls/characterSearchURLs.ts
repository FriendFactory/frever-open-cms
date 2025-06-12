import { BASE_PAGE_URL } from "urls";
import { GetCharacterListParams } from "features/search-characters/services";
import { CharactersBakingQueryParams } from "features/characters-baking/services/getCharactersBakingStatistics";

export const CHARACTER_BASE_URL = BASE_PAGE_URL.createChildPath("character");

export const CHARACTER_LIST_URL = CHARACTER_BASE_URL.createChildPath<{}, GetCharacterListParams>("search");

export const CHARACTER_DETAILS_BASE_URL = CHARACTER_BASE_URL.createChildPath<{ id: number }, {}>("info/:id");
export const CHARACTER_DETAILS_INFO_URL = CHARACTER_DETAILS_BASE_URL.createChildPath("details");
export const CHARACTER_DETAILS_DNA_EDITOR_URL = CHARACTER_DETAILS_BASE_URL.createChildPath("dna-editor");
export const CHARACTERS_BAKING_URL = CHARACTER_BASE_URL.createChildPath<{}, CharactersBakingQueryParams>(
    "characters-baking"
);

export const DEFAULT_CHARACTER_LIST_PAGE_SIZE = 100;
export const DEFAULT_CHARACTER_BAKED_VIEW_LIST_PAGE_SIZE = 100;
