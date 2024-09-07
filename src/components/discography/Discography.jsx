import './discography.scss';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Discography = ({ discography }) => {
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
                                    <LazyLoadImage effect="blur" width="100%" height="100%" src={coverArt.sources?.[0]?.url} alt={name} />
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
}

export default Discography
