
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Hook to trigger actions
import { addToCart } from '../redux/slices/cartSlice';

function ProductCard({ product }) {
  const { id, title, price, thumbnail, category, rating } = product;
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    // Prevent clicking the button from redirecting us to the product details page
    e.preventDefault();
    dispatch(addToCart(product));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition duration-300 flex flex-col h-full">
      <Link to={`/product/${id}`} className="block h-48 bg-gray-50 p-4 items-center justify-center">
        <img
          src={thumbnail}
          alt={title}
          className="max-h-full max-w-full object-contain hover:scale-105 transition duration-300"
        />
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        <span className="text-xs uppercase font-semibold text-blue-500 mb-1">{category}</span>
        <h3 className="font-bold text-gray-800 text-sm line-clamp-2 mb-2 min-h-[40px]">{title}</h3>
        
        <div className="flex items-center mb-4">
          <span className="text-yellow-400 text-sm">⭐ {rating.toFixed(1)}</span>
        </div>

        <div className="mt-auto flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-lg font-extrabold text-gray-900">${price}</span>
            <span className="text-xs text-gray-400">ID: {id}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2 pt-2">
            <Link
              to={`/product/${id}`}
              className="text-center border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs py-2 rounded-lg font-medium transition duration-200"
            >
              Details
            </Link>
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs py-2 rounded-lg font-medium transition duration-200"
            >
              Add +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;