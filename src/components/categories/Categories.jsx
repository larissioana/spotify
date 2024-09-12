import './categories.scss';
import { useEffect } from 'react';

const Categories = ({ setSelectedCategory, selectedCategory }) => {
    const categories = ["albums", "artists", "podcasts", "playlists"];

    const handleSelectedCategory = (category) => {
        setSelectedCategory(category);
    };

    useEffect(() => {
        localStorage.setItem('selectedCategory', selectedCategory);
    }, [selectedCategory]);

    return (
        <div className="categories-container">
            {
                categories.map((category, index) => {
                    return <button
                        style={{
                            background: category === selectedCategory ? "#fff" : "#2d2d2d",
                            color: category === selectedCategory ? "#1e1e1e" : "#eae7e7",
                        }}
                        key={index}
                        onClick={() => handleSelectedCategory(category)}
                    >
                        {category}
                    </button>
                })
            }
        </div>
    )
};

export default Categories;
