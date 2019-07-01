import { getRecommendList, getRecommendNewList, getListDetailType, inputChange, getHotList, getSongInfo, updatePlayList, getSearchSongs, getSearchSuggest, getHotSearch } from "./actionTypes"
import { getRecommend, getRecommendNew } from "@api/recommend"
import { getList } from "@api/hot"
import { getSong, getListDetail } from "@api/song"
import { searchSongs, searchSuggest, hotSearch } from "@api/search"

let getRecommendListAction = payload=>({ //获取推荐歌单
    type: getRecommendList,
    payload
})
export const getRecommendListActionAsync = () => dispatch => getRecommend().then(res => {
    console.log(res);
    let dataList = res.result;
    let list = [];
    dataList.forEach(item => {
        list.push({
            id: item.id,
            name: item.name,
            picUrl: item.picUrl,
            playCount: item.playCount
        })
    })
    dispatch(getRecommendListAction(list))
})

let getRecommendNewListAction = payload=>({ //获取推荐最新歌单
    type: getRecommendNewList,
    payload
})
export const getRecommendNewListActionAsync = () => dispatch => getRecommendNew().then(res => {
    console.log(res);
    let dataList = res.result;
    let list = [];
    dataList.forEach(item => {
        list.push({
            id: item.id,
            name: item.name,
            picUrl: item.picUrl,
            artists: item.song.artists,
            album: item.song.album
        })
    })
    dispatch(getRecommendNewListAction(list))
})

let getListDetailAction = payload => ({
    type: getListDetailType,
    payload
})
export const getListDetailActionAsync = (id) => dispatch => getListDetail(id).then(res => { //获取歌单详情
    //
    let payload = res;
    return dispatch(getListDetailAction(payload))
})


let getHotListAction = payload=>({ //获取热门歌曲
    type: getHotList,
    payload
})
export const getHotListActionAsync = () => dispatch => getList().then(res => {
    let sourceList = res.playlist.tracks
    let list = [];
    sourceList.forEach(item => {
        list.push({
            name: item.name,
            mv: item.mv,
            artists: item.ar,
            album: item.al,
        })
    })
    list.map((item, index)=>{
        item.id = res.playlist.trackIds[index].id
        return item
    })
    let payload = {
        list: list,
        name: res.playlist.name,
        description: res.playlist.description,
        id: res.playlist.id,
        updateTime: res.playlist.updateTime
    };
    return dispatch(getHotListAction(payload))
})

let getSongInfoAction = payload=>({ //获取歌曲信息
    type: getSongInfo,
    payload
})
export const getSongInfoActionAsync = id => dispatch => getSong(id).then(data => dispatch(getSongInfoAction(data)))

export const updatePlayListAction = (list, index) => ({ //更新播放列表
    type: updatePlayList,
    payload: {
        list,
        index
    }
})

export const inputChangeAction = payload => ({
    type: inputChange,
    payload
})

let getSearchSongsAction = payload=>({ //搜索歌曲
    type: getSearchSongs,
    payload
})
export const getSearchSongsActionAsync = keyword => dispatch => searchSongs(keyword).then(data => {
    let resList = data.result ? data.result.songs : [];
    let list = [];
    resList.forEach(item=>{
        list.push({
            id: item.id,
            name: item.name,
            artists: item.artists,
            album: item.album,
        })
    })
    return dispatch(getSearchSongsAction(list))
})


let getSearchSuggestAction = payload=>({ //搜索建议
    type: getSearchSuggest,
    payload
})
export const getSearchSuggestActionAsync = keyword => dispatch => searchSuggest(keyword).then(data => dispatch(getSearchSuggestAction(data)))


let getHotSearchAction = payload=>({ //热门搜素
    type: getHotSearch,
    payload
})
export const getHotSearchActionAsync = () => dispatch => hotSearch().then(data =>dispatch(getHotSearchAction(data)))