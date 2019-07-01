import Loadable from "react-loadable"
import Loading from "@common/Loading"

const Recommend = Loadable({
    loader: ()=>import("./Recommend"),
    loading: Loading
})

const Hot = Loadable({
    loader: ()=>import("./Hot"),
    loading: Loading
})

const Search = Loadable({
    loader: ()=>import("./Search"),
    loading: Loading
})

const MusicList = Loadable({
    loader: ()=>import("./MusicList"),
    loading: Loading
})

export {
    Recommend,
    Hot,
    Search,
    MusicList,
    Loading
}