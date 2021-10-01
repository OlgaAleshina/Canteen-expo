import { actionCreatorFactory, DvaModelBuilder} from "dva-model-creator";
import { ICartState, CartItemType } from "../types";

const initState: ICartState = {
    dishes: [],
    totalPrice: 0,
    totalNumber: 0
}

const moduleName = "cart"
const actionCreator = actionCreatorFactory(moduleName)

export const addDish = actionCreator<CartItemType>("addDish")
export const increaseAmount = actionCreator<string>("increaseAmount")
export const decreaseAmount = actionCreator<string>("decreaseAmount")
export const removeDish = actionCreator<string>("removeDish")
export const clearCart = actionCreator("clearCart")

const builder = new DvaModelBuilder<ICartState>(initState, moduleName)
.case(addDish, (state, payload) => {
    const dishesCopy = [...state.dishes]
    const existedItem = dishesCopy.find(i=> i.id === payload.id)
    const itemToAdd = {
        id: payload.id,
        name: payload.name,
        price: payload.price,
        weight: payload.weight,
        type_measure: payload.type_measure,
        amount: 1,
        totalPrice: payload.price,
    }
    
    
    if(!existedItem) {
        return {
            dishes: [...state.dishes, itemToAdd],
            totalPrice: state.totalPrice + +payload.price,
            totalNumber: state.totalNumber + 1, 
        }
    } else {
        existedItem.amount += 1
        return {
            dishes: dishesCopy,
            totalPrice: state.totalPrice + +payload.price,
            totalNumber: state.totalNumber + 1,
            }
    }
})
.case(increaseAmount, (state, payload) => {
    const dishesCopy = [...state.dishes]
    const activeDish = dishesCopy.find(item=> item.id === payload)
    activeDish.amount += 1
    activeDish.totalPrice = activeDish.amount * activeDish.price

    return {
        dishes: dishesCopy,
        totalNumber: state.totalNumber + 1, 
        totalPrice: state.totalPrice + +activeDish.price
    }
})
.case(decreaseAmount, (state, payload) => {
    const dishesCopy = [...state.dishes]
    const activeDish = dishesCopy.find(item=> item.id === payload)
    const lastItem = activeDish.amount == 1

    return {
        dishes: lastItem ? state.dishes.filter(item => item.id !==payload) : dishesCopy,
        totalNumber: state.totalNumber - 1,
        totalPrice: state.totalPrice - +activeDish.price 
    }
    /*if(activeDish.amount == 1) {

        return {
            dishes: state.dishes.filter(item => item.id !==payload), 
            totalNumber: state.totalNumber - 1,
            total: state.total - +activeDish.price 
        }
    } 

    return {
        dishes: dishesCopy,
        totalNumber: state.totalNumber - 1,
        total: state.total - +activeDish.price
    }*/
})
.case(removeDish, (state, payload) => {
    const filteredDishes = state.dishes.filter(i=> i.id !== payload);
    const updatedPrice = 1;
    const updatedNumber = 1;
    return { 
         dishes: filteredDishes,
         totalPrice: updatedPrice,
         totalNumber: updatedNumber
    }
})
.case(clearCart, () => {
    return initState
})

export default builder.build()