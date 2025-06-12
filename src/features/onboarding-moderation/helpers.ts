export const cleanEmptyValues = <T extends Record<string, any>>(data: T, fieldsNames: (keyof T)[]): T => {
    const cleanedData = { ...data };

    fieldsNames.forEach((fieldName) => {
        if (fieldName in data && cleanedData[fieldName] && typeof cleanedData[fieldName] === "object") {
            const entries = Object.entries(cleanedData[fieldName]).filter(([_, value]) => value);
            cleanedData[fieldName] = entries.length
                ? (Object.fromEntries(entries) as T[keyof T])
                : (null as T[keyof T]);
        }
    });

    return cleanedData;
};
