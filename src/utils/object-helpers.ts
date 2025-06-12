export const replaceFalsyValuesWithNull = <T extends Object>(data: T) =>
    Object.entries(data).reduce((acc: any, [key, value]) => {
        acc[key] = value !== undefined && value !== "" ? value : null;
        return acc;
    }, {});
