import { useEffect, useState, memo, useCallback } from 'react'
import './dashboard.scss';
import useFetchArtists from '../../useFetchArtist';
import Card from '../card/Card';
import Spinner from '../spinner/Spinner';

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
                        return <Card largeImage={largeImage} handleImageLoad={handleImageLoad} artist={artist} data={data} key={artist.id} loadedImages={loadedImages} />
                    })}
            </div>
        </div>
    );
};
export default memo(Dashboard);
