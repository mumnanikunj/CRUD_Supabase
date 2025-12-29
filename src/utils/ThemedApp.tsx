import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import React, { useEffect } from "react";
import { setSystemTheme } from "../Redux/slices/themeSlice";
import { Appearance, ColorSchemeName, Platform, StatusBar, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DarkTheme, LigthTheme } from "./theme";
import Router from "../Navigation/Router"

const ThemedApp = () => {
  const dispatch = useDispatch();
  const { preference, systemTheme } = useSelector((state:RootState) => state.theme);

  useEffect(() => {
    const updateTheme = ({ colorScheme } : {colorScheme : ColorSchemeName }) => {
      dispatch(setSystemTheme(colorScheme || 'light'));
    };

    const subscription = Appearance.addChangeListener(updateTheme);

    dispatch(setSystemTheme(Appearance.getColorScheme() || 'light'));

    return () => {
      if (typeof subscription.remove === 'function') subscription.remove();
      else subscription.remove()
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

  useEffect(() => {
    const barStyle ='light-content' ;

    StatusBar.setBarStyle(barStyle, true);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(activeTheme.background, true);
    }
  }, [activeTheme]);

  return (
    <>
    <SafeAreaView style={[styles.container, { backgroundColor: activeTheme.statusBarColor }]}>
      <StatusBar
        barStyle={'light-content'}
        />
      <Router />
    </SafeAreaView>
    </>
  );
};

export default ThemedApp

const styles = StyleSheet.create({
  container: { flex: 1 },
});
