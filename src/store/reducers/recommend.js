import immutable from "immutable"
import { getRecommendList, getRecommendNewList } from "@action/actionTypes"

const defaulteState = immutable.fromJS({
    recList: [],
    newList: []
})

export default (state=defaulteState, action={})=>{
    let payload = action.payload;
    switch(action.type){
        case getRecommendList:
            console.log(getRecommendList);
            let numList = payload.slice(0, 6);
            return state.updateIn(["recList"], ()=>numList)
        case getRecommendNewList:
            console.log(getRecommendNewList);
            return state.updateIn(["newList"], ()=>payload)
        default:
            return state;
    }
}