import React from 'react'
import useFetchAlbumTracks from '../../useFetchAlbumTracks'
import { useParams } from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import './albumTracks.scss';
import { extractYearFromIsoString } from '../../utils';
import AlbumSongs from '../albumSongs/AlbumSongs';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Helmet } from 'react-helmet-async';

const AlbumsTracks = () => {
    const { id } = useParams();
    const { loading, error, data } = useFetchAlbumTracks(id);

    if (loading) return <div className="loading"><Spinner /></div>;
    if (error) return <p className="error">Error: {error.message}</p>;

    const cover = data?.data?.album?.coverArt?.sources?.[0]?.url;
    const bg = data?.data?.album?.coverArt?.extractedColors?.colorRaw?.hex;
    const releaseDate = data?.data?.album?.date?.isoString || 'Unknown Release Date';
    const year = releaseDate !== 'Unknown Release Date' ? extractYearFromIsoString(releaseDate) : null;
    const name = data?.data?.album?.artists?.items[0]?.profile?.name;

    return (
        <div className="album-metadata-container" >
            <Helmet>
                <title>{`${name || ''} - ${data?.data?.album?.name || ''}`}</title>
            </Helmet>
            {
                data &&
                <>
                    {
                        data?.data?.album?.artists?.items.map((item, index) => {
                            return <div className="album-flex" key={index} style={{
                                background: bg,
                                color: bg === "#F0F0F0" ? "black" : "inherit"
                            }}>
                                <div className="image-container">
                                    {
                                        cover &&
                                        <LazyLoadImage effect="blur" src={cover} alt={item.profile.name} loading="lazy" width={"100%"} height={"100%"} />
                                    }
                                </div>
                                <div className="album-details-flex-container">
                                    {
                                        data.data.album.type &&
                                        <p className="type">{data.data.album.type}</p>
                                    }
                                    {data.data.album.name &&
                                        <h2 className="album-name">{data.data.album.name}</h2>
                                    }
                                    <ul className="album-more-details">
                                        {
                                            item.profile.name &&

                                            <li className="artist-name">{item.profile.name}</li>
                                        }
                                        {
                                            year &&
                                            <li className="year"> {year}</li>
                                        }
                                        {data.data.album.tracks.totalCount &&
                                            <li className="totalTracks"> {data.data.album.tracks.totalCount} songs </li>
                                        }
                                    </ul>
                                </div>
                            </div>

                        })
                    }
                </>
            }
            <div className="songs-container">
                <AlbumSongs />
            </div>
        </div>
    )
}

export default AlbumsTracks
