import React, {useState, useEffect} from "react";
import $ from "jquery"
import './Video.css';
import axios from "axios";
import {useSelector} from "react-redux";
import {selectUser} from "./features/userSlice";
import Popover from "@material-ui/core/Popover";
import {
    MuiThemeProvider,
    createMuiTheme
} from "@material-ui/core/styles";
import {Grow, IconButton, Popper, Tooltip, Typography} from "@material-ui/core";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {grey, red} from "@material-ui/core/colors";
import VideoModal from "./VideoModal";
import HoverIntent from "react-hoverintent/src/components";

function Video({setVideoShow, setX, setY, setPopupUrl, OneOfGameData = [], setVisible, posY, myGame = [], setCurGame}) {
    const [loading, setLoading] = useState(true);
    const [videoData, setVideoData] = useState([]);
    const [isAdded, setIsAdded] = useState(false);
    const user = useSelector(selectUser);
    const [anchorEl, setAnchorEl] = useState(null);
    const [delayHandler, setDelayHandler] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const gameId = OneOfGameData.id;
            //await axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/${gameId}/video/all`)
            await axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/8842/video/all`)
                .then( (res) => {
                    setVideoData(res.data[0]);
                }).catch((err)=> {
                    // console.log(err);
                });
            return videoData;
        }
        async function check() {
            myGame.map((gameId) => {
                if(gameId === OneOfGameData.id){
                    setIsAdded(true);
                }
            })
        }
        fetchData();
        check();
        setCurGame(OneOfGameData);
        setLoading(false);
        return () => {
            setLoading(true);
        }
    }, [OneOfGameData]);


    function OpenModal(e){
        e.preventDefault();
        setAnchorEl(null);
        const popupId = Number(e.target.id);
        console.log(popupId);
        setPopupUrl(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/1`);
        //setPopupUrl(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/${popupId}`);

        setVisible(true);
        posY = Math.round($(window).scrollTop());

        $("#homeScreen").addClass('not_scroll')
        $(".not_scroll").css("top", -posY)
    }

    const addMyList = (gameId, e) => {
        e.preventDefault();
        const userId = user.user_id;
        axios({
            method: 'post',
            url: `http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${userId}/game/${gameId}/favor`,
        }).then((res) => {
            setIsAdded(true);
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
    }

    const deleteMyList = (gameId, e) => {
        e.preventDefault();
        const userId = user.user_id;
        axios({
            method: 'delete',
            url: `http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${userId}/game/${gameId}/favor`,
        }).then((res) => {
            setIsAdded(false);
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
    }

    let player_Url = "";
    if(videoData.platform === "twitch"){
        player_Url = `https://clips.twitch.tv/embed?clip=${videoData.urlKey}&parent=localhost&controls=0&autoplay=true&origin=http://localhost:3000`
    }else if(videoData.platform === "youtube"){
        player_Url = `https://www.youtube.com/embed/${videoData.urlKey}?mute=0&controls=0`
    }

    const handleOver = event => {
        setX(event.getBoundingClientRect().top);
        setY(event.getBoundingClientRect().left);
        setVideoShow(true);
        ///setAnchorEl(event.currentTarget);
    };

    const handleOut = event => {

    }

    if(loading) return (<div>Loading...</div>);
    return (
        <div className="row_container">
            <HoverIntent
                onMouseOver={handleOver}
                onMouseOut={handleOut}
                sensitivity={10}
                interval={200}
                timeout={0}
            >
                <div className="row_item">
                    <img className="row_img" src={OneOfGameData.headerImg} alt="game"/>
                </div>
            </HoverIntent>
        </div>
    );
}

export default Video;
