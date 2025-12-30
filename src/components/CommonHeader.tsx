import { Appearance, ColorSchemeName, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Fonts } from '../common/fonts'
import { fs, wp } from '../utils/useDynamicSize';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import { setSystemTheme } from '../Redux/slices/themeSlice';
import { DarkTheme, LigthTheme } from '../utils/theme';

interface Props{
    HeaderTitle: string
    theme: any
}

const CommonHeader = ({HeaderTitle , theme}: Props) => {
  const { preference, systemTheme } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    const updateTheme = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
      dispatch(setSystemTheme(colorScheme || 'light'));
    };

    const subscription = Appearance.addChangeListener(updateTheme);

    dispatch(setSystemTheme(Appearance.getColorScheme() || 'light'));


    return () => {
      subscription.remove();
    };

  }, [dispatch]);

  const activeTheme =
    preference === 'system'
      ? systemTheme === 'dark'
        ? DarkTheme
        : LigthTheme
      : preference === 'dark'
        ? DarkTheme
        : LigthTheme;
  return (
    <View style={[styles.mainContainer, { backgroundColor: activeTheme.statusBarColor }]}>
      <Text style={[styles.headerText, {  color:'white' }]}>{HeaderTitle}</Text>
    </View>
  )
}

export default CommonHeader

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: wp(4)
  },
  headerText: {
    fontFamily: Fonts.Bold,
    fontSize: fs(7),
  }
})