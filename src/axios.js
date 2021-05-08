import axios from 'axios';

const instance = axios.create({
    baseURL: "http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/all"

});

export default instance;
