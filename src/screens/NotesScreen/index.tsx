import { Alert, BackHandler, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Redux/store';
import { deleteNote, fetchNotes, setSearchQuery } from '../../Redux/slices/notesSlice';
import styles from './styles';
import NoteModal from '../../components/NoteModal';
import { DarkTheme, LigthTheme } from '../../utils/theme';
import CommonHeader from '../../components/CommonHeader';
import NotesListing from '../../components/NotesListing';
import SearchBox from '../../components/SearchBox';
import { useFocusEffect } from '@react-navigation/native';

const NotesScreen = () => {

  const dispatch = useDispatch<AppDispatch>();
  const { isOnline } = useSelector((state: RootState) => state.network);
  const {  loading, searchQuery, filteredNotes } = useSelector((state: RootState) => state.notes);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState<any>(null);
  const { preference, systemTheme } = useSelector((state: RootState) => state.theme);
  const isDarkMode =
    preference === 'system'
      ? systemTheme === 'dark'
      : preference === 'dark';
  const activeTheme = isDarkMode ? DarkTheme : LigthTheme;

  
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          'Exit App',
          'Are you sure you want to exit?',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Exit',
              style: 'destructive',
              onPress: () => BackHandler.exitApp(),
            },
          ]
        );
        return true;
      };

      const unsubscribe = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => unsubscribe
    }, [])
  );

  useEffect(() => {
    if(isOnline){
      dispatch(fetchNotes());
    }
  }, [isOnline]);

  const openAddModal = () => {
    setSelectedNote(null);
    setModalVisible(true);
  };

  const openEditModal = (note: any) => {
    setSelectedNote(note);
    setModalVisible(true);
  };

  
const customMessage =
  searchQuery && filteredNotes.length === 0
    ? 'No matching notes found'
    : '';

  return (
    <>
      <CommonHeader
        HeaderTitle={"Notes"}
        theme={activeTheme}
      />
      <View style={[styles.container, { backgroundColor: activeTheme.background }]}>
        <SearchBox 
          search={searchQuery}
          onSearch={(text) =>dispatch(setSearchQuery(text))}
          placeholder={"Search notes..."}
          theme={activeTheme}
        />
        <NotesListing
          notes={filteredNotes}
          openModal={openEditModal}
          loading={loading}
          theme={activeTheme}
          CustomeMessage={customMessage}
        />
        <TouchableOpacity style={styles.fab} onPress={openAddModal}>
          <Text style={styles.fabText}>＋</Text>
        </TouchableOpacity>

        <NoteModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          note={selectedNote}
          theme={activeTheme}
        />
      </View>
    </>
  )
}

export default NotesScreen
