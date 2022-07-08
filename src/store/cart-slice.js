import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
    items: [],
    totalQuantity: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        previousItemOfCart(state, action) {
            const item = action.payload;
            state.items.push(item);
        },
        addItemToCart(state, action) {
            const item = action.payload;
            const existingItem = state.items.find(val => val.id === item.id);
            if (!existingItem) {
                state.items.push({
                    id: item.id,
                    price: item.price,
                    quantity: 1,
                    totalPrice: item.price,
                    name: item.name
                })
            }
            else {
                existingItem.quantity++;
                existingItem.totalPrice += item.price;
            }
        },
        removeItemFromCart(state, action) {
            const item = action.payload;
            const existingItem = state.items.find(val => val.id === item.id);
            if (existingItem.quantity === 1) state.items = state.items.filter(val => val.id !== item.id);
            if (existingItem.quantity > 1) {
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price;
                
            } 
        }
    }
});

export const cartAction = cartSlice.actions;
export default cartSlice;