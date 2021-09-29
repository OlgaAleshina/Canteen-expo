import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {useEffect} from "react";
import { Platform, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { Text } from 'native-base';

//import { View } from '../components/Themed';
import { ICompState, IGlobalProps, ScreenProps, Dish, CartItem } from '../types';
import AppBar from '../components/AppBar';
import DishCard from '../components/DishCard';
import DishBar from "../components/DishBar";
import { setActiveCategory } from '../models/company';

const mapStateToProps = (state: {company: ICompState}) => {
  const {dishes, compInfo, categories, activeCategory} = state.company
  return {dishes, compInfo, categories, activeCategory}
}

type PageStateProps = ReturnType<typeof mapStateToProps>;
type PageProps = PageStateProps & IGlobalProps & ScreenProps;

const CategoryScreen: React.FC<PageProps> = ({route, navigation, dispatch, ...props}) => {

  useEffect(()=> {
    dispatch({
      type: 'company/getDishes',
      payload: {compID: props.compInfo?.id, activeCategoryId: props.activeCategory?.id}//route.params?.id}
    })
  },
  [props.activeCategory])

  const changeCategory = (payload: ICompState["activeCategory"]) => {
    dispatch(setActiveCategory(payload))
  }

  const addToCart = (payload: CartItem) => {
    dispatch({
      type: 'cart/addDish',
      payload: payload
    })
  }

  return (
    <View>
        <AppBar title="Меню"/>
        <DishBar categories={props.categories} onCategoryClick={(payload)=>changeCategory(payload)} />
        <Text mb="2" mt="2" style={styles.title}>{props.activeCategory?.name}</Text>

        {props.dishes?.results?.map((item: Dish)  => <DishCard dish={item} onAddButton={(item)=>addToCart(item)}/>)}
        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default connect(mapStateToProps)(CategoryScreen);