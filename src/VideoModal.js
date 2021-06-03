import React, {useState, useEffect} from "react";
import $ from "jquery"
import axios from "axios";
import {useSelector} from "react-redux";
import {selectUser} from "./features/userSlice";
import {IconButton, Tooltip} from "@material-ui/core";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {grey} from "@material-ui/core/colors";
import "./VideoModal.css";

function VideoModal({setVideoShow, X, Y, setPopupUrl, OneOfGameData = [], setVisible, posY, myGame = []}) {
    const [loading, setLoading] = useState(true);
    const [videoData, setVideoData] = useState([]);
    const [isAdded, setIsAdded] = useState(false);
    const user = useSelector(selectUser);
    const [curY, setCurY] = useState(0);
    const [curX, setCurX] = useState(0);

    useEffect(() => {
        async function fetchData() {
            const gameId = OneOfGameData.id;
            //await axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/${gameId}/video/all`)
            await axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/8842/video/all`)
                .then( (res) => {
                    setVideoData(res.data[0]);
                }).catch((err)=> {
                    console.log(err);
                });
            return videoData;
        }
        function check() {
            myGame.map((gameId) => {
                if(gameId === OneOfGameData.id){
                    setIsAdded(true);
                }
            })
        }

        function setPosition() {
            if(Y < 0){
                setCurY(0);
            }
            else if(Y > 1200){
                setCurY(Y - 80);
            }
            else{
                setCurY(Y - 30);
            }
            setCurX(X + window.scrollY - 50);
        }

        fetchData();
        check();
        setPosition();
        setLoading(false);
        return () => {
            setLoading(true);
        }
    }, []);


    function OpenModal(e){
        e.preventDefault();
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

    const handleOut = () => {
        setVideoShow(false);
    };

    if(loading) return (<div>Loading...</div>);
    return (
        <div
            className="row_modal"
            onMouseLeave={handleOut}
            style={{
                top: curX,
                left: curY,
            }}
        >
            <div className="modal_item">
                <iframe
                    className="modal_video"
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
        </div>
    );
}

export default VideoModal;
