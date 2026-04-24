const BASE_URL = "http://localhost:8003/api";

export const api = {
    get: async (url: string) => {
        const response = await fetch(`${BASE_URL}${url}`)
        return response.json()
    },
    post: async (url: string, body: any) => {
        const response = await fetch(`${BASE_URL}${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        return response.json()
    },
    put: async (url: string, body: any) => {
        const response = await fetch(`${BASE_URL}${url}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        return response.json()
    },
    delete: async (url: string) => {
        const response = await fetch(`${BASE_URL}${url}`, {
            method: "DELETE",
        })
        return response.json()
    }
}