export const fetcher = async (url: string, init?: RequestInit) => await fetch(url, init).then(res => res.json())
