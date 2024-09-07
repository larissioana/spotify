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
