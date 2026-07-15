import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import SkeletonLoader from '../components/SkeletonLoader';

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) {
          throw new Error('Could not fetch details for this product.');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <SkeletonLoader />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 text-lg font-semibold">{error || 'Product not found'}</p>
        <Link to="/" className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-10 my-6">
      <Link to="/" className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 mb-8">
        ← Back to Shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="bg-gray-50 rounded-2xl p-8 flex items-center justify-center min-h-[350px]">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="max-h-96 object-contain hover:scale-105 transition duration-300"
          />
        </div>

        {/* Product Meta */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-500 bg-blue-50 px-3 py-1 rounded-full">
              {product.category}
            </span>
            <h1 className="text-3xl font-extrabold text-gray-900 mt-4 mb-2">{product.title}</h1>
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-yellow-400 font-bold">⭐ {product.rating.toFixed(1)}</span>
              <span className="text-gray-300">|</span>
              <span className={`text-xs font-semibold px-2 py-1 rounded ${product.stock > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
          </div>

          <div>
            <div className="flex items-baseline space-x-2 mb-6">
              <span className="text-4xl font-black text-gray-900">${product.price}</span>
              {product.discountPercentage && (
                <span className="text-sm font-bold text-green-600">
                  ({product.discountPercentage}% OFF)
                </span>
              )}
            </div>

            <button
              onClick={() => dispatch(addToCart(product))}
              disabled={product.stock <= 0}
              className={`w-full py-4 rounded-xl font-bold transition duration-300 shadow-md ${
                product.stock > 0
                  ? 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {product.stock > 0 ? 'Add to Shopping Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;