import {fromJS} from 'immutable';
import {actionTypes} from './interface';

const defaultState = fromJS({

});

export default (state = defaultState, action) => {
    switch (action.type) {

    default:
        return state;
    }
};
