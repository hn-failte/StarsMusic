import {
    Recommend,
    Hot,
    Search,
    MusicList
} from "@views"
const mainRouter = [
    {
        path: "/recommend",
        title: "推荐",
        component: Recommend,
        children: [
            //
        ]
    },
    {
        path: "/hot",
        title: "热门",
        component: Hot,
        children: [
            //
        ]
    },
    {
        path: "/search",
        title: "搜索",
        component: Search,
        children: [
            //
        ]
    }
]

export {
    mainRouter
}