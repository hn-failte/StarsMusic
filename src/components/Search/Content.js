import React, { Fragment } from "react"
import BaseComponent from "@common/BaseComponent"
import { getHotSearchActionAsync } from "@action/actionCreator"
import ListComponent from "@common/ListComponent"

class Content extends BaseComponent{
    render(){
        return (
            <Fragment></Fragment>
        )
    }
}

export default ListComponent({
    getList: getHotSearchActionAsync,
    rankFlag: false,
    MoreFlag: false,
    path: "search",
    listName: "list"
})(Content)