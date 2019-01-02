import axios from "axios";
//import * as actionTypes from './actionTypes';
import { actionTypes } from "./interface";
import { message } from 'antd';


//createAction
// 查询列表

export const getData = (_para = {}) => {
    return dispatch => {
        let _param = '';
        if (_para.barcode) {
            _param += `barcode=${_para.barcode}&`;
        }
        if (_para.applayNum) {
            _param += `applayNum=${_para.applayNum}&`;
        }
        if (_para.examinerName) {
            _param += `examinerName=${_para.examinerName}&`;
        }
        if (_para.examinerPhone) {
            _param += `examinerPhone=${_para.examinerPhone}&`;
        }
        if (_para.itemType) {
            _param += `itemType=${_para.itemType}&`;
        }
        if (_para.resultStatus) {
            _param += `resultStatus=${_para.resultStatus}&`;
        }
        if (_para.policyNo) {
            _param += `policyNo=${_para.policyNo}&`;
        }
        if (_para.credentialsNumber) {
            _param += `credentialsNumber=${_para.credentialsNumber}&`;
        }
        if (_para.startTime) {
            _param += `startTime=${_para.startTime}&`;
        }
        if (_para.endTime) {
            _param += `endTime=${_para.endTime}&`;
        }
        if (_para.pageNum) {
            _param += `pageNum=${_para.pageNum}&`;
        }
        axios
            .get(`/v999/doctor/insuredBatchresults/queryInsuredOrderBatchResultList?${_param}pageSize=10&orderBy=collectTime desc`)
            .then((res) => {
                if (res.data.code == 0) {
                    res.data.data.list.map(item => {
                        item.key = item.id;
                    }); 
                    dispatch(getListChangeAction(res.data.data));
                } else {
                    message.error(res.data.msg);
                }
            })
            .catch(err => {
                message.error(err.response.data.msg);
            });
    };
};


//改变列表查询结果
export const getListChangeAction = (result) => {
    return {
        type: actionTypes.CHANGE_ACTION,
        tableData: result.list,
        pageTotal: result.pages,
        isTableLoading: false
    };
};

// 改变列表查询条件
export const changeQueryCriteria = (queryCriteria) => {
    return {
        type: actionTypes.CHANGE_QUERYCRITERIA,
        queryCriteria: queryCriteria,
    };
};

export const showLoading =  (isshow) => {
    return  {
        type: actionTypes.SHOW_LOADING,
        isTableLoading: isshow,
    };
};