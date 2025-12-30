import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import themeReducer from '../slices/themeSlice';
import { persistStore, persistReducer } from 'redux-persist';
import  notesReducer  from '../slices/notesSlice';
import networkReducer from '../slices/networkSlice';;


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['theme'],
};
  
const rootReducer = combineReducers({
  theme: themeReducer,
  notes: notesReducer,
  network: networkReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
