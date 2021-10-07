import * as React from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { Text, View } from '../../components/Themed';
import { Box, Pressable } from "native-base";
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
    navigation.navigate("CategoriesList", {podDomen: podDomen})
  }

  return (
    <View>
     
      <FlatList
        
        data={[
          {key: 'На цоколе', podDomen: 'restomarket-studenec'},
          {key: 'Хабит', podDomen: 'habit'},
        ]}
        renderItem={({item}) => (
            <Box 
              width="100%"
              borderBottomWidth="1"
              pl="4"
              pr="5"
              py="2"
              key={item.key}>
                  <Pressable pt="10" pb="10" onPress={()=>goToRestaurant(item.podDomen)}>
                      <Text>{item.key}</Text>
                  </Pressable>
            </Box>)}
      />
    </View>
  );
}

export default connect(mapStateToProps)(TabTwoScreen)
