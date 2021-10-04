import * as React from 'react';
import { useEffect } from "react";
import { View, StyleSheet, Image, Pressable } from 'react-native';
import { Heading, ScrollView, Text} from "native-base";
import { connect } from 'react-redux';

import {ScreenProps, ICompState, IGlobalProps, ICartState } from '../types';
//import {  View } from '../components/Themed';;
import AppBar from '../components/AppBar';


const mapStateToProps = (state: {company: ICompState, cart: ICartState}) => {
  const {categories, compInfo} = state.company;
  const {totalNumber} = state.cart
  return {
    //loading: state.loading.models.users,
    categories,
    compInfo, 
    totalNumber
  };
}

type PageStateProps = ReturnType<typeof mapStateToProps>;
type PageProps = PageStateProps & IGlobalProps & ScreenProps;

const CategoriesListScreen: React.FC<PageProps> = ({route, navigation, dispatch, categories, compInfo, totalNumber}) => {

  useEffect(()=>{
    dispatch({
      type: 'company/getCompInfo',
      payload: route.params,
    })
  }
  , [])

  const goToCategory= (id: string, name: string) => {
    
    navigation.navigate("Category")
    dispatch({
      type: 'company/setActiveCategory',
      payload: {id: id, name: name}
    })
  }

  
  return (
    <View>
        <AppBar navigation={navigation} title={compInfo?.name} cartCount={totalNumber}/>
        <Heading textAlign="left" mb="2">Меню</Heading>
        <ScrollView mb={10}>
            <View style={styles.container}>
              
                {categories.map(item=>(
                      <Pressable
                        style={styles.category}
                        onPress={()=>goToCategory(item.id, item.name)}
                        key={item.id}
                      >
                            <Image
                                  source={{uri: `${item.photo}`,}}
                                  style={styles.categoryImage} 
                                />
                            <View style={styles.categoryTitle}>
                                <Text style={styles.categoryTitleText}>{item.name}</Text>
                            </View>       
                      </Pressable>
                  
                  
                  ))}

              </View>
          </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection:"row", 
    flexWrap: "wrap", 
    maxWidth: 780
  },
  category: {
    width: "50%", 
    padding: 5
  },
  categoryImage: {
    width: "100%", 
    height: 100, 
    borderRadius: 60/ 20, 
    padding: 5
  },
  categoryTitle: {
    backgroundColor: "rgba(190,188,188,.3)",
    position: "absolute", 
    bottom: 4
  },
  categoryTitleText: {
    color: "white"
  }
});

export default connect(mapStateToProps
)(CategoriesListScreen);

