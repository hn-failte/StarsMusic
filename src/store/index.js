import { createStore, applyMiddleware } from "redux"
import Thunk from "redux-thunk"
import { combineReducers } from "redux-immutable"
import recommend from "./reducers/recommend"
import hot from "./reducers/hot"
import song from "./reducers/song"
import search from "./reducers/search"

const reducers = combineReducers({recommend, hot, song, search})
const store = createStore(reducers, applyMiddleware(Thunk))

export default store
