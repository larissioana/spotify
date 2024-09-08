import { encode } from 'blurhash';

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

export async function generateBlurhash(imageUrl) {
    try {
        const response = await fetch(imageUrl);
        if (!response.ok) throw new Error('Failed to fetch image');

        const blob = await response.blob();
        const imageBitmap = await createImageBitmap(blob);

        const canvas = document.createElement('canvas');
        canvas.width = imageBitmap.width;
        canvas.height = imageBitmap.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(imageBitmap, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const blurhash = encode(imageData.data, imageData.width, imageData.height, 4, 4);

        if (blurhash.length < 6) {
            throw new Error('Generated Blurhash is too short.');
        }

        return blurhash;
    } catch (error) {
        console.error('Error generating Blurhash:', error);
        throw error;
    }
}


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

