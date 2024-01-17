import { createSlice } from '@reduxjs/toolkit';
const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		totalPrice: 0,
		items: [],
	},
	reducers: {
		addItem(state, action) {
			const findItem = state.items.find(obj => obj.id === action.payload.id);
			if (findItem) {
				findItem.count++;
			} else {
				state.items.push({
					...action.payload,
					count: 1,
				});
			}
			state.totalPrice = state.items.reduce((sum, obj) => {
				return obj.price * obj.count + sum;
			}, 0);
		},
		// Redux Toolkit allows us to write "mutating" logic in reducers. It
		// doesn't actually mutate the state because it uses the Immer library,
		// which detects changes to a "draft state" and produces a brand new
		// immutable state based off those changes
		minusItem(state, action) {
			const findItem = state.items.find(obj => obj.id === action.payload);
			if (findItem) {
				--findItem.count;
			}

			state.totalPrice = state.items.reduce((sum, obj) => {
				return state.totalPrice - obj.price;
			}, 0);
		},
		removeItem(state, action) {
			state.items = state.items.filter(item => item.id !== action.payload);
			state.totalPrice = 0;
		},
		clearItems(state) {
			state.totalPrice = 0;
			state.items = [];
		},
	},
});

// Action creators are generated for each case reducer function
export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
