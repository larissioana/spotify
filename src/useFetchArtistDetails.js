import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchArtistDetails = (id) => {
    const [data, setData] = useState({ overview: null, discography: null });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArtistData = async () => {
            const cacheKeyOverview = `artist_overview_${id}`;
            const cacheKeyDiscography = `artist_discography_${id}`;

            const cachedOverview = localStorage.getItem(cacheKeyOverview);
            const cachedDiscography = localStorage.getItem(cacheKeyDiscography);

            if (cachedOverview && cachedDiscography) {
                setData({
                    overview: JSON.parse(cachedOverview),
                    discography: JSON.parse(cachedDiscography),
                });
                setLoading(false);
                return;
            }

            try {
                const [overviewResponse, discographyResponse] = await Promise.all([
                    axios.get('https://spotify23.p.rapidapi.com/artist_overview/', {
                        params: { id },
                        headers: {
                            'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
                            'x-rapidapi-host': 'spotify23.p.rapidapi.com',
                        }
                    }),
                    axios.get('https://spotify23.p.rapidapi.com/artist_albums/', {
                        params: { id },
                        headers: {
                            'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
                            'x-rapidapi-host': 'spotify23.p.rapidapi.com',
                        }
                    })
                ]);

                localStorage.setItem(cacheKeyOverview, JSON.stringify(overviewResponse.data));
                localStorage.setItem(cacheKeyDiscography, JSON.stringify(discographyResponse.data));

                setData({
                    overview: overviewResponse.data,
                    discography: discographyResponse.data,
                });
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchArtistData();
    }, [id]);

    return { data, loading, error };
};

export default useFetchArtistDetails;
