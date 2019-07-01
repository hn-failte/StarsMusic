import immutable from "immutable"
import { getHotList } from "@action/actionTypes"

const defaulteState = immutable.fromJS({
    list: [],
    name: "",
    description: "",
    id: "",
    updateTime: ""
})

export default (state=defaulteState, action={})=>{
    switch(action.type){
        case getHotList:
            let payload = action.payload;
            console.log(getHotList);
            return state.updateIn(["list"], ()=>payload.list)
                    .updateIn(["name"], ()=>payload.name)
                    .updateIn(["description"], ()=>payload.description)
                    .updateIn(["id"], ()=>payload.id)
                    .updateIn(["updateTime"], ()=>payload.updateTime)
        default:
            return state;
    }
}