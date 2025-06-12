export const OPENED_MENU_ITEMS_KEY = "OPENED_MENU_ITEMS_KEY";

export const getOpenedMenuItems = (): string[] => JSON.parse(localStorage.getItem(OPENED_MENU_ITEMS_KEY) ?? "[]");

export const setOpenedMenuItems = (newValues: string[]) =>
    localStorage.setItem(OPENED_MENU_ITEMS_KEY, JSON.stringify(newValues));
