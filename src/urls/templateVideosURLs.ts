import { BASE_PAGE_URL } from "urls";
import { SortOrderTypes, TemplateFilterParams } from "features/video-templates/services";

export const TEMPLATE_BASE_URL = BASE_PAGE_URL.createChildPath("templates");

export const TEMPLATE_LIST_URL = TEMPLATE_BASE_URL.createChildPath<{}, TemplateFilterParams>("search");

export const TEMPLATE_SORTING_MODE_URL = TEMPLATE_BASE_URL.createChildPath<
    { sortOrderType: SortOrderTypes },
    { categoryId?: number }
>("sorting-mode/:sortOrderType");

export const TEMPLATE_DETAILS_URL = TEMPLATE_BASE_URL.createChildPath<{ id: number }, {}>("details/:id");

export const DEFAULT_TEMPLATE_LIST_PAGE_SIZE = 50;
