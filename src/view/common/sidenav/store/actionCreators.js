import {MENU_PATH} from '_conf/constant';
import {actionTypes} from './interface';
import axios from 'axios';
import {fromJS} from 'immutable';

const menuDataAction = (data) => ({
    type: actionTypes.ACTION_LOAD_MENU_DATA,
    menuData: fromJS(data)
});


export const clearMenuData = () => ({
    type: actionTypes.ACTION_CLEAR_MENU_DATA,
    menuData: fromJS([])
});

export const loadMeunData = () => {
    return dispatch => {
        console.log("111111:" + MENU_PATH);
        axios.get(MENU_PATH).then(res => {
            const data = res.data.data.list;
            console.log("加载到菜单数据为:" + data);
            dispatch(menuDataAction(data));
        }).catch(err => {
            console.log("菜单数据加载失败");
        });
    };
};
