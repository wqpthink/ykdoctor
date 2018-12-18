import {fromJS} from 'immutable';
import {actionTypes} from './interface';

const defaultState = fromJS({
    loginState: false,
    loginData: {}
});

export default (state = defaultState, action) => {
    switch (action.type) {
    case actionTypes.ACTION_LOGIN_DATA_CHANGE:
        return state.set("loginData", action.data);
    case actionTypes.ACTION_LOGIN_STATE_CHANGE:
        return state.set("loginState", action.data);
    case actionTypes.ACTION_LOGIN_ALL_CHANGE:
        return state.merge({
            loginState: action.loginState,
            loginData: action.loginData
        });
    default:
        return state;
    }
};
