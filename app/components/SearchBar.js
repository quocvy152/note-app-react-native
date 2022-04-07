import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../misc/colors';

const SearchBar = ({ containerStyle }) => {
  return (
    <View style={[styles.container, { ...containerStyle }]}>
      <TextInput style={styles.searchBar} placeholder='Tìm kiếm ở đây...' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },

  searchBar: {
    borderWidth: 0.5,
    borderColor: colors.PRIMARY,
    height: 45,
    borderRadius: 40,
    paddingLeft: 15,
    fontSize: 20
  },
});

export default SearchBar;
