import { StatusBar }              from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState }    from 'react';
import AsyncStorage               from '@react-native-async-storage/async-storage';
import { createStackNavigator }   from '@react-navigation/stack';
import { NavigationContainer }    from '@react-navigation/native';
import 'react-native-gesture-handler';

import Intro        from './app/screens/Intro';
import NoteScreen   from './app/screens/NoteScreen';
import NoteDetail   from './app/components/NoteDetail';
import NoteProvider from './app/context/NoteProvider';

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState({});
  const findUser = async () => {
    const result = await AsyncStorage.getItem('user');
    if(result !== null) {
      setUser(JSON.parse(result));
    }
  };

  useEffect(() => {
    findUser();
  }, []);

  const RenderNoteScreen = (props) => <NoteScreen {...props} user={user} />;

  if(!user.name) return <Intro onFinish={findUser} />
  return (
    <NavigationContainer>
      <NoteProvider>
        <Stack.Navigator screenOptions={{ headerTitle: '', headerTransparent: true }}>
          <Stack.Screen component={RenderNoteScreen} name='ListNotes' />
          <Stack.Screen component={NoteDetail} name='NoteDetail' />
        </Stack.Navigator>
      </NoteProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
