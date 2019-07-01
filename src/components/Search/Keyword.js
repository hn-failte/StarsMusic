import React from "react"
import BaseComponent from "@common/BaseComponent"
import styled from "./Keyword.module.scss"
import {Icon} from "antd-mobile"
import { connect } from "react-redux";
import { inputChangeAction, getSearchSongsActionAsync, getSearchSuggestActionAsync } from "@action/actionCreator"

class Keyword extends BaseComponent{
    render(){
        return (
            <div className={styled.keywordContainer}>
                <p>
                    <Icon className={styled.keywordIcon} type="search" size="lg"></Icon>
                    <input className={styled.keywordInput} type="search" value={this.props.keyword} onChange={this.props.inputChange.bind(this)} onKeyDown={this.props.userInput.bind(this)}/>
                </p>
            </div>
        )
    }
}

const mapStateToProps = (state)=>({
    keyword: state.getIn(["search", "keyword"])
})
const mapDispatchToProps = (dispatch)=>({
    inputChange(e){
        dispatch(inputChangeAction(e.target.value))
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            if(this.props.keyword.trim()!=="")
                dispatch(getSearchSuggestActionAsync(this.props.keyword))
        }, 200);
    },
    userInput(e){
        if(e.target.value.trim()==="") return
        if(e.keyCode===13) dispatch(getSearchSongsActionAsync(this.props.keyword));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Keyword)