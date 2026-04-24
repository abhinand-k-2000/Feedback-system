import type { ApiResponse } from "@/app/types";

export const entityFromResponse = <T extends { _id: string }>(value: unknown): T | undefined => {
    if (value && typeof value === "object" && "data" in value) {
        const data = (value as ApiResponse<T>).data;
        if (data && typeof data === "object" && "_id" in data) {
            return data as T;
        }
    }

    return undefined;
};
