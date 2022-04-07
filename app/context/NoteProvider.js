import React, { Component, createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage               from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet } from 'react-native';

const NoteContext = createContext();
const NoteProvider = ({ children }) => {
    const [notes, setNotes] = useState([]);

    const findNotes = async () => {
        const result = await AsyncStorage.getItem('notes');
        if(result !== null) setNotes(JSON.parse(result));
    }

    useEffect(() => {
        findNotes();
    }, []);

    return (
        <NoteContext.Provider value={{ notes, setNotes, findNotes }}>
            { children }
        </NoteContext.Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

export const useNotes = () => useContext(NoteContext);

export default NoteProvider;
