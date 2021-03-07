import { createStore as createReduxStore, combineReducers } from 'redux';

import todoListReducer from './todoList/reducer';

const reducers = combineReducers({
    todoList: todoListReducer,
});

export const createStore = () => createReduxStore(reducers);
