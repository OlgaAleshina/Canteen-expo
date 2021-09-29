import { actionCreatorFactory, DvaModelBuilder } from "dva-model-creator";
import * as categoryService from '../services/company';
import { APIprops, ICompState, CompInfo } from "../types";


const initState: ICompState = {
    compInfo: null,
    categories: [],
    dishes: {},
    activeCategory: null,
  };

const moduleName = "company"
const actionCreator = actionCreatorFactory(moduleName);

export const setCompInfo = actionCreator<ICompState["compInfo"]>("setCompInfo")
export const getCompInfo = actionCreator<APIprops>("getCompInfo")
export const setCategories = actionCreator<ICompState["categories"]>("setCategories")
export const getCategories = actionCreator<APIprops>("getCategories")
export const setDishes = actionCreator<ICompState["dishes"]>("setDishes")
export const getDishes = actionCreator<APIprops>("getDishes")
export const setActiveCategory = actionCreator<ICompState["activeCategory"]>("setActiveCategory")


const builder = new DvaModelBuilder<ICompState>(initState, moduleName)
  .case(setCompInfo, (state, payload) => {
    return { ...state, compInfo: payload}
  })
  .case(setCategories, (state, payload)=> {
    return {...state, categories: payload}
  })
  .case(setDishes, (state, payload)=> {
    return {...state, dishes: payload}
  })
  .case(setActiveCategory, (state, payload) => {
    return {...state, activeCategory: payload}
  })
  .takeEvery(getCompInfo, function *(payload, {call, put}): Generator {
      try{
          const res: {data: {info: CompInfo}} | any = yield call(categoryService.getInfoCompany, payload);
          const compID = res?.data?.info?.id
          yield put(setCompInfo(res?.data?.info))
          yield put(getCategories(compID))
      } catch (error) {
          alert(error.message)
      }
  })
 .takeEvery(getCategories, function *(payload, {call, put}): Generator {
    try {
      const res: {data: {categories: []}} | any = yield call(categoryService.getCategories, payload);
      yield put(setCategories(res?.data?.categories))
    } catch (error) {
      alert(error.message)
    }
 }) 
 .takeEvery(getDishes, function *(payload, {call, put}): Generator {
    try {
      const res: {data: {}} | any = yield call(categoryService.getDishes, payload)
      yield put(setDishes(res.data))
    } catch (error) {
      alert(error.message)
    }
 }) 

  

export default builder.build();
