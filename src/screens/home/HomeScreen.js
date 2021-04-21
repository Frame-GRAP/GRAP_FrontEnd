import React from "react";
import Nav from "../../Nav";
import Banner from "../../Banner";
import Row from "../../Row";

function HomeScreen(){
    return (
        <div className="homeScreen">
            <Nav />

            <Banner />

            <Row title="금주의 인기순위"/>
            <Row title="인기 급상승"/>
            <Row title="RPG"/>
            <Row title="FPS"/>
            <Row title="AOS"/>
        </div>
    )
}

export default HomeScreen;
