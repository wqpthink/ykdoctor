import axios from 'axios';
import history from '_conf/history';
import {actionTypes} from './interface';
import {HOST, LOGIN_IN_PATH}  from '_conf/constant';
import $ from 'jquery';

const loginInAction = (data) => ({
    type: actionTypes.ACTION_LOGIN_ALL_CHANGE,
    loginData: data,
    loginState: true
});

/**
 * 改变登录数据
 * @param {object} data
 */
export const loginDataChangeAction = (data) => ({
    type: actionTypes.ACTION_LOGIN_DATA_CHANGE,
    loginData: data
});

/**
 * 改变登录状态
 * @param {boolean} state
 */
export const loginStateChangeAction = (state) => ({
    type: actionTypes.ACTION_LOGIN_STATE_CHANGE,
    loginState: state
});

/**
 * 登录请求
 * @param {string} account
 * @param {string} password
 */
export const loginIn = (account, password) => {
    return dispatch => {
        let ps = {
            'loginName': account,
            'password': password,
            'type': 'phone'
        };

        // $.ajax(HOST+LOGIN_IN_PATH,{
        //     data: ps,
        //     dataType: 'jsonp',
        //     crossDomain: true,
        //     success: function(response){
        //         console.log("res:"+response);
        //     },
        //     error: function(error){
        //         console.log("err"+error);
        //     }
        // });


        // axios.get("https://gank.io/api/today").then((response) => {
        //     console.log("wqp:"+response);
        // }).catch((error) => {
        //     console.log("wqp:"+error);
        // });
        // axios({
        //     mdthod: 'post',
        //     url: LOGIN_IN_PATH,
        //     data: ps
        // }).then(res => {
        //     console.log(res);
        // }).catch(err => {
        //     console.log(err);
        // });

        axios.post(LOGIN_IN_PATH, ps).then((response) => {
            console.log(response);
            dispatch(loginInAction(response.data));
            history.push("/home");
        }).catch((error) => {
            alert("登录失败");
        });

        // axios.get("http://manager.yunkangdoctor.com/sys/user").then((response) => {
        //     console.log(response);
        //     dispatch(loginInAction(response.data));
        //     history.push("/home");
        // }).catch((error) => {
        //     alert("登录失败");
        // });
    };
};

export const loginOut = (account) => {
    return dispatch => {
        let ps = {
            'loginName': account,
            'type': 'phone'
        };
        // axios.post("",ps).then(res => {
        //     console.log(res);
        // }).catch(err => {
        //     console.log(err);
        // });

        dispatch(loginStateChangeAction(false));
    };
};

export const modifyPsw = () => {
    return dispatch => {
        console.log("请求修改密码操作");


    };
};
