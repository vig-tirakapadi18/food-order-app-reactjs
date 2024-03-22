import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0,
};

const ADD = "ADD";
const REMOVE = "REMOVE";
const CLEAR = "CLEAR";

const reducer = (state, action) => {
    if (action.type === ADD) {
        const updatedTotalAmount =
            state.totalAmount +
            action.payload.item.price * action.payload.item.amount;

        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.payload.item.id
        );

        const existingCartItem = state.items[existingCartItemIndex];

        let updatedItems;

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.payload.item.amount,
            };

            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.payload.item);
        }

        return { items: updatedItems, totalAmount: updatedTotalAmount };
    }

    if (action.type === REMOVE) {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.payload.id
        );

        const existingItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;

        let updatedItems;
        if (existingItem.amount === 1) {
            updatedItems = state.items.filter(
                (item) => item.id !== action.payload.id
            );
        } else {
            const updatedItem = {
                ...existingItem,
                amount: existingItem.amount - 1,
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return { items: updatedItems, totalAmount: updatedTotalAmount };
    }

    if (action.type === CLEAR) {
        return defaultCartState;
    }

    return defaultCartState;
};

const CartProvider = (props) => {
    const [cartState, dispatchFn] = useReducer(reducer, defaultCartState);

    const addItemToCart = (item) => {
        dispatchFn({ type: ADD, payload: { item } });
    };

    const removeItemFromCart = (id) => {
        dispatchFn({ type: REMOVE, payload: { id } });
    };

    const clearCartHandler = () => {
        dispatchFn({ type: CLEAR });
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCart,
        removeItem: removeItemFromCart,
        clearCart: clearCartHandler,
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;
