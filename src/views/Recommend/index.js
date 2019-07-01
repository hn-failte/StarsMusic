import React, { Fragment } from "react"
import BaseComponent from "@common/BaseComponent"
import RecMusic from "@components/Recommend/RecMusic"
import NewMusic from "@components/Recommend/NewMusic"

export default class Recommend extends BaseComponent{
    render(){
        return(
            <Fragment>
                <RecMusic></RecMusic>
                <NewMusic></NewMusic>
            </Fragment>
        )
    }
}