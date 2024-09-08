import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Biography = ({ truncatedBiography, overview }) => {
    return (
        <div className="biography-container">
            <h1>About</h1>
            <p className="biography">
                {truncatedBiography}
            </p>
            <div className="images">
                {
                    overview?.data?.artist?.visuals?.avatarImage?.sources.map((source, index) => {
                        return <div key={index}>
                            <LazyLoadImage effect="blur" src={source.url} alt="gallery" loading="lazy" />
                        </div>
                    }).slice(0, 1)
                }
            </div>
        </div>
    )
}

export default Biography
