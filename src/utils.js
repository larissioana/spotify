
export const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
        return text;
    }
    return text.substring(0, maxLength) + '...';
};

export const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
};

export const preloadImage = (url) => {
    const img = new Image();
    img.src = url;
    img.onload = () => console.log(`Preloaded: ${url}`);
    img.onerror = () => console.error(`Failed to preload: ${url}`);
};

export const extractYearFromIsoString = (isoString) => {
    return isoString.substring(0, 4);
};

export const formatDuration = (totalMilliseconds) => {
    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
};
