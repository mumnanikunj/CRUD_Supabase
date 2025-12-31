import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../../lib/supabase';
import styles from './styles';
import { clearUserProfile } from '../../utils/userStorage';
import { useDispatch, useSelector } from 'react-redux';
import { setPreference } from '../../Redux/slices/themeSlice';
import { RootState } from '../../Redux/store';
import { DarkTheme, LigthTheme } from '../../utils/theme';
import { resetNotes } from '../../Redux/slices/notesSlice';
import CommonHeader from '../../components/CommonHeader';
import { useFocusEffect } from '@react-navigation/native';
import { safeGetUser } from '../../utils/safeSupabase';

interface UserProfile {
  id: string;
  email: string;
  name?: string;
  created_at: string;
  user_metadata?: any;
}

const SettingScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const { preference, systemTheme } = useSelector(
    (state: RootState) => state.theme
  );

  const [user, setUser] = useState<UserProfile | null>(null);
  const [offlineMessage, setOfflineMessage] = useState(false);

  const isDarkMode =
    preference === 'system'
      ? systemTheme === 'dark'
      : preference === 'dark';

  const activeTheme = isDarkMode ? DarkTheme : LigthTheme;

const loadProfile = async () => {
  const { data } = await safeGetUser();

  if (data?.user) {
    setUser(data.user);
    setOfflineMessage(false);
    await AsyncStorage.setItem(
      'Local_User',
      JSON.stringify(data.user)
    );
  } else {
    const cached = await AsyncStorage.getItem('Local_User');
    if (cached) {
      setUser(JSON.parse(cached));
      setOfflineMessage(true);
    }
  }
};

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [])
  );

  const handleChangeTheme = (value: 'light' | 'dark' | 'system') => {
    dispatch(setPreference(value));
  };

  const renderRadioItem = (
    label: string,
    value: 'light' | 'dark' | 'system',
    description?: string
  ) => {
    const selected = preference === value;

    return (
      <TouchableOpacity
        style={styles.row}
        activeOpacity={0.7}
        onPress={() => handleChangeTheme(value)}
      >
        <View style={styles.rowTextContainer}>
          <Text style={[styles.label, { color: activeTheme.text }]}>
            {label}
          </Text>
          {description ? (
            <Text
              style={[
                styles.subLabel,
                { color: activeTheme.inactiveColor },
              ]}
            >
              {description}
            </Text>
          ) : null}
        </View>

        <View style={[styles.radioOuter, { borderColor: '#355177ff' }]}>
          {selected ? (
            <View
              style={[
                styles.radioInner,
                { backgroundColor: '#355177ff' },
              ]}
            />
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  const logout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await supabase.auth.signOut();
          await AsyncStorage.removeItem('USER_PROFILE');
          await AsyncStorage.removeItem('Local_User');
          clearUserProfile();
          dispatch(resetNotes());
          navigation.reset({
            index: 0,
            routes: [{ name: 'AuthNavigator' }],
          });
        },
      },
    ]);
  };

  return (
    <>
      <CommonHeader HeaderTitle="Settings" theme={activeTheme} />
      <ScrollView
        style={{ backgroundColor: activeTheme.background }}
        contentContainerStyle={styles.contentContainer}
      >
         {offlineMessage && (
        <View
          style={{
            backgroundColor: '#FFDADA',
            padding: 10,
            marginHorizontal: 16,
            borderRadius: 8,
            marginTop: 8,
          }}
        >
          <Text style={{ color: '#B00020', textAlign: 'center' }}>
            You are offline. Showing last saved profile.
          </Text>
        </View>
      )}
        <View
          style={[
            styles.card,
            {
              backgroundColor:
                activeTheme.mode === 'dark' ? '#111111' : '#F4F4F4',
            },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: activeTheme.text }]}>
            Profile
          </Text>

          <Text style={[styles.label, { color: activeTheme.text }]}>
            Name
          </Text>
          <Text style={[styles.value, { color: activeTheme.text }]}>
            {user?.user_metadata?.name || user?.name || '—'}
          </Text>

          <Text style={[styles.label, { color: activeTheme.text }]}>
            Email
          </Text>
          <Text style={[styles.value, { color: activeTheme.text }]}>
            {user?.email || '—'}
          </Text>

          <Text style={[styles.label, { color: activeTheme.text }]}>
            Joined
          </Text>
          <Text style={[styles.value, { color: activeTheme.text }]}>
            {user?.created_at
              ? new Date(user.created_at).toDateString()
              : '—'}
          </Text>
        </View>

        <View
          style={[
            styles.section,
            {
              backgroundColor:
                activeTheme.mode === 'dark' ? '#111111' : '#F4F4F4',
            },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: activeTheme.text }]}>
            Appearance
          </Text>

          {renderRadioItem(
            'Use system theme',
            'system',
            `Current: ${systemTheme}`
          )}
          {renderRadioItem('Light', 'light')}
          {renderRadioItem('Dark', 'dark')}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

export default SettingScreen;