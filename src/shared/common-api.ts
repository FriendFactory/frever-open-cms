export type ResultWithCount<T> = {
    count: number;
    data: T[];
};

export type BaseQueryParams = {
    skip?: number;
    take?: number;

    orderBy?: string;
    sortDirection?: "asc" | "desc";
};

export const URL_DATE_FORMAT = "YYYYMMDD";
export const ODATA_DATE_FORMAT = "YYYY-MM-DD";
export const URL_DATE_RANGE_SEPARATOR = "-";
export const ODATA_DATE_FORMAT_UTC = "YYYY-MM-DDTHH:mm:ss[Z]";
