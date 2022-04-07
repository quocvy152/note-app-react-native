import React, { useState, useEffect, useContext } from 'react';
import { StatusBar }                  from 'expo-status-bar';
import { 
  StyleSheet, Text, View, 
  TextInput, Dimensions, 
  TouchableWithoutFeedback, Keyboard,
  FlatList 
}                                     from 'react-native';
import AsyncStorage                   from '@react-native-async-storage/async-storage'

import colors         from '../misc/colors';
import SearchBar      from '../components/SearchBar';
import RoundIconBtn   from '../components/RoundIconBtn';
import NoteInputModal from '../components/NoteInputModal';
import Note           from '../components/Note';
import NoteDetail     from '../components/NoteDetail';
import { 
  NoteProvider, 
  useNotes
}                     from '../context/NoteProvider';
import NotFound       from '../components/NotFound';

const NoteScreen = ({ user, navigation }) => {
  const [greet, setGreet] = useState('Tối');
  const [modalVisible, setModalVisible] = useState(false);
  const { notes, setNotes, findNotes } = useNotes();
  const [searchQuery, setSearchQuery] = useState('');
  let [isHaveResult, setIsHaveResult] = useState(true);

  const getTimeToSetGreet = () => {
    let timeStr = 'Tối';
    const current = new Date();
    let hour = current.getHours();

    if(hour >= 0 && hour <= 12) // buổi sáng
      timeStr = 'Sáng'
    else if(hour >= 13 && hour <= 17) // buổi chiều
      timeStr = 'Chiều'
    else 
      timeStr = 'Tối' // buổi tối

    setGreet(timeStr);
  }

  useEffect(() => {
    getTimeToSetGreet();
  }, [])

  const handleOnSubmit = async (title, desc) => {
    const note = { 
      id: Date.now(), 
      title, 
      desc, 
      time: Date.now()
    };

    const updateNotes = [...notes, note];
    setNotes(updateNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(updateNotes));
  }

  const openNote = note => {
    navigation.navigate('NoteDetail', { note });
  }

  const handleOnSearchInput = async (text) => {
    setSearchQuery(text);
    if(!text.trim()) {
      setSearchQuery('');
      setIsHaveResult(true);
      return await findNotes();
    }
    const filterNotes = notes.filter(note => {
      if(note.title.toLowerCase().includes(text.toLowerCase())) {
        return note;
      }
    })

    if(filterNotes.length) {
      setNotes([...filterNotes]);
    } else {
      setIsHaveResult(false);
    }
  }

  const onClear = async () => {
    setSearchQuery('');
    setIsHaveResult(true);
    return await findNotes();
  }

  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor={colors.LIGHT} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.header}>{`Buổi ${greet} tốt lành ${user.name}`}</Text>
          {notes.length ? (
            <SearchBar 
              value={searchQuery}
              onChangeText={handleOnSearchInput}
              containerStyle={{ marginVertical: 15 }} 
              onClear={onClear}
            />
          ) : null}
          
          {!isHaveResult ? (
            <View style={[StyleSheet.absoluteFillObject, styles.emptyHeaderContainer]}>
              <NotFound />
            </View>
          ) : (
              <FlatList 
                data={notes}
                numColumns={2}
                columnWrapperStyle={{ 
                  justifyContent: 'space-between',
                  marginBottom: 15
                }}
                keyEctractor={item => item.id.toString()}
                renderItem={({ item }) => (
                  <Note onPress={() => openNote(item)} item={item} />
                )}
              />
          )}
          {!notes.length && isHaveResult ? (
            <View style={[StyleSheet.absoluteFillObject, styles.emptyHeaderContainer]}>
              <Text style={styles.emptyHeader}>
                Thêm ghi chú
              </Text>
            </View>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
      <RoundIconBtn 
        antIconName='plus' 
        style={styles.addBtn} 
        onPress={() => setModalVisible(true)}
      />
      <NoteInputModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
        onSubmit={handleOnSubmit}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    flex: 1
  },

  header: {
    fontSize: 23,
    fontWeight: 'bold'
  },

  emptyHeader: {
    fontSize: 25,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    opacity: 0.2
  },

  emptyHeaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1
  },

  addBtn: {
    position: 'absolute',
    right: 15,
    bottom: 50
  }
});

export default NoteScreen;
