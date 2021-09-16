import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, StyleSheet, Button } from 'react-native';

import { RootTabScreenProps } from '../types';
import { Text, View } from '../components/Themed';

export default function CategoriesListScreen({navigation}: RootTabScreenProps) {

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
