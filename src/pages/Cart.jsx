
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart, clearItemFromCart } from '../redux/slices/cartSlice';

function Cart() {
  const { items, totalAmount, totalQuantity } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  if (items.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 max-w-2xl mx-auto mt-10 p-8 shadow-sm">
        <span className="text-6xl block mb-4">🛒</span>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-8">Add items to your cart to start shopping!</p>
        <Link
          to="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition duration-300"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h1 className="text-3xl font-black text-gray-900 mb-8 tracking-tight">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items List (2/3 width on large screens) */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              {/* Product Info */}
              <div className="flex items-center space-x-4 w-full sm:w-auto">
                <div className="w-20 h-20 bg-gray-50 rounded-xl p-2 flex items-center justify-center shrink-0">
                  <img src={item.thumbnail} alt={item.title} className="max-h-full max-w-full object-contain" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-base line-clamp-1">{item.title}</h3>
                  <p className="text-blue-600 font-extrabold mt-1">${item.price}</p>
                </div>
              </div>

              {/* Quantity Controls & Math */}
              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-8">
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 font-bold transition duration-150"
                  >
                    −
                  </button>
                  <span className="px-4 py-2 font-bold text-gray-800 min-w-40px text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => dispatch(addToCart(item))}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 font-bold transition duration-150"
                  >
                    +
                  </button>
                </div>

                <div className="text-right min-w-80px">
                  <p className="font-extrabold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                </div>

                <button
                  onClick={() => dispatch(clearItemFromCart(item.id))}
                  className="text-gray-400 hover:text-red-500 font-bold transition duration-200 text-lg"
                  title="Remove from cart"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Card (1/3 width) */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-fit">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">Order Summary</h2>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between text-gray-600">
              <span>Total Items</span>
              <span className="font-semibold">{totalQuantity}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className="text-green-600 font-semibold">FREE</span>
            </div>
            <div className="flex justify-between text-gray-600 border-b pb-4">
              <span>Tax (Estimated)</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between text-lg font-extrabold text-gray-900 pt-2">
              <span>Total Amount</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <Link
            to="/checkout"
            className="block text-center w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-md hover:shadow-lg transition duration-300"
          >
            Proceed to Checkout
          </Link>

          <Link
            to="/"
            className="block text-center w-full text-blue-600 hover:text-blue-700 font-semibold text-sm mt-4 transition duration-200"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;