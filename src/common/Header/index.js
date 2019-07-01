import React from "react"
import BaseComponent from "@common/BaseComponent"
import { withRouter } from "react-router-dom"

import styled from "./index.module.scss"

import { mainRouter } from "@routers"

class Header extends BaseComponent{
    constructor(){
        super();
        this.state={
            activeIndex: -1
        }
    }
    render(){
        return(
            <div className={styled.header}>
                <header><i className={"iconfont icon-yinle " + styled["title-icon"]}></i>星辰云音乐</header>
                <nav>
                    {
                        mainRouter.map((item,index)=>(
                            <button className={index===this.state.activeIndex?styled.active:""} key={"goPath"+item.path} onClick={this.goPath.bind(this, index)}>{item.title}</button>
                        ))
                    }
                </nav>
            </div>
        )
    }
    componentDidMount(){
        let index = -1;
        for (let i=0; i<mainRouter.length; i++) {
            if(mainRouter[i].path===this.props.location.pathname)
            index = i
        }
        if(index===-1){
            this.setState({
                activeIndex: 0
            })
            this.props.history.replace("/recommend")
        }
        else{
            this.setState({
                activeIndex: index
            })
        }
    }
    goPath(index){
        this.props.history.push(mainRouter[index].path);
        this.setState({
            activeIndex: index
        })
    }
}

export default withRouter(Header)