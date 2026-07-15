
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function OrderHistory() {
  const history = useSelector((state) => state.orders.history);

  if (history.length === 0) {
    return (
      <div className="text-center py-25 bg-white rounded-3xl border max-w-md mx-auto p-6 mt-10">
        <span className="text-4xl block mb-2">📦</span>
        <h2 className="text-xl font-bold text-gray-700">No Orders Found Yet</h2>
        <p className="text-sm text-gray-400 mt-1 mb-6">Your finalized receipt summaries will cluster here.</p>
        <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2 rounded-xl transition">
          Browse Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-6">
      <h1 className="text-3xl font-black text-gray-900 mb-8 tracking-tight">Your Order History</h1>
      <div className="space-y-6">
        {history.map((order) => (
          <div key={order.orderId} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
            {/* Order Top Banner */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3 text-sm">
              <div>
                <span className="text-xs text-gray-400 font-bold block uppercase tracking-wider">Order ID</span>
                <span className="font-mono font-bold text-gray-800">{order.orderId}</span>
              </div>
              <div>
                <span className="text-xs text-gray-400 font-bold block uppercase tracking-wider">Date Placed</span>
                <span className="font-semibold text-gray-700">{order.date}</span>
              </div>
              <div>
                <span className="text-xs text-gray-400 font-bold block uppercase tracking-wider">Status</span>
                <span className="text-xs font-bold px-2.5 py-0.5 bg-blue-50 text-blue-600 rounded-full">{order.status}</span>
              </div>
            </div>

            {/* Nested Item Lists */}
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm text-gray-600">
                  <span className="truncate max-w-250px">{item.title} <b className="text-gray-400 font-normal">x{item.quantity}</b></span>
                  <span className="font-medium text-gray-700">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Order Footer Total */}
            <div className="border-t pt-3 flex items-center justify-between text-sm">
              <span className="text-gray-400 font-semibold">Shipped to: <b className="text-gray-600 font-semibold">{order.customer.fullName}</b></span>
              <span className="text-base font-extrabold text-gray-900">Total: ${order.total.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderHistory;