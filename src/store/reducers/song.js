import immutable from "immutable"
import { getListDetailType, getSongInfo, updatePlayList } from "@action/actionTypes"

const defaulteState = immutable.fromJS({
    id: parseInt(localStorage.getItem("id")) || "",
    url: localStorage.getItem("url") || "",
    name: localStorage.getItem("name") || "",
    artists: JSON.parse(localStorage.getItem("artists")) || "",
    palyList: JSON.parse(localStorage.getItem("palyList")) || [],
    index: parseInt(localStorage.getItem("index")) || 0
})

export default (state=defaulteState, action={})=>{
    switch(action.type){
        case getSongInfo:
            console.log(getSongInfo);
            let obj = action.payload.data[0];
            let id = obj.id;
            let url = obj.url;
            localStorage.setItem("id", id)
            localStorage.setItem("url", url)
            return state.updateIn(["id"], ()=>id)
                    .updateIn(["url"], ()=>url)
        case updatePlayList:
            console.log(updatePlayList);
            console.log(action.payload);
            let list = action.payload.list,
                index = action.payload.index,
                name = list[index].name,
                updid = list[index].id,
                artists = list[index].artists;
            localStorage.setItem("palyList", JSON.stringify(list))
            localStorage.setItem("index", index)
            localStorage.setItem("name", name)
            localStorage.setItem("id", updid)
            localStorage.setItem("artists", JSON.stringify(artists))
            return state.updateIn(["palyList"], ()=>list)
                    .updateIn(["name"], ()=>name)
                    .updateIn(["id"], ()=>updid)
                    .updateIn(["artists"], ()=>artists)
                    .updateIn(["index"], () => index)
        case getListDetailType:
            console.log(updatePlayList);
            let detailList = action.payload.palyList
            console.log(detailList);
            
            return state;
        default:
            return state;
    }
}