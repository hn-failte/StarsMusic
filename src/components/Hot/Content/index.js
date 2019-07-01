import React, { Fragment } from "react"
import BaseComponent from "@common/BaseComponent"
import { getHotListActionAsync } from "@action/actionCreator"
import ListComponent from "@common/ListComponent"

class Content extends BaseComponent{
    render(){
        return(
            <Fragment></Fragment>
        )
    }
}

export default ListComponent({
    getList: getHotListActionAsync,
    rankFlag: true,
    MoreFlag: false,
    path: "hot",
    listName: "list"
})(Content)