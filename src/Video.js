import React, {useState, useEffect} from "react";
import $ from "jquery"
import './Video.css';
import axios from "axios";
import {useSelector} from "react-redux";
import {selectUser} from "./features/userSlice";

import Popover from "@material-ui/core/Popover";
import {
    makeStyles,
    MuiThemeProvider,
    createMuiTheme
} from "@material-ui/core/styles";
import {Button, IconButton, Typography} from "@material-ui/core";
import InfoIcon from '@material-ui/icons/Info';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {grey} from "@material-ui/core/colors";

function Video({setPopupUrl, OneOfGameData, setVisible, posY, myGame}) {
    const [loading, setLoading] = useState(true);
    const [content, toggleContent] = useState(true);
    const [delayHandler, setDelayHandler] = useState(null);
    const [videoData, setVideoData] = useState([]);
    const [isAdded, setIsAdded] = useState(false);
    const user = useSelector(selectUser);
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const gameId = OneOfGameData.id;
            await axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/${gameId}/video/all`)
                .then( (res) => {
                    setVideoData(res.data[0]);
                }).catch((err)=> {
                    console.log(err);
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
        setLoading(false);
        return () => {
            setLoading(true);
        }
    }, [OneOfGameData]);

    const show = () => {
        setDelayHandler(setTimeout(() => {
            toggleContent(false);
        }, 700));
        clearTimeout(delayHandler);
    }

    const hide = () => {
        setDelayHandler(setTimeout(() => {
            toggleContent(true);
        }, 700));
        clearTimeout(delayHandler);
    }

    function OpenModal(e){
        e.preventDefault();
        setAnchorEl(null);
        const popupId = Number(e.target.id);
        setPopupUrl(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/${popupId}`);

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



    let player_Url;
    if(videoData.platform === "twitch"){
        player_Url = `https://clips.twitch.tv/embed?clip=${videoData.urlKey}&parent=localhost&controls=0&autoplay=true&origin=http://localhost:3000`
    }else if(videoData.platform === "youtube"){
        player_Url = `https://www.youtube.com/embed/${videoData.urlKey}?autoplay=1&mute=0&controls=0`
    }

    const handleOver = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleOut = () => {
        setAnchorEl(null);
    };

    const theme2 = createMuiTheme({
        overrides: {
            MuiPopover: {
                root: {},
                paper: {
                    width: 520,
                    height: 400,
                    background: '#1d2327',
                }
            }
        }
    });

    if(loading) return (<div>Loading...</div>);
    return (
        <div className="row_container">
            <MuiThemeProvider theme={theme2}>
                <div className="row_item" onMouseEnter={handleOver}>
                    <img className="row_img" src={OneOfGameData.headerImg} alt="game"/>
                </div>
                <Popover
                    id="popover-with-anchor"
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        horizontal: "center"
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "center"
                    }}
                >
                    <div className="row_item" onMouseLeave={handleOut}>
                        <iframe
                            className="row_video"
                            width="100%" height="270px"
                            src={player_Url}
                            scrolling="no"
                            frameBorder="0"
                            allow="autoplay"/>
                        <IconButton
                            aria-label="delete"
                            className="game_info"
                            id={OneOfGameData.id}
                            onClick={OpenModal}
                        >
                            <AddCircleIcon style={{ fontSize: 40, color: grey[50]}} />
                        </IconButton>
                        {!isAdded ? (
                            <IconButton
                                aria-label="delete"
                                className="add_mylist"
                                id={OneOfGameData.id}
                                onClick={(e) => addMyList(OneOfGameData.id, e)}
                            >
                                <FavoriteBorderOutlinedIcon style={{ fontSize: 40, color: grey[50]}}/>
                            </IconButton>
                        ) : (
                            <IconButton
                                aria-label="delete"
                                className="add_mylist"
                                id={OneOfGameData.id}
                                onClick={(e) => deleteMyList(OneOfGameData.id, e)}
                            >
                                <FavoriteBorderIcon style={{ fontSize: 40, color: grey[50]}}/>
                            </IconButton>
                        )}

                        <Typography variant="h6" color="secondary" gutterBottom>

                        </Typography>
                    </div>
                </Popover>
            </MuiThemeProvider>
            {/*{ content ? (
                    <div className="row_item">
                        <img className="row_img" src={OneOfGameData.headerImg} alt="game"/>
                    </div>
                ) : (
                    <div className="row_item">
                        <iframe
                            className="row_video"
                            width="95%" height="95%"
                            src={player_Url}
                            scrolling="no"
                            frameBorder="0"
                            allow="autoplay"/>
                        <button
                            className="game_info"
                            id={OneOfGameData.id}
                            onClick={OpenModal}
                        >상세정보</button>
                        {!isAdded ? (
                            <button
                                className="add_mylist"
                                onClick={(e) => addMyList(OneOfGameData.id, e)}
                            >찜</button>
                        ) : (
                            <button
                                className="add_mylist"
                                onClick={(e) => deleteMyList(OneOfGameData.id, e)}
                            >찜 취소</button>)}
                    </div>
                )}*/}
        </div>
    );
}

export default Video;
