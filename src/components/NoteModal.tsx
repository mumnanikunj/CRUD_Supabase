import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { createNote, updateNote } from '../Redux/slices/notesSlice';
import { fs, hp, wp } from '../utils/useDynamicSize';
import { Fonts } from '../common/fonts';

interface Props {
    visible: boolean
    onClose: () => void
    note : any
    theme: any
}

const NoteModal = ({ visible, onClose, note , theme }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isOnline } = useSelector((state: RootState) => state.network);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saving , setSaving] = useState(false);
  const [error, setError] = useState('');


  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setError('')
    } else {
      setTitle('');
      setContent('');
      setError('')
    }
  }, [note]);

  const onSave = async () => {
    if (!isOnline) {
    setError('You are offline. Please try again later.');
    return;
  }
    if (!title.trim()) {
        setError('Title is required');
        return;
    }
 try {
      setSaving(true);

      if (note) {
        await dispatch(
          updateNote({ id: note.id, title, content })
        ).unwrap();
      } else {
        await dispatch(
          createNote({ title, content })
        ).unwrap();
      }
      setTitle('')
      setContent('')
      setError('')

      onClose(); 
    } catch (error: any) {
        Alert.alert(error)
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={[styles.modal,{backgroundColor: theme.mode === 'dark' ? '#111111' : '#F4F4F4'}]}>
          <Text style={[styles.header,{color: theme.text}]}>
            {note ? 'Edit Note' : 'New Note'}
          </Text>
          <TextInput
            placeholder="Title"
            placeholderTextColor={theme.text}
            value={title}
            onChangeText={ text => {
                setTitle(text)
                if (error) setError('');
            }}
            style={[styles.input,error && styles.inputError,{borderColor: theme.inactiveColor , color: theme.text}]}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TextInput
            placeholder="Content"
            placeholderTextColor={theme.text}
            value={content}
            onChangeText={setContent}
            style={[styles.input, { height: hp(15) ,borderColor: theme.inactiveColor,color: theme.text}]}
            multiline
          />

          <View style={styles.actions}>
            <TouchableOpacity onPress={() => {
                setError('')
                onClose()}}
                style={styles.cancelBtn}
            >
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={onSave}
                disabled={saving}
                style={styles.saveBtn}
            >
              {saving ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.save}>Save</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default NoteModal;


const styles = StyleSheet.create({
  title: {
    fontSize: fs(2),
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: '#fff',
    paddingHorizontal: wp(5),
    paddingVertical:hp(3),
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  header: {
    fontSize: fs(7),
    fontFamily:Fonts.Bold,
    marginBottom: hp(1.5),
  },
  input: {
    borderWidth: wp(0.2),
    borderColor: '#ddd',
    borderRadius: wp(2),
    paddingVertical: hp(2),
    paddingHorizontal:wp(3),
    marginTop: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  cancelBtn:{
     paddingHorizontal: wp(5),
    paddingVertical: hp(1),
    borderRadius: wp(2),
  },
  cancel: {
    marginRight: 20,
    color: '#666',
    fontFamily: Fonts.SemiBold,
  },
  save: {
    color: 'white',
    fontFamily:Fonts.Bold,
    fontWeight: '700',
  },
  saveBtn: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: wp(5),
    paddingVertical: hp(1),
    borderRadius: wp(2),
  },
  inputError: {
  borderColor: '#DC2626',
},
errorText: {
  color: '#DC2626',
  marginTop: hp(0.5),
  fontSize: wp(3),
},
});