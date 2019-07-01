import React from "react"
import BaseComponent from "@common/BaseComponent"
import { connect } from "react-redux"
import styled from "./index.module.scss"

class Banner extends BaseComponent{
    render(){
        let { name, description, id, updateTime } = this.props.data
        let time = updateTime ? new Date(updateTime).toLocaleDateString() : "";
        return(
            <div key = {id} className={styled.banner}>
                <div className={styled.name}>{name}</div>
                <div className={styled.time}>{time}</div>
                <div className={styled.desc}>{description}</div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    data: {
        name: state.getIn(["hot", "name"]),
        description: state.getIn(["hot", "description"]),
        id: state.getIn(["hot", "id"]),
        updateTime: state.getIn(["hot", "updateTime"]),
    }
})

const mapDispatchToProps = dispatch => ({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(Banner)