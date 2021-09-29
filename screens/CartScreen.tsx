import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { ICartState, IGlobalProps, ScreenProps } from "../types.js";

const mapStateToProps = (state: {cart: ICartState}) => {
  const {dishes, total} = state.cart
  return {
    dishes,
    total
  }
}

type PageStateProps = ReturnType<typeof mapStateToProps>;
type PageProps = PageStateProps & IGlobalProps & ScreenProps;

const CartScreen: React.FC<PageProps> = ({dishes, total}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart Screen</Text>
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

export default CartScreen;