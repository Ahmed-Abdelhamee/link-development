import { createAction, props } from "@ngrx/store";
import { Course } from "../../features/interfaces/course.interface";

export const loadCart = createAction("load cart");
export const addToCart = createAction("add to cart" , props<Course>());
export const removeFromCart = createAction("remove From cart" , props<{id:number}>());