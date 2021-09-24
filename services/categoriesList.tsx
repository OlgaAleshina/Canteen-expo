import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {APIprops} from '../types';
import {BASE_URL} from '../url.js';
//import {REACT_APP_BASE_URL} from 'react-native-dotenv';

//const BASE_URL="https://api.menu-qr.ru/api/v1/company/"
export const instance = axios.create({
  baseURL: BASE_URL,
});


//let compID= "9b6a2fc9-287c-4800-bd63-94f40a781193";

export const getInfoCompany = async ({podDomen}: APIprops) => {
  const res = await instance.get(`${podDomen}/info/client`);
  //const compID = res.data.info.id;
  //AsyncStorage.setItem("compID", JSON.stringify(compID));
  return res;
};

export const getBanner =  ({compID}: APIprops) => {
  const res = instance.get(`${compID}/banner`);
  return res;
};

export const getCategories = (compID: APIprops) => {
  console.log("id", compID)
  const res = instance.get(`${compID}/category`);
  return res;
};