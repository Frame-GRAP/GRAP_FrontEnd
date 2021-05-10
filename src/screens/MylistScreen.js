import React, {useEffect} from "react";
import Nav from "../Nav";
import Video from "../Video";
import Image2 from "../img/Related_Image2.png";
import axios from "axios";

const fetchMylist = "http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/favor/{user_id}";

function MylistScreen({ title, gameData, videoData, popupGameData, setPopupGameData, visible, setVisible, gameId, setGameId, posY }) {
    const [mylist, setMylist] = useState([]);

    useEffect(()=> {
        async function fetchData() {
            const requestMylist = await axios.get(fetchMylist);
            console.log(requestMylist);
            setMylist(requestMylist);
            return requestMylist;
        }
        fetchData();
    }, [fetchMylist]);

    return (
        <div className="mylistScreen">
            <Nav />
            <div className="mylistScreen_body">
                <h2>내가 찜한 목록</h2>
                <div className="mylistScreen_result">
                    {mylist.map((set, index) =>
                        <Video
                            className="mylist_poster"
                            OneOfGameData={set}
                            gameData={gameData}
                            videoData={videoData}
                            popupGameData={popupGameData}
                            setPopupGameData={setPopupGameData}
                            setVisible={setVisible}
                            posY={posY}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default MylistScreen;
