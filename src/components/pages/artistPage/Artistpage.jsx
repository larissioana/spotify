import './artistPage.scss'
import { useParams } from 'react-router-dom'
import Spinner from '../../spinner/Spinner'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import useFetchArtistDetails from '../../../useFetchArtistDetails'
import verifiedIcon from '../../../assets/icons8-verified-48.png';
import Discography from '../../discography/Discography'
import { truncateText, stripHtmlTags } from '../../../utils'

const Artistpage = () => {
    const { id } = useParams();
    const { data, loading, error } = useFetchArtistDetails(id);

    const { overview, discography } = data || {};
    const backgroundImage = overview?.data?.artist?.visuals?.headerImage?.sources[0]?.url;


    if (loading) return <div className="loading"><Spinner /></div>;
    if (error) return <p className="error">Error: {error.message}</p>;

    const biographyText = overview?.data?.artist?.profile?.biography?.text || '';
    const truncatedBiography = truncateText(stripHtmlTags(biographyText), 900);
    const formatNumber = (number) => new Intl.NumberFormat().format(number);

    const monthlyNumber = overview?.data?.artist?.stats?.monthlyListeners;
    return (
        <div className="artist-details">
            <div className="artist-discography">
                <div className="artist-overview">
                    <div
                        className="background-image"
                        style={{ backgroundImage: `url(${backgroundImage})` }}
                    >
                        {
                            overview?.data?.artist?.profile?.verified === true &&
                            <>
                                <div className="verified">
                                    <img src={verifiedIcon} alt="verified" />
                                    <p>Verified artist</p>
                                </div>
                                <h3>{overview.data?.artist?.profile?.name}</h3>
                                <h5 className="monthly">{formatNumber(monthlyNumber)} monthly listeners</h5>
                            </>
                        }
                    </div>

                    <div className="playlist">
                        <h1 className="popular">Popular</h1>
                        {
                            overview.data.artist.discography.topTracks.items.map((track, index) => {
                                const { name, } = track;
                                const trackId = track.track.id;
                                return <div key={index} className="songs-container">
                                    <iframe
                                        src={`https://open.spotify.com/embed/track/${trackId}`}
                                        width="300"
                                        height="90"
                                        className="song"
                                        allow="encrypted-media; picture-in-picture"
                                        allowFullScreen
                                        title={name}
                                        loading="eager"
                                    ></iframe>
                                </div>
                            })
                        }
                    </div>
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
                </div>
            </div >
            <div className="albums-wrapper">
                <Discography discography={discography} />
            </div>
        </div >
    )
}

export default Artistpage
