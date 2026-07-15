import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import SkeletonLoader from '../components/SkeletonLoader';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Filtering & Sorting States ---
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Fetching 30 items this time to make sorting and filtering fun!
        const response = await fetch('https://dummyjson.com/products?limit=30');
        if (!response.ok) {
          throw new Error('Something went wrong while fetching products.');
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // --- Extract Unique Categories for the Filter Tabs ---
  // This avoids hardcoding categories and shows great engineering practice!
  const categories = ['all', ...new Set(products.map((p) => p.category))];

  // --- The Core Processing Engine ---
  // Filter and sort items dynamically on every single render pass
  const getProcessedProducts = () => {
    let result = [...products];

    // 1. Apply Search Query
    if (searchQuery.trim() !== '') {
      result = result.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 2. Apply Category Selection
    if (selectedCategory !== 'all') {
      result = result.filter((product) => product.category === selectedCategory);
    }

    // 3. Apply Sorting Logic
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  };

  const processedProducts = getProcessedProducts();

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        <p className="text-lg font-semibold">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Header section */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Our Collection</h1>
        <p className="text-gray-500">Find exactly what you are looking for.</p>
      </div>

      {/* --- CONTROL BAR (Search & Sort) --- */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition"
          />
        </div>

        {/* Sort Dropdown */}
        <div className="w-full md:w-auto flex items-center space-x-2">
          <label className="text-xs font-bold uppercase tracking-wide text-gray-400 min-w-fit">Sort By:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full md:w-auto bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 font-medium cursor-pointer"
          >
            <option value="default">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* --- CATEGORY TABS --- */}
      {!loading && (
        <div className="flex flex-wrap gap-2 mb-8 items-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition duration-200 border ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {cat === 'all' ? 'All Items' : cat.replace('-', ' ')}
            </button>
          ))}
        </div>
      )}

      {/* --- PRODUCT GRID --- */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, idx) => (
            <SkeletonLoader key={idx} />
          ))}
        </div>
      ) : processedProducts.length === 0 ? (
        // Clean fallback state if filters return no results
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
          <span className="text-4xl block mb-2">😕</span>
          <h3 className="text-lg font-bold text-gray-700">No matching products found</h3>
          <p className="text-gray-400 text-sm mt-1">Try resetting your keywords or category filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {processedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;