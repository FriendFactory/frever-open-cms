import { VMEBackgroundQueryParams } from "features/vme-backgrounds/services";
import { BASE_PAGE_URL } from "urls";

export const VME_BACKGROUND_BASE_URL = BASE_PAGE_URL.createChildPath("vme-background");

export const VME_BACKGROUND_LIST_URL = VME_BACKGROUND_BASE_URL.createChildPath<{}, VMEBackgroundQueryParams>("list");

export const VME_BACKGROUND_DETAILS_URL = VME_BACKGROUND_BASE_URL.createChildPath<{ id: number }, {}>("details/:id");

export const DEFAULT_VME_BACKGROUND_LIST_SIZE = 100;

export const BACKGROUND_AI_BASE_URL = BASE_PAGE_URL.createChildPath("ai-background");

export const BACKGROUND_AI_LIST_URL = BACKGROUND_AI_BASE_URL.createChildPath<{}, VMEBackgroundQueryParams>("list");

export const BACKGROUND_AI_DETAILS_URL = BACKGROUND_AI_BASE_URL.createChildPath<{ id: number }, {}>("details/:id");

export const DEFAULT_BACKGROUND_AI_LIST_SIZE = 100;
