import React, { useState, useEffect } from "react";
import "./HomeScreen.css"

// HomeScreen의 구성 요소
import Nav from "../../Nav";
import Banner from "../../Banner";
import Row from "../../Row";
import Modal from "../../Modal"

// Modal의 구성 요소
import PopupMainVideo from '../popup/PopupMainVideo'
import PopupRecomend from '../popup/PopupRecomend'
import PopupRelatedVideo from '../popup/PopupRelatedVideo'
import PopupReview from '../popup/PopupRelatedVideo'



function HomeScreen(){
    const [visible, setVisible] = useState(false);
    function visibleModal() {
        setVisible(prev=>!prev)
    }

    useEffect(() => {
        if(visible === true){
            document.getElementById('test').classList.add("hello")
        }else{
            document.getElementById('test').classList.remove("hello");
        }
        console.log(document.getElementById('test').classList)
    }, [visible])

    return (
        <div id="test" className="homeScreen">
            <Nav />

            <Banner />

            <Row title="금주의 인기순위" visibleModal={visibleModal}/>
            <Row title="인기 급상승" visibleModal={visibleModal}/>
            <Row title="RPG" visibleModal={visibleModal}/>
            <Row title="FPS" visibleModal={visibleModal}/>
            <Row title="AOS" visibleModal={visibleModal}/>

            <Modal visible={visible} setVisible={setVisible} visibleModal={visibleModal}> 
                <img 
                    className='modal__logo'
                    src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"    
                    alt="" 
                />
                <div className="popUp">
                    <div className="video">
                        Video Info
                        <PopupMainVideo />
                        <PopupReview />
                        <PopupRecomend />
                    </div>
                    <div className="video">
                        Related Video
                        <PopupRelatedVideo />
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default HomeScreen;
