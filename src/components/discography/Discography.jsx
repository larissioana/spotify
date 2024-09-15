import './discography.scss';
import { memo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from 'react-router-dom';

const preloadImage = (url) => {
    const img = new Image();
    img.src = url;
};

const Discography = memo(({ discography }) => {
    const firstFewAlbums = discography?.data?.artist?.discography?.albums?.items?.slice(0, 5);
    firstFewAlbums.forEach(album => {
        album.releases.items.forEach(release => {
            const imageUrl = release.coverArt.sources?.[0]?.url;
            if (imageUrl) preloadImage(imageUrl);
        });
    });
    return (
        <div className="albums">
            <h1>Albums</h1>
            <div className="albums-flex-container">
                {
                    discography?.data?.artist?.discography?.albums?.items?.map((album, index) => {
                        return album.releases.items.map((release) => {
                            const { id, name, coverArt, date, tracks } = release;
                            return (
                                <div
                                    key={id}
                                    className="album-item"
                                >
                                    <div className="album-wrapper">
                                        <Link to={`/album/${id}`} aria-label="Album tracks">
                                            <LazyLoadImage effect="blur" width="100%" height="100%" src={coverArt.sources?.[0]?.url} alt={name} loading="lazy" />
                                        </Link>
                                    </div>
                                    <h3>{name}</h3>
                                    <p><span>Released: </span>{date.year || 'Unknown Year'}</p>
                                    <p>Tracks: {tracks?.totalCount || 'Unknown'}</p>
                                </div>
                            );
                        });
                    })
                }
            </div>
        </div>
    )

})

export default Discography
