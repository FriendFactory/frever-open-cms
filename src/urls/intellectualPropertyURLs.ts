import { BASE_PAGE_URL } from "urls";
import { IntellectualPropertyQueryParams } from "features/intellectual-property";

export const INTELLECTUAL_PROPERTY_BASE_URL = BASE_PAGE_URL.createChildPath("intellectual-property");

export const INTELLECTUAL_PROPERTY_LIST_URL = INTELLECTUAL_PROPERTY_BASE_URL.createChildPath<
    {},
    IntellectualPropertyQueryParams
>("list");

export const INTELLECTUAL_PROPERTY_DETAILS_URL = INTELLECTUAL_PROPERTY_BASE_URL.createChildPath<{ id: number }, {}>(
    "details/:id"
);

export const INTELLECTUAL_PROPERTY_LIST_SIZE = 100;
