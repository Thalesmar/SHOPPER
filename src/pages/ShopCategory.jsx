import React, { useContext, useState, useEffect, useRef } from 'react'
import { ShopContext } from '../Context/ShopContextInstance';
import dropdown_icon from '../Component/Assets/dropdown_icon.png'
import Item from '../Component/Item/Item';
import { gsap } from 'gsap';

export const ShopCategory = (props) => {
    const { all_product } = useContext(ShopContext);
    const [sortBy, setSortBy] = useState('default');
    const [showDropdown, setShowDropdown] = useState(false);
    const [visibleProducts, setVisibleProducts] = useState(16);
    const [isLoading, setIsLoading] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const dropdownRef = useRef(null);
    const productsRef = useRef(null);

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

    // Animate products when they change
    useEffect(() => {
        if (productsRef.current) {
            gsap.fromTo(productsRef.current.children,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.05 }
            );
        }
    }, [visibleProducts, props.category, sortBy]);

    // Filter products by category
    let categoryProducts = all_product.filter((item) => item.category === props.category);

    // Sort products based on selected option
    const sortProducts = (products, sortOption) => {
        const sortedProducts = [...products];

        switch (sortOption) {
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
        switch (sortBy) {
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
            <img className='block w-[82%] mx-auto my-8 rounded-2xl shadow-md' src={props.banner} alt="" />
            <div className="flex flex-col md:flex-row justify-between items-center mx-4 md:mx-40 my-5 gap-4">
                <p className="font-semibold text-gray-700">
                    <span className="font-bold text-black">Showing 1-{displayedProducts.length}</span> out of {categoryProducts.length} products
                </p>
                <div className="relative" ref={dropdownRef}>
                    <div
                        className="flex items-center justify-between px-5 py-2.5 rounded-full border border-[#888] cursor-pointer hover:bg-gray-50 transition-colors min-w-[180px]"
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        <span className="text-sm font-medium text-gray-700">{getSortDisplayText()}</span>
                        <img src={dropdown_icon} alt="" className="w-3 h-3 ml-2 opacity-60" />
                    </div>
                    {showDropdown && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-fade-in">
                            <div
                                className={`px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors ${sortBy === 'default' ? 'bg-gray-50 font-semibold text-primary' : ''}`}
                                onClick={() => handleSortChange('default')}
                            >
                                Default
                            </div>
                            <div
                                className={`px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors ${sortBy === 'price-low-high' ? 'bg-gray-50 font-semibold text-primary' : ''}`}
                                onClick={() => handleSortChange('price-low-high')}
                            >
                                Price: Low to High
                            </div>
                            <div
                                className={`px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors ${sortBy === 'price-high-low' ? 'bg-gray-50 font-semibold text-primary' : ''}`}
                                onClick={() => handleSortChange('price-high-low')}
                            >
                                Price: High to Low
                            </div>
                            <div
                                className={`px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors ${sortBy === 'name-a-z' ? 'bg-gray-50 font-semibold text-primary' : ''}`}
                                onClick={() => handleSortChange('name-a-z')}
                            >
                                Name: A to Z
                            </div>
                            <div
                                className={`px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors ${sortBy === 'name-z-a' ? 'bg-gray-50 font-semibold text-primary' : ''}`}
                                onClick={() => handleSortChange('name-z-a')}
                            >
                                Name: Z to A
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div ref={productsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mx-4 md:mx-40 my-5 shopcategory-products">
                {displayedProducts.map((item, i) => {
                    return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                })}
            </div>
            {(hasMoreProducts || canShowAll) && (
                <div className="flex justify-center items-center gap-4 my-24 mx-auto">
                    {hasMoreProducts && (
                        <div
                            className={`flex justify-center items-center w-60 h-14 rounded-full bg-[#ededed] text-[#787878] text-lg font-medium cursor-pointer hover:bg-gray-200 transition-all active:scale-95 ${isLoading ? 'opacity-70 cursor-wait' : ''}`}
                            onClick={handleLoadMore}
                        >
                            {isLoading ? (
                                <>
                                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600 mr-2"></span>
                                    Loading more...
                                </>
                            ) : (
                                `Show ${Math.min(16, categoryProducts.length - visibleProducts)} more products`
                            )}
                        </div>
                    )}

                    {canShowAll && (
                        <div
                            className={`flex justify-center items-center w-60 h-14 rounded-full bg-black text-white text-lg font-medium cursor-pointer hover:bg-gray-800 transition-all active:scale-95 ${isLoading ? 'opacity-70 cursor-wait' : ''}`}
                            onClick={handleShowAll}
                        >
                            {isLoading ? (
                                <>
                                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>
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
