import './navbar.scss'
import logo from '../../assets/spotify-logo.png';
import homeIcon from '../../assets/icons8-home-50.png';
import searchIcon from '../../assets/icons8-search-50.png';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from 'react-router-dom';

const Navbar = () => {

    return (
        <nav className="nav">
            <div className="nav-left">
                <LazyLoadImage effect="blur" src={logo} alt="spotify logo" width={30} height={30} size={30} />
                <Link to="/">
                    <h1>Spotify</h1>
                </Link>
            </div>
            <div className="nav-center">
                <Link to="/" aria-label="Navigate to home page">
                    <LazyLoadImage effect="blur" src={homeIcon} style={{
                        border: "1px solid #e1dfdf",
                        borderRadius: "50%",
                        padding: ".5rem",
                        width: "35px",
                        cursor: "pointer"
                    }}
                        width={30}
                        height={35}
                        alt="home icon"
                    />
                </Link>
                <form>
                    <LazyLoadImage effect="blur" src={searchIcon}
                        alt="search" width={20} height={20} />
                    <input type="search" placeholder='What do you want to play?' />
                </form>
            </div>
        </nav>
    )
}

export default Navbar
