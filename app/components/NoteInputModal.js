import React, { Component, useState, useEffect } from 'react';
import { 
    View, Text, StyleSheet, 
    Modal, StatusBar, TextInput, 
    TouchableWithoutFeedback, Keyboard 
}                                                from 'react-native';

import colors       from '../misc/colors';
import RoundIconBtn from '../components/RoundIconBtn'
import { createIconSetFromFontello } from '@expo/vector-icons';

const NoteInputModal = ({ visible, onClose, onSubmit, note, isEdit }) => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    const handleModalClose = () => {
        Keyboard.dismiss();
    }

    const handleOnChangeText = (text, valueFor) => {
        if(valueFor === 'title') setTitle(text);
        if(valueFor === 'desc') setDesc(text);
    }

    const handleSubmit = () => {
        if(!title.trim() && !desc.trim())
            return onClose();
        
        if(isEdit) {
            onSubmit(title, desc, Date.now());
        } else {
            onSubmit(title, desc);
            setTitle('');
            setDesc('');
        }

        onClose();
    }

    const handleOnClose = () => {
        if(!isEdit) {
            setTitle('');
            setDesc('');
        }
        onClose();
    }

    const setValueUpdate = () => {
        if(isEdit) {
            let { title, desc } = note;
            setTitle(title);
            setDesc(desc);
        }
    }

    useEffect(() => {
        setValueUpdate();
    }, [isEdit]);

    return (
      <>
        <StatusBar hidden />  
        <Modal visible={visible} animationType='fade'>
        <View style={styles.container}>
            {!isEdit ? (
                <Text style={styles.header}>Tạo Ghi chú</Text>
            ) : (
                <Text style={styles.header}>Chỉnh sửa Ghi chú</Text>
            )}
            <TextInput 
                value={title}
                placeholder='Tiêu đề' 
                style={[styles.input, styles.title]} 
                onChangeText={(text) => handleOnChangeText(text, 'title')}
            />
            <TextInput 
                value={desc}
                multiline
                placeholder='Ghi chú' 
                style={[styles.input, styles.desc]}
                onChangeText={(text) => handleOnChangeText(text, 'desc')}
            />
            <View style={styles.btnContainer}>
                <RoundIconBtn 
                    antIconName='check' 
                    size={20} 
                    style={styles.submit} 
                    onPress={handleSubmit}
                />
                <RoundIconBtn 
                    antIconName='close' 
                    size={20} 
                    style={styles.submit} 
                    onPress={handleOnClose}
                />
            </View>
        </View>
        <TouchableWithoutFeedback onPress={handleModalClose}>
            <View style={[styles.modalBG, StyleSheet.absoluteFillObject]}>

            </View>
        </TouchableWithoutFeedback>
        </Modal>
      </>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 15
    },

    input: {
        borderBottomWidth: 2,
        borderBottomColor: colors.PRIMARY,
        fontSize: 20,
        color: colors.DARK
    },

    title: {
        height: 40,
        marginBottom: 15,
        fontWeight: 'bold'
    },

    desc: {
        height: 100,
    },

    header: {
        fontSize: 23,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 20,
        marginLeft: 10
    },

    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 15
    },
    
    submit: {
        marginLeft: 15
    },

    modalBG: {
        flex: 1,
        zIndex: -1,
        backgroundColor: '#F5FFFA'
    },
});

export default NoteInputModal;
