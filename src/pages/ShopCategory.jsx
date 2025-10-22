import React, { useContext, useState, useEffect, useRef } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContextInstance';
import dropdown_icon from '../Component/Assets/dropdown_icon.png'
import Item from '../Component/Item/Item';

export const ShopCategory = (props) => {
    const {all_product} = useContext(ShopContext);
    const [sortBy, setSortBy] = useState('default');
    const [showDropdown, setShowDropdown] = useState(false);
    const [visibleProducts, setVisibleProducts] = useState(16); // Show 16 products initially
    const [isLoading, setIsLoading] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Filter products by category
    let categoryProducts = all_product.filter((item) => item.category === props.category);

    // Sort products based on selected option
    const sortProducts = (products, sortOption) => {
        const sortedProducts = [...products];

        switch(sortOption) {
            case 'price-low-high':
                return sortedProducts.sort((a, b) => a.new_price - b.new_price);
            case 'price-high-low':
                return sortedProducts.sort((a, b) => b.new_price - a.new_price);
            case 'name-a-z':
                return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            case 'name-z-a':
                return sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
            case 'default':
            default:
                return sortedProducts.sort((a, b) => a.id - b.id);
        }
    };

    categoryProducts = sortProducts(categoryProducts, sortBy);

    // Reset visible products when sorting changes
    useEffect(() => {
        setVisibleProducts(16);
        setShowAll(false);
    }, [sortBy]);

    const handleSortChange = (option) => {
        setSortBy(option);
        setShowDropdown(false);
    };

    const handleLoadMore = () => {
        setIsLoading(true);

        // Simulate loading delay for better UX
        setTimeout(() => {
            setVisibleProducts(prev => Math.min(prev + 16, categoryProducts.length));
            setIsLoading(false);

            // Smooth scroll to newly loaded products
            setTimeout(() => {
                const productsContainer = document.querySelector('.shopcategory-products');
                if (productsContainer) {
                    productsContainer.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 100);
        }, 500);
    };

    const handleShowAll = () => {
        setIsLoading(true);

        setTimeout(() => {
            setShowAll(true);
            setVisibleProducts(categoryProducts.length);
            setIsLoading(false);
        }, 500);
    };

    const displayedProducts = showAll ? categoryProducts : categoryProducts.slice(0, visibleProducts);
    const hasMoreProducts = !showAll && visibleProducts < categoryProducts.length;
    const canShowAll = !showAll && categoryProducts.length > 16;

    const getSortDisplayText = () => {
        switch(sortBy) {
            case 'price-low-high':
                return 'Price: Low to High';
            case 'price-high-low':
                return 'Price: High to Low';
            case 'name-a-z':
                return 'Name: A to Z';
            case 'name-z-a':
                return 'Name: Z to A';
            case 'default':
            default:
                return 'Default';
        }
    };

  return (
    <div className='shop-category'>
        <img className='shopcategory-banner' src={props.banner} alt="" />
        <div className="shopcategory-indexSort">
            <p>
                <span>Showing 1-{displayedProducts.length}</span> out of {categoryProducts.length} products
            </p>
            <div className="shopcategory-sort-container" ref={dropdownRef}>
                <div
                    className="shopcategory-sort"
                    onClick={() => setShowDropdown(!showDropdown)}
                >
                    {getSortDisplayText()} <img src={dropdown_icon} alt="" />
                </div>
                {showDropdown && (
                    <div className="shopcategory-sort-dropdown">
                        <div
                            className={`sort-option ${sortBy === 'default' ? 'active' : ''}`}
                            onClick={() => handleSortChange('default')}
                        >
                            Default
                        </div>
                        <div
                            className={`sort-option ${sortBy === 'price-low-high' ? 'active' : ''}`}
                            onClick={() => handleSortChange('price-low-high')}
                        >
                            Price: Low to High
                        </div>
                        <div
                            className={`sort-option ${sortBy === 'price-high-low' ? 'active' : ''}`}
                            onClick={() => handleSortChange('price-high-low')}
                        >
                            Price: High to Low
                        </div>
                        <div
                            className={`sort-option ${sortBy === 'name-a-z' ? 'active' : ''}`}
                            onClick={() => handleSortChange('name-a-z')}
                        >
                            Name: A to Z
                        </div>
                        <div
                            className={`sort-option ${sortBy === 'name-z-a' ? 'active' : ''}`}
                            onClick={() => handleSortChange('name-z-a')}
                        >
                            Name: Z to A
                        </div>
                    </div>
                )}
            </div>
        </div>
        <div className="shopcategory-products">
            {displayedProducts.map((item, i) => {
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            })}
        </div>
        {(hasMoreProducts || canShowAll) && (
            <div className="shopcategory-loadmore-container">
                {hasMoreProducts && (
                    <div
                        className={`shopcategory-loadmore ${isLoading ? 'loading' : ''}`}
                        onClick={handleLoadMore}
                    >
                        {isLoading ? (
                            <>
                                <span className="loading-spinner"></span>
                                Loading more...
                            </>
                        ) : (
                            `Show ${Math.min(16, categoryProducts.length - visibleProducts)} more products`
                        )}
                    </div>
                )}

                {canShowAll && (
                    <div
                        className={`shopcategory-showall ${isLoading ? 'loading' : ''}`}
                        onClick={handleShowAll}
                    >
                        {isLoading ? (
                            <>
                                <span className="loading-spinner"></span>
                                Loading all...
                            </>
                        ) : (
                            `Show all ${categoryProducts.length} products`
                        )}
                    </div>
                )}
            </div>
        )}
    </div>
  )
}
