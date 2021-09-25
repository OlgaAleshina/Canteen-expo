import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { useEffect } from "react";
import { Platform, View, StyleSheet, Image, Button, ImageBackground, Pressable } from 'react-native';
import { Heading, Text} from "native-base";
import { connect } from 'react-redux';

import {ScreenProps, ICompState, IGlobalProps } from '../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
//import {  View } from '../components/Themed';;
import { position } from 'styled-system';


const mapStateToProps = (state: {company: ICompState}) => {
  const {categories} = state.company
  return {
    //loading: state.loading.models.users,
    categories
  };
}

type PageStateProps = ReturnType<typeof mapStateToProps>;
type PageProps = PageStateProps & IGlobalProps & ScreenProps;

const CategoriesListScreen: React.FC<PageProps> = ({route, navigation, dispatch, ...props}) => {

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
    <View>
      <Heading textAlign="left" mb="2">Menu</Heading>
      <View style={{flexDirection:"row", flexWrap: "wrap", maxWidth: 780}}>
        {props.categories.map(item=>(
      
          
              <Pressable
                style={{width: "50%", padding: 5}}
                onPress={()=>goToCategory(item.id)}
              >
                  
                  <Image
                        source={{uri: `${item.photo}`,}}
                        style={{width: "100%", height: 100, borderRadius: 60/ 20, padding: 5}} 
                      />
                  <View style={{backgroundColor: "rgba(190,188,188,.3)", position: "absolute", bottom: 4}}>
                      <Text style={{color: "white"}}>{item.name}</Text>
                 </View>       
            
              </Pressable>
          
          
          ))}
          </View>
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

