import React, { Fragment } from "react";
import BaseComponent from "@common/BaseComponent";
import ListHead from "@components/MusicList/ListHead"
import ListBody from "@components/MusicList/ListBody"

export class MusicList extends BaseComponent{
    render(){
        return (
            <Fragment>
                <ListHead></ListHead>
                <ListBody></ListBody>
            </Fragment>
        )
    }
}

export default MusicList