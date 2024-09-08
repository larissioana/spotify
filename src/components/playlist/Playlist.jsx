import { useState, useRef, useEffect } from 'react'

const Playlist = ({ trackId, name, trackIframesLoaded }) => {
    const [isInView, setIsInView] = useState(false);
    const iframeRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (iframeRef.current) {
            observer.observe(iframeRef.current);
        }

        return () => {
            if (iframeRef.current) {
                observer.unobserve(iframeRef.current);
            }
        };
    }, []);

    return (
        <div
            className="songs-container"
            style={{ height: '90px', width: '100%', overflow: "hidden" }}
            ref={iframeRef}
        >
            {trackIframesLoaded ?
                <iframe
                    src={`https://open.spotify.com/embed/track/${trackId}`}
                    width={"100 %"}
                    height={"100%"}
                    className="song"
                    allowFullScreen
                    scrolling="no"
                    title={name || "name of the song"}
                    allow="encrypted-media; picture-in-picture"
                    loading="lazy"
                    style={{
                        opacity: isInView ? 1 : 0,
                        transition: 'opacity 1s ease-in-out',
                        overflow: "hidden",
                        display: "block"
                    }}
                ></iframe>
                :
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        background: "rgba(0,0,0,.9)"
                    }}
                ></div>
            }
        </div>
    )
}

export default Playlist
