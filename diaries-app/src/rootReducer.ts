import { combineReducers } from '@reduxjs/toolkit';

import authReducer from './components/auth/authSlice';
import userReducer from './components/auth/userSlice';
import diariesReducer from './components/diary/diariesSlice';
import entriesReducer from './components/entry/entriesSlice';
import editorReducer from './components/entry/editorSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  diaries: diariesReducer,
  entries: entriesReducer,
  user: userReducer,
  editor: editorReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
