import { createStore } from 'redux'
import gameApp from './reducers';

let store = createStore(gameApp);

export default store;
