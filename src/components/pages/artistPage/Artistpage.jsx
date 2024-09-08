import './artistPage.scss'
import React, { Suspense, memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import Spinner from '../../spinner/Spinner'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import useFetchArtistDetails from '../../../useFetchArtistDetails'
import verifiedIcon from '../../../assets/icons8-verified-48.png';

const Discography = React.lazy(() => import('../../discography/Discography'));
const Playlist = React.lazy(() => import('../../playlist/Playlist'))
const Biography = React.lazy(() => import('../../biography/Biography'))

import { truncateText, stripHtmlTags } from '../../../utils'


const Artistpage = () => {
    const [trackIframesLoaded, setTrackIframesLoaded] = useState({});
    const { id } = useParams();
    const { data, loading, error } = useFetchArtistDetails(id);

    const { overview, discography } = data || {};
    const backgroundImage = overview?.data?.artist?.visuals?.headerImage?.sources[0]?.url;


    const [isImagePreloaded, setIsImagePreloaded] = useState(false);

    useEffect(() => {
        if (backgroundImage) {
            const img = new Image();
            img.src = backgroundImage;
            img.onload = () => setIsImagePreloaded(true);
        }
    }, [backgroundImage]);

    useEffect(() => {
        if (overview?.data?.artist?.discography?.topTracks?.items) {
            const tracks = overview.data.artist.discography.topTracks.items;
            tracks.forEach((track) => {
                const iframe = new Image();
                iframe.src = `https://open.spotify.com/embed/track/${track.track.id}`;
                iframe.onload = () => {
                    setTrackIframesLoaded((prevState) => ({
                        ...prevState,
                        [track.track.id]: true,
                    }));
                };
            });
        }
    }, [overview]);
    if (loading) return <div className="loading"><Spinner /></div>;
    if (error) return <p className="error">Error: {error.message}</p>;

    const biographyText = overview?.data?.artist?.profile?.biography?.text || '';
    const bgColor = overview?.data?.artist?.visuals?.headerImage?.extractedColors.colorRaw.hex;
    console.log({ bgColor })
    const truncatedBiography = truncateText(stripHtmlTags(biographyText), 900);
    const formatNumber = (number) => new Intl.NumberFormat().format(number);

    const monthlyNumber = overview?.data?.artist?.stats?.monthlyListeners;
    console.log({ overview })
    return (
        <div className="artist-details">
            <div className="artist-discography">
                <div className="artist-overview">
                    <div className="background-image"
                    >
                        {
                            isImagePreloaded ?
                                <LazyLoadImage
                                    effect="lazy"
                                    className="artist"
                                    src={backgroundImage}
                                    width="100%"
                                    height="100%"
                                    sizes="(max-width: 600px) 160px, (max-width: 900px) 320px, 640px"
                                    alt={overview.data.artist.profile.name}
                                />
                                :
                                <div className="artist" style={{ background: bgColor }}></div>
                        }
                        {
                            overview?.data?.artist?.profile?.verified === true &&
                            <>
                                {
                                    isImagePreloaded &&
                                    <div className="artist-title">

                                        <div className="verified">
                                            <img src={verifiedIcon} alt="verified" width={30} height={30} />
                                            <p>Verified artist</p>
                                        </div>
                                        <h3>{overview.data?.artist?.profile?.name}</h3>
                                        <h5 className="monthly">{formatNumber(monthlyNumber)} monthly listeners</h5>
                                    </div>
                                }
                            </>
                        }
                    </div>
                    <div className="playlist">
                        <h1 className="popular">Top Tracks</h1>
                        {
                            overview.data.artist.discography.topTracks.items.map((track, index) => {
                                const { name, } = track;
                                const trackId = track.track.id;
                                return <Suspense key={index}>
                                    <Playlist name={name} trackId={trackId} trackIframesLoaded={trackIframesLoaded} />
                                </Suspense>


                            })
                        }
                    </div>
                    <Suspense>
                        <Biography truncatedBiography={truncatedBiography} overview={overview} />
                    </Suspense>
                </div>
            </div >
            <div className="albums-wrapper">
                {/*   <Suspense fallback={<Spinner />}>
                    <Discography discography={discography} />
                </Suspense> */}
            </div>
        </div >
    )
}

export default memo(Artistpage);
