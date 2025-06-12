import { BASE_PAGE_URL } from "urls";

export const STORAGE_FILE_BASE_URL = BASE_PAGE_URL.createChildPath("storage-file");

export const STORAGE_FILE_LIST_URL = STORAGE_FILE_BASE_URL.createChildPath<{}, {}>("list");

export const DEFAULT_STORAGE_LIST_SIZE = 100;
