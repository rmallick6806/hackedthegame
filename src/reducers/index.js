import { combineReducers } from 'redux'
import terminal from './terminal';
import bashChat from './bashChat';

const gameApp = combineReducers({
  terminal,
  bashChat
});

export default gameApp
