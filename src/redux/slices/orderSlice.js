import { createSlice } from '@reduxjs/toolkit';

const loadOrdersFromStorage = () => {
  try {
    const savedOrders = localStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : { history: [] };
  } catch {
    return { history: [] };
  }
};

const orderSlice = createSlice({
  name: 'orders',
  initialState: loadOrdersFromStorage(),
  reducers: {
    placeOrder(state, action) {
      state.history.unshift(action.payload); // Add new order to top of list
      localStorage.setItem('orders', JSON.stringify(state));
    }
  }
});

export const { placeOrder } = orderSlice.actions;
export default orderSlice.reducer;