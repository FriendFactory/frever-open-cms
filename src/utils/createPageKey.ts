import qs from "query-string";

export function pageKeySelector(skip: number | undefined, take?: number): string {
    let result = `skip=${skip ?? 0}`;

    if (take) result = `${result}&take=${take}`;

    return result;
}

export const hashKeySelector = <T extends { skip?: number }>(stage: string, params?: T): string => {
    const { skip, ...keyParams } = params || {};

    return `${stage}/${qs.stringify(keyParams ?? {})}`;
};
