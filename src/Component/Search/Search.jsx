import React, { useState, useContext } from 'react';
import { ShopContext } from '../../Context/ShopContextInstance';
import { useNavigate } from 'react-router-dom';

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
        <div className="w-full max-w-2xl mx-auto my-8 px-4 relative z-20">
            <form onSubmit={handleSearchSubmit} className="relative">
                <div className="relative flex items-center">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full py-3 pl-5 pr-12 rounded-full border border-gray-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm text-gray-700"
                        onFocus={() => searchTerm.length > 0 && setShowResults(true)}
                        onBlur={() => setTimeout(() => setShowResults(false), 200)}
                    />
                    <button type="submit" className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>

                {showResults && searchResults.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-fade-in">
                        {searchResults.map((product) => (
                            <div
                                key={product.id}
                                className="flex items-center gap-4 p-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50 last:border-none"
                                onClick={() => handleProductClick(product.id)}
                            >
                                <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-md" />
                                <div className="flex-1">
                                    <h4 className="text-sm font-medium text-gray-800 truncate">{product.name}</h4>
                                    <p className="text-sm font-bold text-primary">${product.new_price}</p>
                                </div>
                            </div>
                        ))}
                        {searchResults.length === 5 && (
                            <div className="p-3 text-center text-sm text-primary font-medium hover:bg-gray-50 cursor-pointer transition-colors" onClick={handleSearchSubmit}>
                                View all results for "{searchTerm}"
                            </div>
                        )}
                    </div>
                )}
            </form>
        </div>
    );
};
