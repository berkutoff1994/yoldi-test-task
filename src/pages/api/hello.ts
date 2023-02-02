import axios from "axios";

export const fetcher = (url: string, init?: RequestInit) => axios.post(url).then(res => res.data.JSON())
