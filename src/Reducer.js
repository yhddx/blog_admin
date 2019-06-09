import { combineReducers } from 'redux';

import userinfoReducer from './userinfoReducer';
import detailReducer from './detailReducer';
import listReducer from './listReducer';

export const Reducer = combineReducers({
    listReducer,
    detailReducer,
    userinfoReducer,
})
