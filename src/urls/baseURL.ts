import { createPath } from "rd-url-utils";

export const BASE_PAGE_URL = createPath<{ stage: string }>("/:stage");
