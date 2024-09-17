import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useState } from 'react';

const SearchedResultsCard = ({ image, title, subTitle, year, url, borderRadius }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    const handleLoad = () => {
        setIsLoaded(true);
    };
    return (
        <>
            <a href={url} target="_blank" rel="noopener noreferrer" aria-label="open in spotify">
                <div className="image-container">
                    <LazyLoadImage effect={'blur'} src={image} alt={title} width="100%" height="100%" loading="lazy" style={{
                        clipPath: borderRadius ? "circle()" : "none"
                    }} />
                </div>
            </a>
            {
                title &&
                <h4>{title.substring(0, 20) + "..."}</h4>
            }
            {
                (year || subTitle) && (
                    <p className="details-container">
                        {year && <span>{year}</span>}
                        {year && subTitle && ' '}
                        {subTitle && <span>{`${subTitle.substring(0, 20) + "..."}`}</span>}
                    </p>
                )
            }
        </>
    )
}

export default SearchedResultsCard
