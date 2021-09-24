import { actionCreatorFactory, DvaModelBuilder } from "dva-model-creator";
import * as categoryService from '../services/categoriesList';
import { Effect } from "dva";
import { APIprops, ICompState } from "../types";



const initState: ICompState = {
    compID: null,
    compInfo: null,
  };

const moduleName = "company"
const actionCreator = actionCreatorFactory(moduleName);

export const setCompId = actionCreator<ICompState["compID"]>("setCompId")
export const setCompInfo = actionCreator<ICompState["compInfo"]>("setCompInfo")
export const getCompInfo = actionCreator<APIprops>("getCompInfo")
//export const authError = actionCreator<string>("authError");
//export const login = actionCreator<FormProps>("login");
//export const signup = actionCreator<FormProps>("signup");


const builder = new DvaModelBuilder<ICompState>(initState, moduleName)
  .case(setCompId, (state, payload) => {
      return { ...state, compId: payload}
  })
  .case(setCompInfo, (state, payload) => {
    return { ...state, compInfo: payload}
  })
  .takeEvery(getCompInfo, function *(payload, {call, put}): Generator {
      try{
          const res = yield call(categoryService.getInfoCompany, payload);
          yield put(setCompInfo(res.data.info))
      } catch (error) {
          alert(error)
      }
  })
  /*.takeEvery(getCompId, function *(payload, { call, put }) {
      try {
          yield call(authService.login, payload);
          yield put({
            type: 'log',
            payload: true
        })
          yield setCookies({name:'isLogged', value: true, isExpire: payload.remember })
          yield router.push("/dashboard")

      } catch(error) {
          yield put({
            type: 'authError',
            payload: error.message
          })
      }
  })*/


  
  

export default builder.build();

export const actions = {
  setCompId 
};