import { useEffect, useState, memo } from 'react'
import './dashboard.scss';
import useFetchArtists from '../../useFetchArtist';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Spinner from '../spinner/Spinner';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const ids = '3TOqt5oJwL9BE2NG9MEwDa,3zhMQz4U8XeOPq1Nphrd6a,3RNrq3jvMZxD9ZyoOZbQOD,5eAWCfyUhZtHHtBdNk56l1,1MK0sGeyTNkbefYGj673e9,6e8ISIsI7UQZPyEorefAhK,4OAddazJM576euUnFSvXSL,6RZUqkomCmb8zCRqc9eznB,6wWVKhxIU2cEi0K81v7HvP,3qm84nBOXUEQ2vnTfUTTFC,7MqnCTCAX6SsIYYdJCQj9B,3ycxRkcZ67ALN3GQJ57Vig';
    const { data, loading, error } = useFetchArtists(ids);

    if (loading) return <div className="loading"><Spinner /></div>;
    if (error) return <p classname="error">Error fetching data: {error.message}</p>;

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Popular Artists</h1>
            <div className="dashboard-flex-container">
                {
                    data && data.artists && data.artists.map((artist) => (
                        <div key={artist.id} className="artists">
                            {data &&
                                <>
                                    <Link to={`/artist/${artist.id}`} state={{ artistName: `${artist.name}` }}>
                                        <LazyLoadImage
                                            effect="blur"
                                            src={artist.images[0]?.url}
                                            alt={artist.name}
                                            loading="lazy"
                                        />
                                    </Link>
                                    <h2 className="artist-name">{artist.name}</h2>
                                    <h2 className="type">{artist.type}</h2>
                                </>
                            }
                        </div>
                    ))}
            </div>
        </div>
    );
};
export default memo(Dashboard);
