import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchSongs = (id) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const fetchTracks = async () => {
        setLoading(true);
        setError(null);

        const localStorageKey = `albumSongs_${id}`;
        const storedData = localStorage.getItem(localStorageKey);

        if (storedData) {
            const albumSongs = JSON.parse(storedData);
            setData(albumSongs);
            setLoading(false);
        } else {
            const options = {
                method: 'GET',
                url: 'https://spotify23.p.rapidapi.com/album_tracks/',
                params: {
                    id: id,
                    offset: "0",
                    limit: "50"
                },
                headers: {
                    'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
                    'x-rapidapi-host': 'spotify23.p.rapidapi.com'
                }
            };

            try {
                const response = await axios.request(options);
                const albumSongs = response.data;
                localStorage.setItem(localStorageKey, JSON.stringify(albumSongs));
                setData(albumSongs);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch album tracks. Please try again later.');
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        if (id) {
            fetchTracks();
        }
    }, [id]);

    return { loading, error, data };
};

export default useFetchSongs;
