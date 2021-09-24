import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {useEffect, useState} from "react";
import { Platform, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';

import {ScreenProps, ICompState, IGlobalProps } from '../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, View } from '../components/Themed';


const mapStateToProps = (state: {company: ICompState}) => {
  const {compInfo} = state.company
  return {
    //loading: state.loading.models.users,
    compInfo
  };
}

type PageStateProps = ReturnType<typeof mapStateToProps>;
type PageProps = PageStateProps & IGlobalProps & ScreenProps;

const CategoriesListScreen: React.FC<PageProps> = ({route, navigation, dispatch}) => {

  useEffect(()=>{
    dispatch({
      type: 'company/getCompInfo',
      payload: route.params,
    })
  }
  
  , [])

  const goToCategory= () => {
    navigation.navigate("Category")
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories List</Text>
      
      <Button title="exampleCategory" onPress={goToCategory} />
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

export default connect(mapStateToProps
)(CategoriesListScreen);