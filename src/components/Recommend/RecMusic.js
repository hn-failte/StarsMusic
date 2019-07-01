import React, { Fragment } from "react"
import { connect } from "react-redux"
import BaseComponent from "@common/BaseComponent"
import styled from "./index.module.scss"
import { getRecommendListActionAsync, getListDetailActionAsync } from "@action/actionCreator";
import { withRouter } from "react-router-dom"

class RecMusic extends BaseComponent{
    render(){
        console.log("RecMusic",this.props);
        let { recList } = this.props;
        return(
            <Fragment>
                <h3 className={styled.title}>推荐音乐</h3>
                <ul className={styled.list}>
                    {
                        recList.map((item, index) => (
                            <li key={"rec_list_"+index} onClick={this.props.getSongList.bind(this, item.id)}>
                                <img src={item.picUrl} alt={item.name}/>
                                <p>{item.name}</p>
                                <span className={styled.conut}><em className={"iconfont "}>&#xe602;</em>{item.playCount > 100000000 ? (item.playCount/100000000).toFixed(1)+"亿" : (item.playCount/10000).toFixed(1)+"万"}</span>
                            </li>
                        ))
                    }
                </ul>
            </Fragment>
        )
    }
    componentDidMount(){
        this.props.getRecommendList();
    }
}

const mapStateToProps = (state)=>({
    recList: state.getIn(["recommend", "recList"])
})

const mapDispatchToProps = (dispatch)=>({
    getRecommendList(){
        dispatch(getRecommendListActionAsync())
    },
    getSongList(id){
        dispatch(getListDetailActionAsync(id));
        this.props.history.push("/musiclist/")
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RecMusic))