import { actionCreatorFactory, DvaModelBuilder } from "dva-model-creator";
import * as categoryService from '../services/categoriesList';
import { Effect } from "dva";
import { APIprops, ICompState } from "../types";
import { get } from "styled-system";



const initState: ICompState = {
    compInfo: null,
    categories: [],
  };

const moduleName = "company"
const actionCreator = actionCreatorFactory(moduleName);

export const setCompInfo = actionCreator<ICompState["compInfo"]>("setCompInfo")
export const getCompInfo = actionCreator<APIprops>("getCompInfo")
export const setCategories = actionCreator<ICompState["categories"]>("setCategories")
export const getCategories = actionCreator<APIprops>("getCategories")
//export const authError = actionCreator<string>("authError");
//export const login = actionCreator<FormProps>("login");
//export const signup = actionCreator<FormProps>("signup");


const builder = new DvaModelBuilder<ICompState>(initState, moduleName)
  .case(setCompInfo, (state, payload) => {
    return { ...state, compInfo: payload}
  })
  .case(setCategories, (state, payload)=> {
    return {...state, categories: payload}
  })
  .takeEvery(getCompInfo, function *(payload, {call, put}): Generator {
      try{
          const res = yield call(categoryService.getInfoCompany, payload);
          const compID = res?.data?.info?.id
          yield put(setCompInfo(res?.data?.info))
          yield put(getCategories(compID))
      } catch (error) {
          alert(error.message)
      }
  })
 .takeEvery(getCategories, function *(payload, {call, put}): Generator {
    try {
      const res = yield call(categoryService.getCategories, payload);
      yield put(setCategories(res?.data?.categories))
    } catch (error) {
      alert(error.message)
    }
 })  

  
  

export default builder.build();

/*export const actions = {
  setCompId 
};*/