import { createReducer, on } from "@ngrx/store";
import {addToCart, loadCart, removeFromCart} from './cart.actions';
import { Course } from "../../features/interfaces/course.interface";

// Create ngrx locally Becouse the is no API for Cart
const InitialState = {
    cart : []
}

export const cartReducer = createReducer(InitialState ,
    // Load cart from localStorage
    on(loadCart, (InitialState:any) => {
        const storedCart = JSON.parse(localStorage.getItem('cart') ?? '[]');
        return { ...InitialState, cart: Array.isArray(storedCart) ? storedCart : [] };
    }),

    // add to cart
    on(addToCart,(InitialState:any , item:Course) => {
        const isItemInCart = InitialState.cart.some((val: Course) => val.id === item.id);
        if (!isItemInCart) {
            const updatedCart = [...InitialState.cart, item];
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return { ...InitialState, cart: updatedCart };
        }
        localStorage.setItem('cart',JSON.stringify(InitialState))
        return InitialState;
    }),
    // Remove from cart
    on(removeFromCart, (InitialState, itemId) => {
        const updatedCart = InitialState.cart.filter((item: Course) => Number(item.id) != Number(itemId.id));
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        return { ...InitialState, cart: updatedCart };
    })
)