import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { clearCart } from '../redux/slices/cartSlice';
import { placeOrder } from '../redux/slices/orderSlice';

function Checkout() {
  const [step, setStep] = useState(1); // Step 1: Shipping Form, Step 2: Success Screen
  const [orderSummary, setOrderSummary] = useState(null);
  
  // OPTION A: Lazy state initialization. 
  // This arrow function is guaranteed to run ONLY ONCE when the component mounts.
  // It completely satisfies React's strict render purity rules.
  const [uniqueOrderId] = useState(() => {
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    return `ORD-${randomNumber}`;
  });

  const { items, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Initialize React Hook Form controls
  const { register, handleSubmit, formState: { errors } } = useForm();

  // If a user navigates directly to /checkout with an empty cart, redirect them
  if (items.length === 0 && step === 1) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl p-8 max-w-md mx-auto shadow-sm border mt-10">
        <span className="text-5xl block mb-4">🛒</span>
        <h2 className="text-xl font-bold mb-4">Your cart is empty!</h2>
        <p className="text-gray-500 mb-6">Add products to your cart before checking out.</p>
        <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition">
          Go Shop
        </Link>
      </div>
    );
  }

  // Handle final checkout processing
  const onSubmitShipping = (shippingData) => {
    const finalizedOrder = {
      orderId: uniqueOrderId, // Using our cleanly initialized unique order ID
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      customer: shippingData,
      items: [...items],
      total: totalAmount,
      status: 'Processing'
    };

    // 1. Save order inside local history store
    dispatch(placeOrder(finalizedOrder));
    setOrderSummary(finalizedOrder);

    // 2. Wipe the shopping cart memory
    dispatch(clearCart());

    // 3. Move to the visual confirmation step
    setStep(2);
  };

  return (
    <div className="max-w-4xl mx-auto mt-6">
      {/* --- STEP 1: FILL OUT SHIPPING DETAILS --- */}
      {step === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Shipping Form (Left side) */}
          <form onSubmit={handleSubmit(onSubmitShipping)} className="md:col-span-3 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-xl font-black text-gray-800 border-b pb-3 mb-4">Shipping Details</h2>
            
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Full Name</label>
              <input 
                type="text" 
                {...register("fullName", { required: "Name is required" })}
                className={`w-full px-4 py-2 border rounded-xl bg-gray-55 text-sm focus:ring-2 outline-none ${
                  errors.fullName ? 'border-red-400 focus:ring-red-100' : 'border-gray-200 focus:ring-blue-100'
                }`}
              />
              {errors.fullName && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.fullName.message}</p>}
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Email Address</label>
              <input 
                type="email" 
                {...register("email", { 
                  required: "Email is required", 
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" } 
                })}
                className={`w-full px-4 py-2 border rounded-xl bg-gray-55 text-sm focus:ring-2 outline-none ${
                  errors.email ? 'border-red-400 focus:ring-red-100' : 'border-gray-200 focus:ring-blue-100'
                }`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.email.message}</p>}
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Delivery Address</label>
              <textarea 
                rows="3" 
                {...register("address", { required: "Address is required" })}
                className={`w-full px-4 py-2 border rounded-xl bg-gray-55 text-sm focus:ring-2 outline-none ${
                  errors.address ? 'border-red-400 focus:ring-red-100' : 'border-gray-200 focus:ring-blue-100'
                }`}
              ></textarea>
              {errors.address && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.address.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase block mb-1">City</label>
                <input 
                  type="text" 
                  {...register("city", { required: "City is required" })} 
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl bg-gray-50 text-sm outline-none focus:ring-2 focus:ring-blue-100" 
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Postal Code</label>
                <input 
                  type="text" 
                  {...register("zip", { required: "Postal code is required" })} 
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl bg-gray-50 text-sm outline-none focus:ring-2 focus:ring-blue-100" 
                />
              </div>
            </div>

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition mt-4 shadow-sm">
              Place Secure Order (${totalAmount.toFixed(2)})
            </button>
          </form>

          {/* Mini Summary Pane (Right side) */}
          <div className="md:col-span-2 bg-gray-50 p-6 rounded-2xl border border-dashed border-gray-200 h-fit">
            <h3 className="font-bold text-gray-700 mb-4">Items Overview</h3>
            <div className="max-h-60 overflow-y-auto space-y-3 pr-2 mb-4">
              {items.map(item => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 truncate max-w-150px">{item.title} <b className="text-gray-400 text-xs">x{item.quantity}</b></span>
                  <span className="font-semibold text-gray-800">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-3 flex justify-between font-extrabold text-gray-900">
              <span>Total due:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}

      {/* --- STEP 2: ORDER PLACED SUCCESSFULLY --- */}
      {step === 2 && orderSummary && (
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm max-w-xl mx-auto text-center py-12">
          <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">✓</div>
          <h1 className="text-2xl font-black text-gray-900">Thank You For Your Purchase!</h1>
          <p className="text-sm text-gray-400 mt-1">Your items are being compiled for packaging.</p>
          
          <div className="bg-gray-50 p-4 rounded-2xl my-6 text-left space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Order ID:</span> 
              <span className="font-mono font-bold text-blue-600">{orderSummary.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Date Placed:</span> 
              <span className="font-semibold text-gray-700">{orderSummary.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Deliver To:</span> 
              <span className="font-semibold text-gray-700 truncate max-w-200px">{orderSummary.customer.fullName}</span>
            </div>
            <div className="border-t my-2 pt-2 flex justify-between text-base font-bold">
              <span className="text-gray-800">Paid Total:</span> 
              <span className="text-gray-900">${orderSummary.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex gap-4">
            <button onClick={() => navigate('/')} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl transition">
              Continue Shopping
            </button>
            <Link to="/orders" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition text-center block leading-48px">
              View Order History
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;