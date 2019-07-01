import { get } from "@utils/fetch"

export const getSong = id => get("http://47.112.216.148:8000/song/url?id="+id)

export const getListDetail = id => get("http://47.112.216.148:8000/playlist/detail?id=" + id)