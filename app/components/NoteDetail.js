import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import moment from 'moment';
import 'moment/locale/vi';
import AsyncStorage               from '@react-native-async-storage/async-storage';

import colors         from '../misc/colors';
import RoundIconBtn   from '../components/RoundIconBtn';
import NoteInputModal from '../components/NoteInputModal';
import { useNotes }   from '../context/NoteProvider';
import { createIconSetFromFontello } from '@expo/vector-icons';

const NoteDetail = props => {
    const [note, setNote] = useState(props.route.params.note);
    const headerHeight = useHeaderHeight(); 
    const { setNotes } = useNotes();
    const [modalVisible, setModalVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const formatDate = (time) => {
        return moment(time).format('LLLL');
    }

    const deleteNote = async () => {
        const result = await AsyncStorage.getItem('notes');
        let notes = [];
        if(result) notes = JSON.parse(result);

        const listNotesAfterRemove = notes.filter(n => n.id !== note.id);
        setNotes(listNotesAfterRemove);
        await AsyncStorage.setItem('notes', JSON.stringify(listNotesAfterRemove));

        props.navigation.goBack();
    }

    const displayDeleteAlert = () => {
        Alert.alert(
            'Bạn có chắc chắn muốn xóa ?',
            'Thao tác này sẽ xóa Ghi chú của bạn vĩnh viễn!',
            [
                {
                    text: 'Xóa',
                    onPress: deleteNote
                },
                {
                    text: 'Không',
                    onPress: () => console.log('NOOOOO')
                }
            ],
            {
                cancelable: true
            }
        )
    }

    // const handleEditNote = () => {
        
    // }

    const handleUpdateNote = async (title, desc, time) => {
        const result = await AsyncStorage.getItem('notes');
        let notes = [];
        if(result) notes = JSON.parse(result);

        for(let n of notes) {
            if(n.id == note.id) {
                n.id    = time;
                n.time  = time;
                n.title = title;
                n.desc  = desc;
                n.isUpdated = true;

                setNote(n);
            }
        }
        setNotes(notes);
        await AsyncStorage.setItem('notes', JSON.stringify(notes));
    }

    return (
        <ScrollView contentContainerStyle={[styles.container, { paddingTop: headerHeight }]}>
            <Text style={styles.time}>
                {isEdit ? `Ngày chỉnh sửa: ${formatDate(note.time)}` : `Ngày tạo: ${formatDate(note.time)}`}
            </Text>
            <Text style={styles.title}>{note.title}</Text>
            <Text style={styles.desc}>{note.desc}</Text>

            <View style={styles.btnContainer}>
                <RoundIconBtn
                    antIconName='delete'
                    style={{ backgroundColor: colors.ERROR, marginBottom: 15 }}
                    onPress={displayDeleteAlert}
                />
                <RoundIconBtn
                    antIconName='edit'
                    style={{ backgroundColor: colors.PRIMARY }}
                    onPress={() => {
                        setModalVisible(true);
                        setIsEdit(true);
                    }}
                />
            </View>
            <NoteInputModal 
                visible={modalVisible} 
                onClose={() => setModalVisible(false)} 
                onSubmit={handleUpdateNote}
                note={note}
                isEdit={isEdit}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,

    },

    title: {
        fontSize: 30,
        color: colors.PRIMARY,
        fontWeight: 'bold'
    },

    desc: {
        fontSize: 20,
        opacity: 0.6
    },  

    time: {
        textAlign: 'right',
        fontSize: 12,
        opacity: 0.5
    },

    btnContainer: {
        position: 'absolute',
        right: 15,
        bottom: 50
    },
});

export default NoteDetail;
