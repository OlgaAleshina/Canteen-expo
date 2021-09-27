import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {useEffect} from "react";
import { Platform, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import {
  Box,
  Heading,
  Icon,
  AspectRatio,
  Image,
  Text,
  Center,
  HStack,
  Stack,
  IconButton,
  NativeBaseProvider
} from 'native-base';
import { AntDesign } from '@expo/vector-icons';

//import { View } from '../components/Themed';
import { ICompState, IGlobalProps, ScreenProps } from '../types';

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
    <View style={styles.container}>
      <Text style={styles.title}>{route.params?.name}</Text>

      {dishes?.results.map(item => (
         <Box
         rounded="lg"
         width="100%"
         shadow={1}
         _light={{ backgroundColor: 'gray.50' }}
         _dark={{ backgroundColor: 'gray.700' }}
       >
        {item.photo && (
          <Box>
            <AspectRatio ratio={16 / 9}>
              <Image
                source={{uri: `${item.photo}`}}
                alt="image"
              />
            </AspectRatio>
          </Box>
        )}
         <Stack p="4" space={3}>
           <Stack space={2}>
             <Heading size="md" ml="-1">
               {item.name}
             </Heading>
           </Stack>
           <HStack alignItems="center" space={4} justifyContent="space-between">
           <Text fontWeight="400">
            {item.price} / {item.weight} {item.type_measure}
           </Text>
           <IconButton
                icon={<Icon as={AntDesign} name="pluscircleo" color="grey" />}
                borderRadius="full"
                _pressed={{
                  bg: "orange.600:alpha.20",
                }}
              />
              </HStack>
         </Stack>
       </Box>
      ))}
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