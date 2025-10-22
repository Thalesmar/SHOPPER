import React, { useState, useContext } from 'react';
import { ShopContext } from '../../Context/ShopContextInstance';
import { useNavigate } from 'react-router-dom';
import './Search.css';

export const Search = () => {
    const { all_product } = useContext(ShopContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);

        if (term.length > 0) {
            const results = all_product.filter(product =>
                product.name.toLowerCase().includes(term) ||
                product.category.toLowerCase().includes(term)
            );
            setSearchResults(results.slice(0, 5)); // Show only first 5 results
            setShowResults(true);
        } else {
            setSearchResults([]);
            setShowResults(false);
        }
    };

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
        setSearchTerm('');
        setShowResults(false);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            // Navigate to a search results page or filter the current page
            navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
            setSearchTerm('');
            setShowResults(false);
        }
    };

    return (
        <div className="search-container">
            <form onSubmit={handleSearchSubmit} className="search-form">
                <div className="search-input-container">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="search-input"
                        onFocus={() => searchTerm.length > 0 && setShowResults(true)}
                        onBlur={() => setTimeout(() => setShowResults(false), 200)}
                    />
                    <button type="submit" className="search-button">
                        🔍
                    </button>
                </div>

                {showResults && searchResults.length > 0 && (
                    <div className="search-results">
                        {searchResults.map((product) => (
                            <div
                                key={product.id}
                                className="search-result-item"
                                onClick={() => handleProductClick(product.id)}
                            >
                                <img src={product.image} alt={product.name} className="search-result-image" />
                                <div className="search-result-info">
                                    <h4>{product.name}</h4>
                                    <p className="search-result-price">${product.new_price}</p>
                                </div>
                            </div>
                        ))}
                        {searchResults.length === 5 && (
                            <div className="search-more" onClick={handleSearchSubmit}>
                                View all results for "{searchTerm}"
                            </div>
                        )}
                    </div>
                )}
            </form>
        </div>
    );
};
