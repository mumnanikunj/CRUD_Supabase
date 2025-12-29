import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Appearance, ColorSchemeName } from 'react-native';

export interface ThemeState {
  preference: 'light' | 'dark' | 'system';
  systemTheme: 'light' | 'dark';
}

const systemTheme = (Appearance.getColorScheme() || 'light') as 'light' | 'dark';

const initialState: ThemeState = {
  preference: 'system',
  systemTheme,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setPreference: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.preference = action.payload;
    },
    setSystemTheme: (state, action: PayloadAction<ColorSchemeName>) => {
      state.systemTheme = (action.payload || 'light') as 'light' | 'dark';
    },
  },
});

export const { setPreference, setSystemTheme } = themeSlice.actions;
export default themeSlice.reducer;
