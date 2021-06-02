import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function useFetchCategory(categoryId, page) {
    const [pageLoading, setPageLoading] = useState(true);
    const [error, setError] = useState(false);
    const [categoryGameData, setCategoryGameData] = useState([]);
    const size = 50;
    const [lastGameId, setLastGameId] = useState("10000");

    const sendQuery = useCallback(async () => {
        if(categoryId !== null){
            try {
                await setPageLoading(true);
                await setError(false);

                const res = await axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/${lastGameId}/all?categoryId=${categoryId}&size=${size}`);
                await setCategoryGameData((prev) => [...prev, ...res.data]);
                await setLastGameId(res.data[res.data.length - 1].id);

                setPageLoading(false);
            } catch (err) {
                setError(err);
            }
        }
    }, [categoryId, page]);

    useEffect(() => {
        sendQuery(categoryId);
    }, [categoryId, sendQuery, page]);

    return { pageLoading, error, categoryGameData, setCategoryGameData };
}

export default useFetchCategory;
