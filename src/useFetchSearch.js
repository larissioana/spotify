import { useState, useEffect } from "react";
import axios from "axios";

const useFetchSearch = (query) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!query) return;

            const cacheKey = `searchResults_${query}`;
            const cachedData = sessionStorage.getItem(cacheKey);

            if (cachedData) {
                setData(JSON.parse(cachedData));
                setLoading(false);
                return;
            }

            const options = {
                method: 'GET',
                url: 'https://spotify23.p.rapidapi.com/search/',
                params: {
                    q: query,
                    type: "multi",
                    offset: "0",
                    limit: "20",
                    numberOfTopResults: "10"
                },
                headers: {
                    'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
                    'x-rapidapi-host': 'spotify23.p.rapidapi.com'
                }
            };

            try {
                const response = await axios.request(options);
                sessionStorage.setItem(cacheKey, JSON.stringify(response.data));
                setData(response.data);
            } catch (error) {
                console.error('Error fetching search data:', error);
                setError('Failed to fetch search results. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [query]);
    return { loading, error, data }
};

export default useFetchSearch;