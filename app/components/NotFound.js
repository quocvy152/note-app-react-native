//import liraries
import { AntDesign } from '@expo/vector-icons';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../misc/colors';

// create a component
const NotFound = () => {
    return (
        <View style={styles.container}>
            <AntDesign name='frowno' size={90} color='black' />
            <Text style={{ marginTop: 20, fontSize: 20 }}>Không tìm thấy kết quả trùng khớp</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.5,
        zIndex: -1
    },
});

//make this component available to the app
export default NotFound;
