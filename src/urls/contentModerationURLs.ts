import { BASE_PAGE_URL } from "urls";
import { CreatePageRowQueryParams } from "features/content-moderation";

export const CREATE_PAGE_BASE_URL = BASE_PAGE_URL.createChildPath("create-page");

export const CREATE_PAGE_LIST_URL = CREATE_PAGE_BASE_URL.createChildPath<{}, CreatePageRowQueryParams>("list");

export const CREATE_PAGE_DETAILS_URL = CREATE_PAGE_BASE_URL.createChildPath<{ id: number }, {}>("details/:id");

export const CREATE_PAGE_LIST_SIZE = 100;
