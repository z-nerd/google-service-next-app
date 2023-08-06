export const fetcher = async <T>(
    baseUrl: string,
    path: string,
    option?: RequestInit | undefined 
) => {
    const url = baseUrl + path
    const res = await fetch(url, option)
    const data = await res.json()

    if (res.status !== 200) {
        return Promise.reject({ ...data, status: res.status })
    }

    return data as T
}