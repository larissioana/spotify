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
            {isInView &&
                <iframe
                    src={`https://open.spotify.com/embed/track/${trackId}`}
                    width={"100 %"}
                    height={"100%"}
                    className="song"
                    allowFullScreen
                    title={name || "name of the song"}
                    loading="eager"
                    style={{
                        opacity: isInView ? 1 : 0,
                        transition: 'opacity 1s ease-in-out',
                    }}
                ></iframe>
            }
        </div>
    )
}

export default Playlist
