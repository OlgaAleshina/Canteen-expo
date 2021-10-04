import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { Text } from '../components/Themed';
import AppBar from "../components/AppBar";
import { ICartState, IGlobalProps, ScreenProps } from "../types.js";
import { HStack, VStack, ScrollView } from 'native-base';
import ClearCartButton from '../components/Cart/ClearCartButton';
import EmptyCart from '../components/Cart/EmptyCart';
import { clearCart, decreaseAmount, increaseAmount, removeDish } from '../models/cart';
import CartItem from '../components/Cart/CartItem';
import { CartItemType } from "../types";

const mapStateToProps = (state: {cart: ICartState}) => {
  const {dishes, totalPrice, totalNumber} = state.cart
  return {
    dishes,
    totalPrice,
    totalNumber
  }
}

type PageStateProps = ReturnType<typeof mapStateToProps>;
type PageProps = PageStateProps & IGlobalProps & ScreenProps;

const CartScreen: React.FC<PageProps> = ({navigation, dispatch, dishes, totalPrice, totalNumber}) => {

  const handleClearCart = () => {
    dispatch(clearCart())
  }

  const deleteDish = (id: string) => {
    dispatch(removeDish(id))
  }

  const addItem = (id: string) => {
    dispatch(increaseAmount(id))
  }

  const deleteItem = (id: string) => {
    dispatch(decreaseAmount(id))
  }

  if(dishes.length == 0) {
    return <EmptyCart navigation={navigation} />
  }
  return (
    <ScrollView>
        <AppBar navigation={navigation} cartCount={totalNumber} title="Корзина"/>
        <HStack p={2} w="100%" justifyContent="space-between" alignItems="center">
            <Text>Ваш заказ: </Text>
            <ClearCartButton onClearCart={()=>handleClearCart()}/>
        </HStack>
        
        <VStack>
          {dishes.map((item: CartItemType) => (
            <CartItem 
              onAddItem={()=>addItem(item.id)} 
              onDeleteItem={()=>deleteItem(item.id)} 
              onCrossButton={()=>deleteDish(item.id)} 
              dish={item}/>
          ))}
        </VStack>

        <VStack mt={2} p={2} alignItems="center" justifyContent="center">
            <Text>Сумма заказа: {totalPrice} РУБ</Text>
            <Text>Оформить и оплатить данный заказ вы сможете на баре</Text>
        </VStack>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default connect(mapStateToProps)(CartScreen);