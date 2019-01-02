import axios from "axios";
//import * as actionTypes from './actionTypes';
import { actionTypes } from "./interface";
import { message } from "antd";
import { actionCreators } from "_page/login/store/interface";

//createAction
// 查询列表

export const getInsureRecord = (
    _para = { orderBy: "batchGenTime desc", pageSize: "10" },
    isSelectAll = false,
    isInsure = false
) => {
    return async dispatch => {
        let _param = "";
        if (_para.batchNumber) {
            _param += `batchNumber=${_para.batchNumber}&`;
        }
        if (_para.insuredOperator) {
            _param += `insuredOperator=${_para.insuredOperator}&`;
        }
        if (_para.batchStatus) {
            _param += `batchStatus=${_para.batchStatus}&`;
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
        if (_para.orderBy) {
            _param += `orderBy=${_para.orderBy}&`;
        } else {
            _param += `orderBy=batchGenTime desc&`;
        }
        if (_para.pageSize) {
            _param += `pageSize=${_para.pageSize}`;
        } else {
            _param += `pageSize=10`;
        }
        try {
            const result = await axios.get(
                `/v999/doctor/InsuredBatchs/queryInsuredOrderBatchList?${_param}`
            );
            if (result.data.code == 0) {
                result.data.data.list.map(item => {
                    item.key = item.id;
                });
                if (isInsure) {
                    let keys = [];
                    result.data.data.list.map(item => {
                        keys.push(item.id);
                    });
                    await dispatch(setInsureRowKeys(keys));
                } else {
                    await dispatch(
                        getListChangeAction(result.data.data, isSelectAll)
                    );
                }
                //console.log("actionCreators result:", result);
            } else {
                message.error(result.data.msg);
            }
        } catch (error) {
            message.error(error.response.data.msg);
        }
        // axios
        //     .get(`/v999/doctor/InsuredBatchs/queryInsuredOrderBatchList?${_param}`)
        //     .then((res) => {
        //         if (res.data.code == 0) {
        //             res.data.data.list.map(item => {
        //                 item.key = item.id;
        //             });
        //             dispatch(getListChangeAction(res.data.data, isSelectAll));
        //         } else {
        //             message.error(res.data.msg);
        //         }
        //     })
        //     .catch(err => {
        //         message.error(err.response.data.msg);
        //     });
    };
};

//改变列表查询结果
export const getListChangeAction = (result, isSelectAll) => {
    if (isSelectAll) {
        let keys = [];
        result.list.map(item => {
            keys.push(item.id);
        });
        return dispatch => {
            dispatch({
                type: actionTypes.CHANGE_ACTION,
                insureRecord: result.list,
                listTotal: result.total,
                currentPage: result.pageNum,
                pageLoading: false,
                selectedRowKeys: keys
            });
            return result;
        };
        // return {
        //     type: actionTypes.CHANGE_ACTION,
        //     insureRecord: result.list,
        //     listTotal: result.total,
        //     currentPage: result.pageNum,
        //     pageLoading: false,
        //     selectedRowKeys: keys
        // };
    } else {
        return dispatch => {
            dispatch({
                type: actionTypes.CHANGE_ACTION,
                insureRecord: result.list,
                listTotal: result.total,
                currentPage: result.pageNum,
                pageLoading: false,
                selectedRowKeys: []
            });
            return result;
        };
        // return {
        //     type: actionTypes.CHANGE_ACTION,
        //     insureRecord: result.list,
        //     listTotal: result.total,
        //     currentPage: result.pageNum,
        //     pageLoading: false,
        //     selectedRowKeys: []
        // };
    }
};

//改变选择全部状态
export const changeSelectAll = val => {
    return {
        type: actionTypes.CHANGE_SELECTALL,
        isSelectAll: val
    };
};

// 改变列表查询条件
export const changeQueryCriteria = queryCriteria => {
    return {
        type: actionTypes.CHANGE_QUERYCRITERIA,
        queryCriteria: queryCriteria
    };
};

//展示列表loading
export const showLoading = isshow => {
    return {
        type: actionTypes.SHOW_LOADING,
        isTableLoading: isshow
    };
};

//展示列表loading
export const showPageLoading = isshow => {
    return {
        type: actionTypes.SHOW_PAGE_LOADING,
        isPageLoading: isshow
    };
};

// 改变选中项
export const selectRows = (selectedRowKeys, selectedRows) => {
    return {
        type: actionTypes.SET_SELECT_ROWS,
        selectedRowKeys: selectedRowKeys,
        selectedRows: selectedRows
    };
};

// 投保选中项
export const insureSelected = str => {
    return async dispatch => {
        try {
            const result = await axios.get(
                `/v999/doctor/insuredApi/docking/${str}`
            );
            if (result.data.code == 0) {
                message.success(result.data.msg);
            } else {
                message.error(result.data.msg);
            }
            dispatch(getInsureRecord());
        } catch (error) {
            message.error(error.response.data.msg);
        }
    };
};

// export const insureSelected = async (str) => {
//     return async (dispatch) => {
//         try {
//             const result = await axios.get(`/v999/doctor/insuredApi/docking/${str}`);
//             if (result.data.code == 0) {
//                 message.success(result.data.msg);
//             } else {
//                 message.error(result.data.msg);
//             }
//             dispatch(getInsureRecord());
//         } catch (err) {
//             message.error(err.response.data.msg);
//         }
//         // axios
//         //     .get(`/v999/doctor/insuredApi/docking/${str}`)
//         //     .then((res) => {
//         //         if (res.data.code == 0) {
//         //             message.success(res.data.msg);
//         //         } else {
//         //             message.error(res.data.msg);
//         //         }
//         //         dispatch(getInsureRecord());
//         //     })
//         //     .catch(err => {
//         //         message.error(err.response.data.msg);
//         //     });
//     };

// };

//改变选中的清单详情
export const chageInsureDetail = result => {
    let title = `投保记录>记录清单（
                        所属批次：${result.batchNumber}，
                        共 ${result.insuredTotal}人，正常人数`;
    if (result.insuredSuccess == null) {
        title += `0，异常人数`;
    } else {
        title += `${result.insuredSuccess}，异常人数`;
    }
    if (result.insuredFail == null) {
        title += `0）`;
    } else {
        title += `${result.insuredFail}）`;
    }
    return {
        type: actionTypes.CHAGE_INSUREDETAIL,
        modalInfo: result,
        modalTitle: title,
        isPageLoading: false
    };
};
// // 选中的清单详情
export const getInsureDetail = id => {
    return dispatch => {
        axios
            .get(`/v999/doctor/InsuredBatchs/${id}`)
            .then(res => {
                dispatch(chageInsureDetail(res.data.data));
                //清单列表
                let _para = {
                    batchId: res.data.data.id,
                    batchStatus: res.data.data.batchStatus,
                    pageNum: 1
                };
                dispatch(showPageLoading(true));
                dispatch(getResultDetailList(_para));
            })
            .catch(err => {
                message.error(err.response.data.msg);
            });
    };
};

//改变选中的清单列表
export const chageInsureList = result => {
    return {
        type: actionTypes.CHAGE_INSURELIST,
        modalList: result.list,
        modalPageTotal: result.total,
        isPageLoading: false
    };
};
// // 选中的清单列表
export const getResultDetailList = _para => {
    let _param = "";
    if (_para.batchId) {
        _param += `batchId=${_para.batchId}&`;
    }
    if (_para.batchStatus) {
        _param += `batchStatus=${_para.batchStatus}&`;
    }
    if (_para.itemType) {
        _param += `itemType=${_para.itemType}&`;
    }
    if (_para.dataCheckType) {
        _param += `dataCheckType=${_para.dataCheckType}&`;
    }
    if (_para.pageNum) {
        _param += `pageNum=${_para.pageNum}&`;
    }
    return dispatch => {
        axios
            .get(
                `/v999/doctor/insuredBatchresults/getBatchDetailResultList?${_param}pageSize=10&orderBy=b.INSURED_TIME desc`
            )
            .then(res => {
                res.data.data.list.map(item => {
                    item.key = item.id;
                });
                dispatch(chageInsureList(res.data.data));
            })
            .catch(err => {
                message.error(err.response.data.msg);
            });
    };
};
//改变选中的清单列表的详情
export const chageModalData = result => {
    return {
        type: actionTypes.CHAGE_MODALDATA,
        modalData: result,
        isPageLoading: false
    };
};
// // 选中的清单列表的详情
export const getModalData = para => {
    return dispatch => {
        axios
            .get(
                `/v999/doctor/insuredBatchresults/getInsuredOrderBatchResultDetail?batchId=${
                    para.batchId
                }&batchStatus=${para.batchStatus}&barcode=${para.barcode}`
            )
            .then(res => {
                dispatch(chageModalData(res.data.data));
            })
            .catch(err => {
                message.error(err.response.data.msg);
            });
    };
};

//是否显示投保modal
export const showInsureModal = flag => {
    return {
        type: actionTypes.SHOW_INSUREMODAL,
        isShowInsureModal: flag
    };
};
//设置投保的数据keys
export const setInsureRowKeys = list => {
    return {
        type: actionTypes.SET_INSURE_ROWKEYS,
        insureRowKeys: list,
        pageLoading:false,
    };
};
//展示modal loading
export const showModalLoading = isshow => {
    return {
        type: actionTypes.SHOW_PAGE_LOADING,
        modalLoading: isshow
    };
};