import { get } from "@utils/fetch";

export const getRecommend = () => get("http://47.112.216.148:8000/personalized")

export const getRecommendNew = () => get("http://47.112.216.148:8000/personalized/newsong")