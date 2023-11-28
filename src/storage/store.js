import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
//import {inKartReducer} from './reducer';
import reducers from './userSlice';
import categoryReducer from './categorySlice';
// redux persistConfig , it should be a object with key and storage
const persistConfig = {
  key: 'InKart',
  storage: AsyncStorage,
};

//middleware: Redux persist persisted reducer

const persistedReducer = persistReducer(persistConfig, reducers);

//setting Redux store

const store = configureStore({
  reducer: {
    persist: persistedReducer,
    category: categoryReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

let persister = persistStore(store);

export {store, persister};
