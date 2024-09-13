import React, { Suspense, useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetchSearch from '../../../useFetchSearch';
import Spinner from '../../spinner/Spinner';
import Categories from '../../categories/Categories';
import './searchpage.scss';
const SearchedResultsCard = React.lazy(() => import('../../searchedResultsCard/SearchedResultsCard'))

const SearchPage = () => {
    const [selectedCategory, setSelectedCategory] = useState(() => {
        return localStorage.getItem('selectedCategory') || 'all';
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
            case 'all':
                return {
                    albums: data?.albums?.items.slice(0, 5) || [],
                    artists: data?.artists?.items.slice(0, 5) || [],
                    podcasts: data?.podcasts?.items.slice(0, 5) || [],
                    playlists: data?.playlists?.items.slice(0, 5) || [],
                    topResults: data?.topResults?.items.slice(0, 3) || [],
                    topResultsFeatured: data?.topResults?.featured || []
                };
            default:
                return null
        }
    };

    const renderResults = () => {
        const results = filteredData();

        if (selectedCategory === "all") {
            return (
                <div className="results-wrapper">
                    <div className="category-wrapper">
                        <h3>Top Results</h3>
                        <div className="featured">
                            {results.topResultsFeatured.map((item, index) => {
                                return <div key={index} className="featured-image">
                                    <img width="100%" height="100%" className="featured-img" alt={"result"} src={item?.data?.images?.items[0]?.sources[0]?.url} />
                                </div>
                            }).slice(0, 1)}

                            <div className="playlist">
                                {results.topResults.map((item, index) => {
                                    const trackId = item.data.uri.split(':')[2];
                                    const embedUrl = `https://open.spotify.com/embed/track/${trackId}`;
                                    return <div key={index} className="result-playlist">
                                        <iframe
                                            src={embedUrl}
                                            width="300"
                                            height="380"
                                            frameBorder="0"
                                            style={{
                                                background: "none"
                                            }}
                                            allowtransparency="true"
                                            allow="encrypted-media">
                                        </iframe>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="category-wrapper">
                        <h3>Albums</h3>
                        <div className="result-items">
                            {results.albums.map((item, index) => {
                                return <div key={index}>
                                    {item.data.coverArt.sources[0].url &&
                                        <div className="result-item">
                                            <SearchedResultsCard
                                                image={item.data.coverArt.sources[0].url}
                                                title={item.data.name}
                                                url={item.data.uri ? `https://open.spotify.com/${item.data.uri.split(':')[1]}/${item.data.uri.split(':')[2]}` : ''}
                                                subTitle={item.data.artists.items[0].profile.name}
                                                year={item.data.date.year}
                                                borderRadius={false}
                                            />
                                        </div>
                                    }
                                </div>
                            })}
                        </div>
                    </div>
                    <div className="category-wrapper">
                        <h3>Artists</h3>
                        <div className="result-items">
                            {results.artists.map((item, index) => {
                                return <div key={index}>
                                    {
                                        item.data.visuals?.avatarImage?.sources[0]?.url &&
                                        <div className="result-item">
                                            <SearchedResultsCard
                                                image={item.data.visuals?.avatarImage?.sources[0]?.url}
                                                title={item.data.profile.name}
                                                url={item.data.uri ? `https://open.spotify.com/${item.data.uri.split(':')[1]}/${item.data.uri.split(':')[2]}` : ''}
                                                borderRadius={true}
                                            />
                                        </div>
                                    }
                                </div>
                            })}
                        </div>
                    </div>

                    <div className="category-wrapper">
                        <h3>Podcasts</h3>
                        <div className="result-items">
                            {results.podcasts.map((item, index) => (
                                <div key={index} className="result-item">
                                    <SearchedResultsCard
                                        image={item?.data?.coverArt?.sources[1]?.url}
                                        title={item?.data?.name.substring(0, 20) + "..."}
                                        subTitle={item?.data?.publisher?.name.substring(0, 25) + "..."}
                                        url={item?.data?.uri ? `https://open.spotify.com/${item.data.uri.split(':')[1]}/${item.data.uri.split(':')[2]}` : ''}
                                        borderRadius={false}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="category-wrapper">
                        <h3>Playlists</h3>
                        <div className="result-items">
                            {results.playlists.map((item, index) => (
                                <div key={index} className="result-item">
                                    <SearchedResultsCard
                                        image={item?.data?.images?.items[0]?.sources[0]?.url}
                                        title={item?.data?.name}
                                        subTitle={`By ${item.data?.owner?.name}`}
                                        url={item?.data?.uri ? `https://open.spotify.com/${item.data.uri.split(':')[1]}/${item.data.uri.split(':')[2]}` : ''}
                                        borderRadius={false}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );
        }
        else {
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
                            <>
                                {
                                    item.data.coverArt.sources[0].url &&
                                    <div key={index} className="result-item">
                                        <Suspense>
                                            <SearchedResultsCard
                                                image={item.data.coverArt.sources[0].url} alt={item.data.artists.items[0].profile.name}
                                                title={item.data.name}
                                                url={spotifyUri}
                                                subTitle={item.data.artists.items[0].profile.name}
                                                year={item.data.date.year}
                                                borderRadius={false}
                                            />
                                        </Suspense>
                                    </div>
                                }
                            </>
                        );
                    case 'artists':
                        return (
                            <>
                                {
                                    imageUrl &&
                                    <div key={index} className="result-item">
                                        <Suspense>
                                            <SearchedResultsCard
                                                image={imageUrl}
                                                title={item.data.profile.name}
                                                url={spotifyUri}
                                                borderRadius={true}
                                            />
                                        </Suspense>
                                    </div>
                                }
                            </>
                        );
                    case 'podcasts':
                        return (
                            <>
                                {
                                    item?.data?.coverArt?.sources[1]?.url &&
                                    <div key={index} className="result-item">
                                        <Suspense>
                                            <SearchedResultsCard
                                                url={spotifyUri}
                                                image={item?.data?.coverArt?.sources[1]?.url} alt={item?.data?.publisher?.name}
                                                title={item?.data?.name}
                                                subTitle={item?.data?.publisher?.name}
                                                borderRadius={false}
                                            />
                                        </Suspense>
                                    </div>
                                }
                            </>
                        );
                    case 'playlists':
                        return (
                            <>
                                {
                                    item?.data?.images?.items[0]?.sources[0]?.url &&
                                    <div key={index} className="result-item">
                                        <Suspense>
                                            <SearchedResultsCard
                                                url={spotifyUri}
                                                image={item?.data?.images?.items[0]?.sources[0]?.url}
                                                title={item?.data?.name}
                                                subTitle={item.data?.owner?.name}
                                                borderRadius={false}
                                            />
                                        </Suspense>
                                    </div>
                                }
                            </>
                        );
                    default:
                        return null;
                }

            });
        }
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
