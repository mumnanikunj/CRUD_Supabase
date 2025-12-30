import { Image, StyleSheet} from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingScreen from '../screens/SettingScreen';
import { useDispatch, useSelector } from 'react-redux';
import { DarkTheme, LigthTheme } from '../utils/theme';
import { RootState } from '../Redux/store';
import { AppImages } from '../assets';
import { getTabBarHeight, hp, wp } from '../utils/useDynamicSize';
import NotesScreen from '../screens/NotesScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  const { preference, systemTheme } = useSelector((state:RootState) => state.theme);

  const isDarkMode =
    preference === 'system'
      ? systemTheme === 'dark'
      : preference === 'dark';

  const activeTheme = isDarkMode ? DarkTheme : LigthTheme;
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: { backgroundColor: activeTheme.background,height:getTabBarHeight(1) },
          tabBarActiveTintColor: activeTheme.activeColor,
          tabBarInactiveTintColor: activeTheme.inactiveColor,
          headerShown:false,
          tabBarShowLabel: false,
        })}
      >
        <Tab.Screen name="Notes" component={NotesScreen} 
          options={{
            tabBarLabel: "",
            tabBarIcon:({focused , color ,size})=>(
              <Image 
                source={AppImages.HomeIcon}
                style={{height: hp(7),width:wp(7),tintColor:color}}
                resizeMode={'contain'}
              />
            )
          }}
        />
        <Tab.Screen name="Settings" component={SettingScreen} 
          options={{
            tabBarLabel: "",
            tabBarIcon:({focused , color ,size})=>(
              <Image 
                source={AppImages.SettingIcon}
                style={{height: hp(7),width:wp(7),tintColor:color}}
                resizeMode={'contain'}
              />
            )
          }}
        />
      </Tab.Navigator>
  )
}

export default BottomTabNavigation

const styles = StyleSheet.create({})