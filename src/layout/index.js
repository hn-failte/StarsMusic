import React from "react"
import BaseComponent from "@common/BaseComponent"
import Header from "@common/Header"
import Footer from "@common/Footer"
import styled from "./index.module.scss"

export default class Layout extends BaseComponent{
    render(){
        return(
            <div className={styled.container}>
                <Header />
                {this.props.children}
                <Footer />
            </div>
        )
    }
}