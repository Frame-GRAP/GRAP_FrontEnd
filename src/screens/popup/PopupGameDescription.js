import React, { useEffect, useState } from 'react'
import "./PopupGameDescription.css"
import axios from 'axios'

import {selectUser} from './../../features/userSlice'
import {useSelector} from "react-redux";
import FavoriteIcon from '@material-ui/icons/Favorite';
import {Tooltip} from "@material-ui/core";
import {grey} from "@material-ui/core/colors";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';


function PopupGameDescription({popupGameData}) {
    const [favorData, setFavorData] = useState([]);
    const [isFavor, setIsFavor] = useState(false);
    const [favorBtn, setFavorBtn] = useState(false);

    const [loading, setLoading] = useState(false);

    const user = useSelector(selectUser);

    function AddMylist(){
        const userId = user.user_id;
        const gameId = popupGameData.id;

        axios({
            method: 'post',
            url: `http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${userId}/game/${gameId}/favor`,
        }).then((res) => {
            console.log(res);
            setFavorBtn(!favorBtn);
        }).catch((err)=>{
            console.log(err);
        })
    }
    function DeleteMylist(){  
        const userId = user.user_id;
        const gameId = popupGameData.id;

        axios({
            method: 'delete',
            url: `http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${userId}/game/${gameId}/favor`,
        }).then((res) => {
            console.log(res);
            setFavorBtn(!favorBtn);
        }).catch((err)=>{
            console.log(err);
        })
    }
    
    useEffect(()=>{
        axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${user.user_id}/favor/all`)
        .then((res)=>{
            setFavorData(res.data);
        })

        setLoading(false);
        return () => {
            setLoading(true);
        }
    }, [popupGameData, favorBtn])

    useEffect(()=> {
        let count = 0;
        favorData.forEach((set, index)=>{
            if(set.gameId == popupGameData.id){
                count++;
            }
        })
        if(count>0){
            setIsFavor(true);
        }else{
            setIsFavor(false);
        }

        setLoading(false);
        return () => {
            setLoading(true);
        }
    }, [favorData])

    if(loading) return (<div>Loading...</div>);
    return (
        <div className="popup__Description">
            {/* <div className="title__font">Game Description</div> */}
            <h2 className="detail__gameName"> {popupGameData.name}</h2><br/>

            <div className="description__contents">
                <div className="game__Poster">
                    <img src={popupGameData.headerImg} />
                </div>
                <div className="game__Description">
                    <div className="detail__Description">
                        {popupGameData.description}
                    </div>
                    <div className="detail__content">
                        <div className="detail__title">
                            <div className="detail__name">Developer</div>
                            <div className="detail__name">Publisher</div>
                            <div className="detail__name">ReleaseDate</div>
                        </div>
                        <div className="detail__desc">
                            <div className="detail__detail">
                                {popupGameData.developer &&
                                    (
                                        popupGameData.developer.replaceAll("\"", "").replace("[","").replace("]","").length>0 
                                        ? 
                                            popupGameData.developer.replaceAll("\"", "").replace("[","").replace("]","") 
                                            : 
                                            "none"
                                    )
                                }
                            </div>
                            
                            <div className="detail__detail">
                                {popupGameData.publisher &&
                                    (
                                        popupGameData.publisher.replaceAll("\"", "").replace("[","").replace("]","").length>0 
                                        ? 
                                            popupGameData.publisher.replaceAll("\"", "").replace("[","").replace("]","") 
                                            : 
                                            "none"
                                    )
                                }
                            </div>
                            <div className="detail__detail">                               
                                {popupGameData.releaseDate}
                            </div>
                        </div>

                        <div className="detail__favor">                
                            {isFavor == true ? 
                                <Tooltip title="찜한목록에서 삭제" placement="bottom">
                                    <FavoriteIcon style={{ fontSize: 40, color: grey[50], cursor: "pointer" }} onClick={DeleteMylist}/>
                                </Tooltip>
                                :
                                <Tooltip title="찜한목록에 추가" placement="bottom">
                                    {/* <FavoriteIcon style={{ fontSize: 40, color: grey[50], cursor: "pointer" }} onClick={AddMylist}/> */}
                                    <FavoriteBorderIcon style={{ fontSize: 40, color: grey[50], cursor: "pointer" }} onClick={AddMylist}/>
                                </Tooltip>
                            }
                        </div>
                    </div>
                    <div className="detail_download">
                        <a
                            href={popupGameData.downloadUrl}
                        >
                            <button className="download_btn">구매하기  5,500원</button>
                            {/* <button className="download_btn">구매하기  {popupGameData.price}원</button> */}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopupGameDescription
