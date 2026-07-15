
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Hook to read Redux state

function Navbar() {
  // Grab the totalQuantity from our cart slice
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const linkStyles = ({ isActive }) =>
    `transition duration-200 ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600'}`;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-black text-blue-600 tracking-tight">
          🛍️ E-SHOP
        </Link>

        <div className="flex items-center space-x-6">
          <NavLink to="/" className={linkStyles}>Shop</NavLink>
          <NavLink to="/orders" className={linkStyles}>Orders</NavLink>
          <NavLink to="/cart" className="relative group flex items-center">
            <span className="text-gray-600 hover:text-blue-600 transition duration-200 mr-1">
              Cart 🛒
            </span>
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold animate-bounce-once">
                {totalQuantity}
              </span>
            )}
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;