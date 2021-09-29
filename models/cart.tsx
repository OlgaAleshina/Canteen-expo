import { actionCreatorFactory, DvaModelBuilder} from "dva-model-creator";
import { ICartState, CartItem } from "../types";

const initState: ICartState = {
    dishes: [],
    total: 0,
}

const moduleName = "cart"
const actionCreator = actionCreatorFactory(moduleName)

export const addDish = actionCreator<CartItem>("addDish")
export const removeDish = actionCreator<string>("removeDish")
export const clearCart = actionCreator("clearCart")

const builder = new DvaModelBuilder<ICartState>(initState, moduleName)
.case(addDish, (state, payload) => {
    const existedItem = state.dishes.find(i=> i.id === payload.id)
    const itemToAdd = {
        id: payload.id,
        name: payload.name,
        price: payload.price,
        weight: payload.weight,
        type_measure: payload.type_measure,
        amount: 1,
        totalPrice: 0,
    }
    console.log("cart", state)
    if(existedItem) {
        return {
            ...state,
            total: state.total + +payload.price,
        }
    } else {
        return {
            total: state.total + +payload.price, 
            dishes: [...state.dishes, itemToAdd]
            }
    }
})
.case(removeDish, (state, payload) => {
    const filteredDishes = state.dishes.filter(i=> i.id !== payload)
    return { ...state, dishes: filteredDishes}
})


export default builder.build()