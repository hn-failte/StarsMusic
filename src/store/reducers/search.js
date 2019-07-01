import immutable from "immutable"
import { inputChange, getSearchSongs, getSearchSuggest, getHotSearch } from "@action/actionTypes"

const defaulteState = immutable.fromJS({
    keyword: "",
    list: []
})

export default (state=defaulteState, action={})=>{
    switch(action.type){
        case inputChange:
            console.log(inputChange);
            return state.updateIn(["keyword"], ()=>action.payload)
        case getSearchSongs:
            console.log(getSearchSongs);
            return state.updateIn(["list"], () => action.payload)
        case getSearchSuggest:
            console.log(getSearchSuggest);
            break;
        case getHotSearch:
            console.log(getHotSearch);
            break;
        default:
            return state;
    }
    return state;
}