import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {useEffect} from "react";
import { Platform, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { Text } from 'native-base';


//import { View } from '../components/Themed';
import { ICompState, IGlobalProps, ScreenProps } from '../types';
import AppBar from '../components/AppBar';
import DishCard from '../components/DishCard';

const mapStateToProps = (state: {company: ICompState}) => {
  const {dishes, compInfo} = state.company
  return {dishes, compInfo}
}

type PageStateProps = ReturnType<typeof mapStateToProps>;
type PageProps = PageStateProps & IGlobalProps & ScreenProps;

const CategoryScreen: React.FC<PageProps> = ({route, navigation, dispatch, dishes, compInfo}) => {

  useEffect(()=> {
    dispatch({
      type: 'company/getDishes',
      payload: {compID: compInfo?.id, activeCategoryId: route.params?.id}
    })
  },
  [])

  return (
    <View >
        <AppBar title="Меню"/>
        
        <Text mb="2" mt="2" style={styles.title}>{route.params?.name}</Text>

        {dishes?.results.map(item  => <DishCard dish={item}/>)}
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