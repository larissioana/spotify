import './discography.scss';
import { memo } from 'react';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

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
                                <motion.div
                                    key={id}
                                    className="album-item"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                >
                                    <LazyLoadImage effect="blur" threshold={200} width="100%" height="100%" src={coverArt.sources?.[0]?.url} alt={name} />
                                    <h3>{name}</h3>
                                    <p><span>Released: </span>{date.year || 'Unknown Year'}</p>
                                    <p>Tracks: {tracks?.totalCount || 'Unknown'}</p>
                                </motion.div>
                            );
                        });
                    })
                }
            </div>
        </div>
    )

})

export default Discography
