import { useEffect, useState, memo, useCallback } from 'react'
import './dashboard.scss';
import useFetchArtists from '../../useFetchArtist';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Spinner from '../spinner/Spinner';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const ids = '3TOqt5oJwL9BE2NG9MEwDa,3zhMQz4U8XeOPq1Nphrd6a,2ye2Wgw4gimLv2eAKyk1NB,5eAWCfyUhZtHHtBdNk56l1,2yEwvVSSSUkcLeSTNyHKh8,05fG473iIaoy82BF1aGhL8,36QJpDe2go2KgaRleHCDTp,1MK0sGeyTNkbefYGj673e9,4OAddazJM576euUnFSvXSL,6olE6TJLqED3rqDCT0FyPh,3RNrq3jvMZxD9ZyoOZbQOD,6e8ISIsI7UQZPyEorefAhK,6RZUqkomCmb8zCRqc9eznB,6wWVKhxIU2cEi0K81v7HvP,3qm84nBOXUEQ2vnTfUTTFC';
    const { data, loading, error } = useFetchArtists(ids);
    const [loadedImages, setLoadedImages] = useState(new Set());

    const handleImageLoad = useCallback((id) => {
        setLoadedImages(prev => new Set(prev).add(id));
    }, []);

    useEffect(() => {
        if (data && data.artists) {
            const head = document.head;
            data.artists.forEach((artist) => {
                const largeImage = artist?.images.find(image => image.width === 640)?.url || artist?.images.find(image => image.width === 600)?.url;
                if (largeImage) {
                    const link = document.createElement('link');
                    link.rel = 'preload';
                    link.href = largeImage;
                    link.as = 'image';
                    head.appendChild(link);
                }
            });
        }
    }, [data]);

    if (loading) return <div className="loading"><Spinner /></div>;
    if (error) return <p classname="error">Error fetching data: {error.message}</p>;

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Popular Artists</h1>
            <div className="dashboard-flex-container">
                {
                    data && data.artists && data.artists.map((artist) => {
                        const largeImage = artist?.images.find(image => image.width === 640)?.url || artist?.images.find(image => image.width === 600)?.url;

                        return <div key={artist.id} className="artists">
                            {data &&
                                <>
                                    <div className="image-placeholder" style={{
                                        width: "100%",
                                        maxWidth: "640px",
                                        aspectRatio: "1 / 1",
                                        backgroundColor: "transparent",
                                        position: 'relative',
                                        height: 'auto',
                                        minHeight: '200px',
                                    }}>
                                        <Link to={`/artist/${artist.id}`} aria-label={`Navigate to ${artist.name} page`} state={{ artistName: `${artist.name}` }}>
                                            <picture>
                                                <LazyLoadImage
                                                    effect="blur"
                                                    src={largeImage}
                                                    sizes="(max-width: 600px) 160px, (max-width: 900px) 320px, 640px"
                                                    alt={artist.name}
                                                    width="100%"
                                                    height="100%"
                                                    onLoad={() => handleImageLoad(artist.id)}
                                                    style={{
                                                        zIndex: 2,
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        objectFit: 'cover',
                                                        opacity: loadedImages ? 1 : 0,
                                                        transition: 'opacity 0.3s ease',
                                                    }}
                                                />
                                            </picture>
                                        </Link>
                                    </div>
                                    <h2 className="artist-name">{artist.name}</h2>
                                    <h2 className="type">{artist.type}</h2>
                                </>
                            }
                        </div>
                    })}
            </div>
        </div>
    );
};
export default memo(Dashboard);
