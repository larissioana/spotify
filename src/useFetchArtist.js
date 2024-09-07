import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchArtists = (ids) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const cacheKey = `artists_${ids}`;
            const cachedData = localStorage.getItem(cacheKey);

            if (cachedData) {
                setData(JSON.parse(cachedData));
                setLoading(false);
                return;
            }

            const options = {
                method: 'GET',
                url: 'https://spotify23.p.rapidapi.com/artists/',
                params: { ids },
                headers: {
                    'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
                    'x-rapidapi-host': 'spotify23.p.rapidapi.com'
                }
            };

            try {
                const response = await axios.request(options);
                localStorage.setItem(cacheKey, JSON.stringify(response.data));
                setData(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [ids]);

    return { data, loading, error };
};

export default useFetchArtists;