import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function useFetchSearch(searchWord, page) {
    const [pageLoading, setPageLoading] = useState(true);
    const [error, setError] = useState(false);
    const size = 50;
    const [searchResult, setSearchResult] = useState([]);

    const sendQuery = useCallback(async () => {
        if(searchWord !== ""){
            try {
                await setPageLoading(true);
                await setError(false);
                const res = await axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/search?name=${searchWord}&size=${size}&pageNum=${page - 1}`);
                await setSearchResult((prev) => [...prev, ...res.data]);
                setPageLoading(false);
            } catch (err) {
                setError(err);
            }
        }
    }, [searchWord, page]);

    useEffect(() => {
        sendQuery(searchWord);
    }, [searchWord, sendQuery, page]);

    return { pageLoading, error, searchResult, setSearchResult };
}

export default useFetchSearch;
