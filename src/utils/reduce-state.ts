export const reduceState = <T>(
    data: T[],
    keyFactory: (id: string | number) => string,
    idField: keyof T = "id" as keyof T
): { [key: string]: T } =>
    data.reduce<{ [key: string]: T }>((accumulator, item) => {
        accumulator[keyFactory(item[idField] as string | number)] = item;
        return accumulator;
    }, {});
