import './albumSongs.scss';
import useFetchSongs from '../../useFetchSongs';
import { useParams } from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import { formatDuration } from '../../utils';

const AlbumSongs = () => {
    const { id } = useParams();
    const { loading, error, data } = useFetchSongs(id);
    if (loading) return <div className="loading"><Spinner /></div>;
    if (error) return <p className="error">Error: {error.message}</p>;
    const numbers = document.querySelectorAll('.number');
    numbers.forEach((num, index) => {
        num.textContent = (index + 1).toString().padStart(2, '0');
    });

    return (
        <div className="album-songs-wrapper">
            {
                data.data.album.tracks.items.map((item, index) => {
                    return <div key={index}>
                        <div className="songs-flex-container">
                            <p className="number">{index}</p>
                            <p>{item.track.name}</p>
                            <p>{formatDuration(item.track.duration.totalMilliseconds)}</p>
                        </div>
                    </div>
                })
            }
        </div>
    )
}

export default AlbumSongs
