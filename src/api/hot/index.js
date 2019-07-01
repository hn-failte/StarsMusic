import { get } from "@utils/fetch"

export const getList = () => get("http://47.112.216.148:8000/top/list?idx=1") //热歌榜
