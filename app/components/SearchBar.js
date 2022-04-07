import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../misc/colors';

const SearchBar = ({ containerStyle, value, onChangeText, onClear }) => {
  return (
    <View style={[styles.container, { ...containerStyle }]}>
      <TextInput 
        value={value} 
        style={styles.searchBar} 
        placeholder='Tìm kiếm ở đây...' 
        onChangeText={onChangeText} 
      />
      {value ? 
      <AntDesign 
        name='close' 
        size={20} 
        color={colors.PRIMARY} 
        onPress={onClear}
        style={styles.clearIcon}
      /> : null
        
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center'
  },

  searchBar: {
    borderWidth: 0.5,
    borderColor: colors.PRIMARY,
    height: 45,
    borderRadius: 40,
    paddingLeft: 15,
    fontSize: 20
  },

  clearIcon: {
    position: 'absolute',
    right: 10
  },
});

export default SearchBar;
