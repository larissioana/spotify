import { useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetchSearch from '../../../useFetchSearch';
import Spinner from '../../spinner/Spinner';
import Categories from '../../categories/Categories';
import './searchpage.scss';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const SearchPage = () => {
    const [selectedCategory, setSelectedCategory] = useState(() => {
        return localStorage.getItem('selectedCategory') || 'artists';
    });

    const { query } = useParams();
    const { loading, error, data } = useFetchSearch(query);
    if (loading) return <div className="loading"><Spinner /></div>;
    if (error) return <p classname="error">Error fetching data: {error.message}</p>;

    const filteredData = () => {
        if (!data) return [];
        switch (selectedCategory) {
            case 'albums':
                return data?.albums?.items || [];
            case 'artists':
                return data?.artists?.items || [];
            case 'podcasts':
                return data?.podcasts?.items || [];
            case 'playlists':
                return data?.playlists?.items || [];
            default:
                return null
        }
    };

    const renderResults = () => {
        const results = filteredData();
        return results.map((item, index) => {
            let spotifyUri = '';
            if (item?.data?.uri) {
                const [_, type, id] = item.data.uri.split(':');
                spotifyUri = `https://open.spotify.com/${type}/${id}`;
            }
            const imageUrl = item?.data?.visuals?.avatarImage?.sources[0]?.url || item?.data?.visuals?.avatarImage?.sources[1]?.url;
            switch (selectedCategory) {
                case 'albums':
                    return (
                        <div key={index} className="result-item">
                            {
                                item.data.coverArt.sources[0].url &&
                                <>
                                    <a href={spotifyUri} target="_blank" rel="noopener noreferrer">
                                        <div className="image-container">
                                            <LazyLoadImage effect={'blur'} src={item.data.coverArt.sources[0].url} alt={item.data.artists.items[0].profile.name} />
                                        </div>
                                    </a>
                                    <h4>{item.data.name}</h4>
                                    <div className="details-container">
                                        {item.data.date.year}  {item.data.artists.items[0].profile.name}
                                    </div>
                                </>
                            }
                        </div>
                    );
                case 'artists':
                    return (
                        <div key={index} className="result-item">
                            {
                                imageUrl &&
                                <a href={spotifyUri} target="_blank" rel="noopener noreferrer">
                                    <div className="image-container2">
                                        <LazyLoadImage effect="blur" width="100%" height="100%" src={imageUrl} />
                                    </div>
                                    <h4>{item.data.profile.name}</h4>
                                </a>
                            }
                        </div>
                    );
                case 'podcasts':
                    return (
                        <div key={index} className="result-item">
                            {
                                item?.data?.coverArt?.sources[1]?.url &&
                                <>
                                    <a href={spotifyUri} target="_blank" rel="noopener noreferrer">
                                        <div className="image-container">
                                            <LazyLoadImage effect="blur" width="100%" height="100%" src={item?.data?.coverArt?.sources[1]?.url} alt={item?.data?.publisher?.name} />
                                        </div>
                                    </a>
                                    <h4>{item?.data?.name.substring(0, 20) + "..."}</h4>
                                    <p>{item?.data?.publisher?.name.substring(0, 25) + "..."}</p>
                                </>
                            }
                        </div>
                    );
                case 'playlists':
                    return (
                        <div key={index} className="result-item">
                            {
                                item?.data?.images?.items[0]?.sources[0]?.url
                                &&
                                <>
                                    <a href={spotifyUri} target="_blank" rel="noopener noreferrer">
                                        <div className="image-container">

                                            <LazyLoadImage effect="blur" width="100%" height="100%" src={item?.data?.images?.items[0]?.sources[0]?.url} />
                                        </div>
                                    </a>
                                    {
                                        item?.data?.name &&
                                        <>
                                            <h4>{item?.data?.name.substring(0, 20) + "..."}</h4>
                                            <p>By {item.data?.owner?.name}</p>
                                        </>
                                    }
                                </>
                            }
                        </div>
                    );
                default:
                    return null;
            }
        });
    };

    return (
        <div className="searched-results-container">
            <Categories setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />
            <div className="search-results">
                {renderResults()}
            </div>
        </div>
    )
}

export default SearchPage
