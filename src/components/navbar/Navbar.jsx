import './navbar.scss'
import logo from '../../assets/spotify-logo.png';
import homeIcon from '../../assets/icons8-home-50.png';
import searchIcon from '../../assets/icons8-search-50.png';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const [input, setInput] = useState("");
    const [placeholder, setPlaceholder] = useState("What do you want to play?");

    const updatePlaceholder = () => {
        if (window.innerWidth <= 447) {
            setPlaceholder("Search...");
        } else {
            setPlaceholder("What do you want to play?");
        }
    };

    useEffect(() => {
        updatePlaceholder();

        window.addEventListener('resize', updatePlaceholder);

        return () => {
            window.removeEventListener('resize', updatePlaceholder);
        };
    }, []);
    const navigate = useNavigate();

    const handleInput = (e) => {
        setInput(e.target.value)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input) {
            navigate(`/search/${input}`)
        }
    };

    return (
        <nav className="nav">
            <div className="nav-left">
                <img effect="blur" src={logo} alt="spotify logo" width={30} height={30} />
                <Link to="/">
                    <h1>Spotify</h1>
                </Link>
            </div>
            <div className="nav-center">
                <Link to="/" aria-label="Navigate to home page">
                    <img src={homeIcon} style={{
                        border: "1px solid #e1dfdf",
                        borderRadius: "50%",
                        padding: ".5rem",
                        width: "35px",
                        cursor: "pointer"
                    }}
                        width={30}
                        height={35}
                        className="home-icon"
                        alt="home icon"
                    />
                </Link>
                <form onSubmit={handleSubmit}>
                    <img src={searchIcon} alt="search" width={20} height={20} />
                    <input type="search" placeholder={placeholder} onChange={handleInput} />
                </form>
            </div>
        </nav>
    )
}

export default Navbar
