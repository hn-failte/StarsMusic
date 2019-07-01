import React from "react"
import BaseComponent from "@common/BaseComponent"
import Keyword from "@components/Search/Keyword"
import Content from "@components/Search/Content"

export default class Search extends BaseComponent{
    render(){
        return(
            <div>
                <Keyword></Keyword>
                <Content></Content>
            </div>
        )
    }
}