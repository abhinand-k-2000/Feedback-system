type ApiResponse<T> = {
    success?: boolean;
    data?: T;
};

const BASE_URL = "http://localhost:8003/api";

export const getApiData = <T,>(value: T | ApiResponse<T>): T => {
    if (value && typeof value === "object" && "data" in (value as ApiResponse<T>)) {
        return ((value as ApiResponse<T>).data ?? []) as T;
    }

    return value as T;
};

export const serverFetch = async <T,>(path: string): Promise<T> => {
    const response = await fetch(`${BASE_URL}${path}`, { cache: "no-store" });
    if (!response.ok) {
        throw new Error(`Failed to fetch ${path}`);
    }

    return response.json() as Promise<T>;
};
