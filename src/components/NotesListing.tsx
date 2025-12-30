import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../Redux/store';
import { deleteNote, fetchNotes } from '../Redux/slices/notesSlice';
import { fs, hp, wp } from '../utils/useDynamicSize';
import { Fonts } from '../common/fonts';

interface Props {
    notes: any[];
    loading: boolean;
    openModal: (note: any) => void;
    theme: any;
    CustomeMessage: string
}

const NotesListing = ({ notes, loading, openModal, theme, CustomeMessage }: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const { isOnline } = useSelector((state: RootState) => state.network);
    const [error , setError] = useState('')
    
    const deleteItem = (id: any) =>{
        if(isOnline){
            dispatch(deleteNote(id))
        }else{
            setError('You are offline. Please try again later.')
            setTimeout(() => {
                Alert.alert(error)
            }, 1000);
        }
    }

    const Listing = ({ item }: any) => {
        return (
            <View style={[styles.noteCard, { backgroundColor: theme.mode === 'dark' ? '#111111' : '#F4F4F4' }]}>
                <Text style={[styles.title, { color: theme.text }]}>{item.title}</Text>
                <Text numberOfLines={2} style={[styles.content, { color: theme.text }]}>{item.content}</Text>
                <View style={styles.options}>
                    <Text style={styles.Edit} onPress={() => openModal(item)} >Edit</Text>
                    <Text style={styles.delete} onPress={() => deleteItem(item.id)}>Delete</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.mainView}>
            <FlatList
                data={notes}
                keyExtractor={item => item.id}
                refreshing={loading}
                onRefresh={() => {isOnline && dispatch(fetchNotes())}}
                renderItem={(item) => Listing(item)}
                ListEmptyComponent={
                    !loading ? (
                        <>
                        {!isOnline && <Text style={styles.OfflineError}>You are offline. Please try again later.</Text>}
                        <Text
                            style={[
                                styles.emptyText,
                                { color: theme.text },
                            ]}
                            >
                                {!isOnline ?  null : CustomeMessage ? CustomeMessage : ' No notes found. Tap + to add one.'}
                           
                        </Text>
                            </>
                    ) : null
                }
                contentContainerStyle={
                    notes.length === 0
                        ? styles.emptyContainer
                        : undefined
                }
            />
        </View>
    )
}

export default NotesListing

const styles = StyleSheet.create({
    mainView: {
        marginTop: hp(1)
    },
    noteCard: {
        paddingHorizontal: wp(3),
        borderRadius: wp(2),
        marginBottom: hp(1),
        elevation: 2,
    },
    title: {
        fontSize: fs(5),
        fontFamily: Fonts.Bold
    },
    content: {
        fontSize: fs(4),
        fontFamily: Fonts.SemiBold
    },
    options: {
        flexDirection: 'row',
        alignItems: "center",
        marginVertical: hp(0.5)
    },
    Edit: {
        color: 'blue',
        paddingHorizontal: wp(1),
        fontFamily: Fonts.Bold
    },
    delete: {
        color: 'red',
        paddingHorizontal: wp(1),
        fontFamily: Fonts.Bold
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: hp(10),
    },
    emptyText: {
        fontSize: fs(4),
        fontFamily: Fonts.SemiBold,
        textAlign: 'center',
    },
    OfflineError:{
        color:'red',
        fontFamily:Fonts.Bold,
        fontSize:fs(4),
        textAlign:'center'
    }
})