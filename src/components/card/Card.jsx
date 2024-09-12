import { Link } from "react-router-dom"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Card = ({ data, largeImage, loadedImages, artist, handleImageLoad }) => {
    return (
        <div className="artists">
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
                </>
            }
        </div>
    )
}

export default Card
