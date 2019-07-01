import React, { Fragment } from "react"
import BaseComponent from "@common/BaseComponent"
import styled from "./index.module.scss"
import { getSongInfoActionAsync, updatePlayListAction } from "@action/actionCreator";
import store from "@store"

export default ({getList, rankFlag, MoreFlag, path, listName}) => (Children) => class extends BaseComponent{
    constructor(){
        super()
        this.state = {
            list: []
        }
        store.subscribe(this.update.bind(this))
    }
    render(){
        let {list} = this.state
        list = (MoreFlag && list.length>20) ? list.slice(0, 20) : list
        return(
            <Fragment>
                <Children></Children>
                <ul className={styled.list}>
                    {
                        list.length === 0 ? <li className={styled.noResult}>无结果</li> : list.map((item, index)=>(
                            <li key={"new_list_"+index} onClick={this.play.bind(this, item.id, index)}>
                                {rankFlag ? (<div className={styled.leftContent}>{index+1}</div>) : ""}
                                <div className={styled.centerContent}>
                                    <p className={styled.topContent}>{item.name}</p>
                                    <p className={styled.bottomContent}><span>{item.artists.map(item=>item.name).join(" ").trim()}</span> - <span>{item.album.name}</span></p>
                                </div>
                                <div className={"iconfont icon-bofang1 " + styled.rightContent}></div>
                            </li>
                        ))
                    }
                </ul>
                {MoreFlag ? (<div className={styled.more}>更多</div>) : <></>}
            </Fragment>
        )
    }
    componentDidMount(){
        store.dispatch(getList())
    }
    play(id, index){
        store.dispatch(getSongInfoActionAsync(id))
        store.dispatch(updatePlayListAction(this.state.list, index))
    }
    update(){
        this.setState({
            list: store.getState().getIn([path, listName])
        })
    }
}