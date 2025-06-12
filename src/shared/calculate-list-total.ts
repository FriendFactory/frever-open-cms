export const calculateListTotal = (
    currentPageSize: number | undefined,
    currentPageSkip: number | string | undefined,
    defaultPageSize: number
) =>
    (currentPageSize ?? 0) >= defaultPageSize
        ? Math.floor(Number(currentPageSkip ?? 0) + Number(defaultPageSize) + 1)
        : Math.floor(Number(currentPageSkip ?? 0) + Number(defaultPageSize));
