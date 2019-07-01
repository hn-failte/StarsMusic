import React, { Fragment } from "react"
import { connect } from "react-redux"
import BaseComponent from "@common/BaseComponent"
import styled from "./ListBody.module.scss"
import { getSongInfoActionAsync, updatePlayListAction } from "@action/actionCreator";

class ListBody extends BaseComponent{
    render(){
        let { songList } = this.props
        return(
            <Fragment>
                <ul className={styled.list}>
                </ul>
            </Fragment>
        )
    }
    componentDidMount(){
        console.log(this.props)
    }
}

const mapStateToProps = (state)=>({
    songList: state.getIn(["recommend", "songList"])
})

const mapDispatchToProps = (dispatch)=>({
    getMusicList(){
        dispatch()
    },
    play(id, index){
        dispatch(getSongInfoActionAsync(id))
        dispatch(updatePlayListAction(this.props.songList, index))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ListBody)