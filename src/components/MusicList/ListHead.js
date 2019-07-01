import React, { Fragment } from "react"
import { connect } from "react-redux"
import BaseComponent from "@common/BaseComponent"
import styled from "./ListHead.module.scss"

class ListHead extends BaseComponent{
    render(){
        let {  } = this.props
        return(
            <Fragment>
                <h3 className={styled.title}>歌单名称</h3>
            </Fragment>
        )
    }
    componentDidMount(){
        //
    }
}

const mapStateToProps = (state)=>({
    
})

const mapDispatchToProps = (dispatch)=>({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(ListHead)