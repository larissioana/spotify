import React from 'react'
import useFetchAlbumTracks from '../../useFetchAlbumTracks'
import { useParams } from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import './albumTracks.scss';
import { extractYearFromIsoString } from '../../utils';
import AlbumSongs from '../albumSongs/AlbumSongs';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const AlbumsTracks = () => {
    const { id } = useParams();
    const { loading, error, data } = useFetchAlbumTracks(id);

    if (loading) return <div className="loading"><Spinner /></div>;
    if (error) return <p className="error">Error: {error.message}</p>;

    const cover = data.data.album.coverArt.sources[0].url;
    const bg = data.data.album.coverArt.extractedColors.colorRaw.hex;
    const releaseDate = data.data.album.date.isoString;
    const year = extractYearFromIsoString(releaseDate);

    return (
        <div className="album-metadata-container" >
            {
                data?.data?.album?.artists?.items.map((item, index) => {
                    return <div className="album-flex" key={index} style={{
                        background: bg,
                        color: bg === "#F0F0F0" ? "black" : "inherit"
                    }}>
                        <div className="image-container">
                            <LazyLoadImage effect="blur" src={cover} alt={item.profile.name} width={"100%"} height={"100%"} />
                        </div>
                        <div className="album-details-flex-container">
                            <p className="type">{data.data.album.type}</p>
                            <h2 className="album-name">{data.data.album.name}</h2>
                            <ul className="album-more-details">
                                <li className="artist-name">{item.profile.name}</li>
                                <li className="year"> {year}</li>
                                <li className="totalTracks"> {data.data.album.tracks.totalCount} songs </li>
                            </ul>
                        </div>
                    </div>

                })
            }
            <div className="songs-container">
                <AlbumSongs />
            </div>
        </div>
    )
}

export default AlbumsTracks
