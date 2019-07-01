import React,{ Fragment } from "react"
import BaseComponent from "@common/BaseComponent"
import Banner from "@components/Hot/Banner";
import Content from "@components/Hot/Content";

export default class Hot extends BaseComponent{
    render(){
        return(
            <Fragment>
                <Banner></Banner>
                <Content />
            </Fragment>
        )
    }
}