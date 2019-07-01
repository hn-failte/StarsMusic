import React from "react"
import styled from "./index.module.scss"

export default class Loading extends React.PureComponent{
    render(){
        return (
            <div className={styled['loading-container']}>
                Loading
            </div>
        )
    }
}