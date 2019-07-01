import React from "react"
import BaseComponent from "@common/BaseComponent"
import styled from "./index.module.scss"
import { connect } from "react-redux"
import Immutable from "immutable"
import "@static/iconfont/iconfont.css"
import { getSongInfoActionAsync, updatePlayListAction } from "@action/actionCreator"
import { Modal, Toast } from 'antd-mobile';

const operation = Modal.operation;

class Footer extends BaseComponent{
    constructor(){
        super()
        this.state = {
            playState: false,
            width: 0,
            parseCurrentTime: "00:00:00",
            parseDuration: "00:00:00",
            duration: 0,
            playModeList: {
                repeat: Symbol("repeat"),
                random: Symbol("random"),
                circle: Symbol("circle"),
                list: Symbol("list")
            },
            playMode: "",
            playModeClass: "icon-suiji"
        }
    }
    render(){
        let { url, name }= this.props
        let { parseCurrentTime, parseDuration } = this.state
        let { artists } = this.props
        return(
            <div className={styled.footer}>
                <audio className={styled.audio} src={url} controls autoPlay onTimeUpdate={this.handleChange.bind(this)} onEnded={this.handleEnded.bind(this)} ref="audio"></audio>
                <div className={styled.player}>
                    <div className={styled.progress} onMouseDown={this.setCurrentTime.bind(this)}>
                        <div className={styled.passed} style={{width: this.state.width}}></div>
                        <div className={styled.current}></div>
                    </div>
                    <div className={styled.controls}>
                        <i className={"iconfont icon-shangyishou"} onClick={this.handlePrevois.bind(this)}></i>
                        <i className={"iconfont " + (this.state.playState ? "icon-pause" : "icon-bofang")} onClick={this.togglePlay.bind(this)}></i>
                        <i className={"iconfont icon-xiayishou"} onClick={this.handleNext.bind(this)}></i>
                        <i className={"iconfont " + this.state.playModeClass} onClick={this.handlePlayMode.bind(this)}></i>
                        <i className={"iconfont icon-dianshunxu " + styled.listBtn} onClick={this.toggleModal.bind(this)}></i>
                    </div>
                </div>
                <div className={styled.info}>
                    <p><span>{typeof artists === "string" ? artists : (artists.map(item=>item.name).join(" ").trim() + " - ")}</span><span>{name}</span></p>
                    <p><span>{parseCurrentTime+" / "}</span><span>{parseDuration}</span></p>
                </div>
                )
            </div>
        )
    }
    componentDidMount(){
        this.setState({
            playMode: localStorage.getItem("playMode") ? this.state.playModeList[localStorage.getItem("playMode")] : this.state.playModeList.list,
            playModeClass: localStorage.getItem("playModeClass") ? localStorage.getItem("playModeClass") : "icon-liebiaoshunxu"
        })
        this.refs.audio.pause();
    }
    componentDidUpdate(){
        if(!this.props.url) Toast.fail('没有版权', 1);
    }
    handleChange(e){ //处理播放时的时间变化
        let duration = e.target.duration, currentTime = e.target.currentTime;
        if(duration!==this.state.duration) this.setState({duration: duration}) //获取总秒数到state中
        if(Number.isNaN(duration) || Number.isNaN(currentTime)) return; //非法数字时，停止本次操作
        let parseDuration = this.parseTime(duration), parseCurrentTime = this.parseTime(currentTime); //秒数转换时间格式
        let width = (currentTime / duration * window.innerWidth).toFixed(2); //获取已播放百分比        
        this.setState({ //修改已播放长度
            parseCurrentTime,
            parseDuration,
            width: width+"px"
        })
    }
    handleEnded(e){ //处理播放完毕，控制播放模式
        if(e.target.ended){
            this.setState({
                playState: false
            })
        }
        this.handleNext.call(this)
    }
    handlePlayMode(){
        operation([
            { 
                text: '单曲循环', onPress: () => {
                    this.setState({
                        playMode: this.state.playModeList["repeat"],
                        playModeClass: "icon-danquxunhuan"
                    })
                    localStorage.setItem("playMode", "repeat");
                    localStorage.setItem("playModeClass", "icon-danquxunhuan")
                } 
            },
            {
                text: '列表循环', onPress: () => {
                        this.setState({
                        playMode: this.state.playModeList["circle"],
                        playModeClass: "icon-xunhuanbofang"
                    })
                    localStorage.setItem("playMode", "circle");
                    localStorage.setItem("playModeClass", "icon-xunhuanbofang")
                }
            },
            {
                text: '顺序播放', onPress: () => {
                    this.setState({
                        playMode: this.state.playModeList["list"],
                        playModeClass: "icon-liebiaoshunxu"
                    })
                    localStorage.setItem("playMode", "list");
                    localStorage.setItem("playModeClass", "icon-liebiaoshunxu")
                }
            },
            {
                text: '随机播放', onPress: () => {
                    this.setState({
                        playMode: this.state.playModeList["random"],
                        playModeClass: "icon-suiji"
                    })
                    localStorage.setItem("playMode", "random");
                    localStorage.setItem("playModeClass", "icon-suiji")
                }
            }
        ])
    }
    handlePrevois(){ //处理播放上一首
        console.log("handlePrevois");
        if(this.state.playMode === this.state.playModeList.random) this.handleRandom.call(this)
        else{
            let list = this.props.list;
            let index = this.props.index - 1;
            if(index < 0) index = 0;
            this.props.play(list, index);
        }
    }
    handleNext(){ //处理播放下一首
        console.log("handleNext");
        switch(this.state.playMode){
            case this.state.playModeList.repeat: //单曲循环
                this.refs.audio.currentTime = 0;
                this.refs.audio.target.play();
                break;
            case this.state.playModeList.random: //随机播放
                this.handleRandom.call(this)
                break;
            case this.state.playModeList.circle: //顺序循环
                this.refs.audio.currentTime = 0;
                this.handleNext.call(this)
                break;
            case this.state.playModeList.list: //顺序播放
                this.refs.audio.currentTime = 0;
                this.handleNext.call(this)
                break;
            default: //只播放一次
                this.refs.audio.currentTime = 0;
                console.log("stop");
        }
    }
    handleRandom(){ //处理随机切换
        console.log("handleRandom");
        let list = this.props.list;
        let index = Math.ceil(Math.random()*this.props.list.length);
        this.props.play(list, index);
    }
    parseTime(val){
        let h = parseInt(val / 3600);
        let m = parseInt((val - h * 3600) / 60);
        let s = parseInt(val - h * 3600 - m * 60);
        s = s < 10 ? "0" + s : s;
        h = h < 10 ? "0" + h : h;
        m = m < 10 ? "0" + m : m;
        return h + ":" + m + ":" + s;
    }
    togglePlay(){
        this.setState({
            playState: this.refs.audio.paused
        })
        this.refs.audio.paused ? this.refs.audio.play() : this.refs.audio.pause()
    }
    toggleModal(){
        let list = this.props.list;
        let arr = [
            
        ]
        list.forEach((item, index) => {
            arr.push({ 
                text: (typeof item.artists === "string" ? item.artists : (item.artists.map(iter=>iter.name).join(" ").trim())) + " - " + item.name, onPress: () => {
                    this.props.play(this.props.list, index)
                } 
            })
        })
        operation(arr)
    }
    setCurrentTime(e){
        if(this.state.duration<=0) return;
        let percent = (e.pageX/window.innerWidth).toFixed(4);
        let newCurrentTime = parseInt(percent * this.state.duration);
        this.refs.audio.currentTime = newCurrentTime;
    }
}

const mapStateToProps = (state)=>({
    list: Immutable.isImmutable(state.getIn(["song", "palyList"])) ? state.getIn(["song", "palyList"]).toJS() : state.getIn(["song", "palyList"]),
    index: state.getIn(["song", "index"]),
    url: state.getIn(["song", "url"]),
    name: state.getIn(["song", "name"]),
    artists: Immutable.isImmutable(state.getIn(["song", "artists"])) ? state.getIn(["song", "artists"]).toJS() : state.getIn(["song", "artists"])
})
const mapDispatchToProps = (dispatch)=>({
    play(list, index){
        dispatch(getSongInfoActionAsync(list[index].id))
        dispatch(updatePlayListAction(list, index))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Footer)