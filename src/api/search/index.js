import { get } from "@utils/fetch"

export const searchSongs = keyword => get("http://47.112.216.148:8000/search?limit=50&keywords=" + keyword)

export const searchSuggest = keyword => get("http://47.112.216.148:8000/search/suggest?type=mobile&keywords=" + keyword)

export const hotSearch = () => get("http://47.112.216.148:8000/search/hot")