
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  const { id, title, price, thumbnail, category, rating } = product;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition duration-300 flex flex-col h-full">
      <div className="h-48 bg-gray-50 flex items-center justify-center p-4">
        <img
          src={thumbnail}
          alt={title}
          className="max-h-full max-w-full object-contain hover:scale-105 transition duration-300"
        />
      </div>

      {/* Details */}
      <div className="p-4 flex flex-col flex-grow">
        <span className="text-xs uppercase font-semibold text-blue-500 mb-1">{category}</span>
        <h3 className="font-bold text-gray-800 text-sm line-clamp-2 mb-2 min-h-40px">{title}</h3>
        
        <div className="flex items-center mb-4">
          <span className="text-yellow-400 text-sm">⭐ {rating.toFixed(1)}</span>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-extrabold text-gray-900">${price}</span>
          <Link
            to={`/product/${id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-2 rounded-lg font-medium transition duration-200"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;