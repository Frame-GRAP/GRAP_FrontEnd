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
import {IconButton, Tooltip, Typography} from "@material-ui/core";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {grey, red} from "@material-ui/core/colors";

function Video({setPopupUrl, OneOfGameData = [], setVisible, posY, myGame = [], isvideo}) {
    const [loading, setLoading] = useState(true);
    const [videoData, setVideoData] = useState([]);
    const [isAdded, setIsAdded] = useState(false);
    const user = useSelector(selectUser);
    const [anchorEl, setAnchorEl] = useState(null);

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
                    transitionDuration={{enter: 500, exit: 500} }
                >
                    <div className="row_item" onMouseLeave={handleOut}>
                        <iframe
                            className="row_video"
                            width="100%" height="270px"
                            src={player_Url}
                            scrolling="no"
                            frameBorder="0"
                            allow="autoplay"/>
                        <Tooltip title="상세정보" placement="bottom">
                            <IconButton
                                aria-label="delete"
                                className="game_info"
                                id={OneOfGameData.id}
                                onClick={OpenModal}
                            >
                                <AddCircleIcon style={{ fontSize: 40, color: grey[50]}} />
                            </IconButton>
                        </Tooltip>
                        {!isAdded ? (
                            <Tooltip title="찜한목록에 추가" placement="bottom">
                                <IconButton
                                    aria-label="delete"
                                    className="add_mylist"
                                    id={OneOfGameData.id}
                                    onClick={(e) => addMyList(OneOfGameData.id, e)}
                                >
                                    <FavoriteBorderIcon style={{ fontSize: 40, color: grey[50]}}/>
                                </IconButton>
                            </Tooltip>
                        ) : (
                            <Tooltip title="찜한목록에서 삭제" placement="bottom">
                                <IconButton
                                    aria-label="delete"
                                    className="add_mylist"
                                    id={OneOfGameData.id}
                                    onClick={(e) => deleteMyList(OneOfGameData.id, e)}
                                >
                                    <FavoriteIcon style={{ fontSize: 40, color: grey[50]}}/>
                                </IconButton>
                            </Tooltip>
                        )}
                    </div>
                </Popover>
            </MuiThemeProvider>
        </div>
    );
}

export default Video;
