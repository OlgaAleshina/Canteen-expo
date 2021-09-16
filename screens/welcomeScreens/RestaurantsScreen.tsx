import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { FlatList, Button } from "react-native";
import { RootTabScreenProps } from '../../types';

export default function TabTwoScreen({navigation}: RootTabScreenProps<'TabOne'>) {

  const goToRestaurant = () => {
    navigation.navigate("CategoriesList")
  }
  return (
    <View style={styles.container}>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabTwoScreen.tsx" />
     
      <FlatList
        data={[
          {key: 'студенец'},
          {key: 'второй ресторан'},
        ]}
        renderItem={({item}) => <Button title={item.key} onPress={goToRestaurant}>{item.key}</Button>}
      />
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
