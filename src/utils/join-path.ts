export function joinPaths(path: string, ...parts: string[]): string {
    path = path || "/";

    const components = [normalizePath(path), ...parts.map(normalizePath).filter((p) => !!p)];
    return components.join("/");
}

const normalizePath = (path: string): string => (path || "").trim().replace(/\/$/g, "").replace(/^\//g, "").trim();
