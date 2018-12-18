import {fromJS} from 'immutable';
import {actionTypes} from './interface';

const defaultState = fromJS({
    menuData: []
});

export default (state = defaultState, action) => {
    switch (action.type) {
    case actionTypes.ACTION_LOAD_MENU_DATA:
        return state.set("menuData", action.menuData);
    case actionTypes.ACTION_CLEAR_MENU_DATA:
        return state.set("menuData", action.menuData);
    default:
        return state;
    }
};
