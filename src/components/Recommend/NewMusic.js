import React, { Fragment } from "react"
import BaseComponent from "@common/BaseComponent"
import styled from "./index.module.scss"
import { getRecommendNewListActionAsync } from "@action/actionCreator";
import ListComponent from "@common/ListComponent"

class NewMusic extends BaseComponent{
    render(){
        console.log("NewMusic",this.props);
        return(
            <Fragment>
                <h3 className={styled.title}>最新音乐</h3>
            </Fragment>
        )
    }
}

export default ListComponent({
    getList: getRecommendNewListActionAsync,
    rankFlag: false,
    MoreFlag: false,
    path: "recommend",
    listName: "newList"
})(NewMusic)