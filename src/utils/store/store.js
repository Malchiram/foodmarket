
import { persistReducer, persistStore } from 'redux-persist';
import {configureStore} from '@reduxjs/toolkit'
import storage from "redux-persist/lib/storage";
import storageSession from 'redux-persist/lib/storage/session'
import { combineReducers } from 'redux';
import userReducer from '../reducers/userReducers';
import orderReducer from '../reducers/orderReducer';
import { thunk } from 'redux-thunk';

const userPersistConfig = {
  key: 'user',
  storage : storageSession,

};

const rootPersistConfig = {
  key: 'root',
  storage,


};
// Menggabungkan semua reducer menjadi satu rootReducer
const rootReducer = combineReducers({
  order: persistReducer(rootPersistConfig,orderReducer),
  user: persistReducer(userPersistConfig,userReducer),
});

const rootReducers = (state, action) => {
  if (action.type === 'LOGOUT_USER') {
    // Reset state Redux
    storage.removeItem('persist:root')
    storageSession.removeItem('persist:user');
    storage.removeItem('authToken'); 
    return rootReducer(undefined, action); 
  }
  return rootReducer(state, action);
};


const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['LOGIN_SUCCESS'], // Jika action tertentu membutuhkan pengecualian
      },
    }).concat(thunk),
})

const persistor = persistStore(store)


export { persistor, store };
