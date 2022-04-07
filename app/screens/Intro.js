import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

import colors from '../misc/colors';
import RoundIconBtn from '../components/RoundIconBtn';

const Intro = ({ onFinish }) => {
  const [name, setName] = useState('');
  const handleOnChangeText = text => setName(text);
  const handleSubmit = async () => {
    const user = { name: name };
    await AsyncStorage.setItem('user', JSON.stringify(user));
    if(onFinish) onFinish();
  }

  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <Text style={styles.inputTitle}>Nhập tên của bạn để tiếp tục</Text>
        <TextInput
          value={name} 
          onChangeText={handleOnChangeText} 
          placeholder='Nhập tên' 
          style={styles.textInput} 
        />
        {name.length > 3 ? (
          <RoundIconBtn antIconName='arrowright' onPress={handleSubmit} />
        ) : null}
      </View>
    </>
  );
}

const width = Dimensions.get('window').width - 50;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textInput: {
    borderWidth: 2,
    borderColor: colors.PRIMARY,
    width,
    height: 50,
    borderRadius: 10,
    paddingLeft: 15,
    fontSize: 20,
    marginBottom: 15
  },

  inputTitle: {
    alignSelf: 'flex-start',
    paddingLeft: 25,
    marginBottom: 5,
    opacity: 0.5
  }
});

export default Intro;
