import * as React from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { FlatList, Button } from "react-native";
import { RootTabScreenProps } from '../../types';

const mapStateToProps = (state: {company: any}) => {
  const {compInfo} = state.company
  return {
    //loading: state.loading.models.users,
    compInfo
  };
}

function TabTwoScreen({navigation}: RootTabScreenProps<'TabTwo'>) {

  const goToRestaurant = (podDomen: string) => {
    console.log("pod", podDomen)
    navigation.navigate("CategoriesList", {podDomen: podDomen})
  }

  return (
    <View style={styles.container}>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabTwoScreen.tsx" />
     
      <FlatList
        data={[
          {key: 'студенец', podDomen: 'restomarket-studenec'},
          {key: 'хабит', podDomen: 'habit'},
        ]}
        renderItem={({item}) => <Button title={item.key} onPress={()=>goToRestaurant(item.podDomen)}>{item.key}</Button>}
      />
    </View>
  );
}

export default connect(
  mapStateToProps
)(TabTwoScreen)

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
