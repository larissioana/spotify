import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchAlbumTracks = (id) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const fetchAndStoreData = async () => {
        setLoading(true);
        setError(null);

        const localStorageKey = `albumTracks_${id}`;
        const storedData = localStorage.getItem(localStorageKey);

        if (storedData) {
            const albumTracks = JSON.parse(storedData);
            setData(albumTracks);
            setLoading(false);
        } else {
            const options = {
                method: 'GET',
                url: 'https://spotify23.p.rapidapi.com/album_metadata/',
                params: {
                    id: id
                },
                headers: {
                    'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
                    'x-rapidapi-host': 'spotify23.p.rapidapi.com'
                }
            };

            try {
                const response = await axios.request(options);
                const albumTracks = response.data;

                localStorage.setItem(localStorageKey, JSON.stringify(albumTracks));
                setData(albumTracks);
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
            fetchAndStoreData();
        }
    }, [id]);

    return { loading, error, data };
};

export default useFetchAlbumTracks;
