import { CreatePageRow, CreatePageRowDto } from "./services";

export const transformCreatePageRowContent = (item: Partial<CreatePageRow>): CreatePageRowDto => {
    const { content, ...result } = item;

    return {
        ...result,
        contentIds: content?.map((el) => el.id) || []
    };
};
