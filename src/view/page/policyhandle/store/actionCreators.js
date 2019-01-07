import axios from "axios";
//import * as actionTypes from './actionTypes';
import { actionTypes } from "./interface";
import { message } from "antd";

//初始化所有store数据
export const initStore = () => {
    return {
        type: actionTypes.INIT_STORE
    };
};

//createAction
// 查询列表
export const getInsureHandle = (
    param = { pageSize: "10", dataCheckType: "1" },
    isSelectAll = false
) => {
    return dispatch => {
        let temp = `dataCheckType=${param.dataCheckType}`;
        if (param.barcode) {
            temp += `&barcode=${param.barcode}`;
        }
        if (param.applayNum) {
            temp += `&applayNum=${param.applayNum}`;
        }
        if (param.examinerName) {
            temp += `&examinerName=${param.examinerName}`;
        }
        if (param.examinerPhone) {
            temp += `&examinerPhone=${param.examinerPhone}`;
        }
        if (param.credentialsNumber) {
            temp += `&credentialsNumber=${param.credentialsNumber}`;
        }
        if (param.itemTypeId) {
            temp += `&itemTypeId=${param.itemTypeId}`;
        }
        if (param.startTime) {
            temp += `&startTime=${param.startTime}`;
        }
        if (param.endTime) {
            temp += `&endTime=${param.endTime}`;
        }
        if (param.requestStartTime) {
            temp += `&requestStartTime=${param.requestStartTime}`;
        }
        if (param.requestEndTime) {
            temp += `&requestEndTime=${param.requestEndTime}`;
        }
        if (param.irregularType) {
            temp += `&irregularType=${param.irregularType}`;
        }
        if (param.pageSize) {
            temp += `&pageSize=${param.pageSize}`;
        }
        if (param.pageNum) {
            temp += `&pageNum=${param.pageNum}`;
        }
        axios
            .get(
                `/v999/doctor/insuredVerufyinfos/?${temp}&orderBy=create_date desc`
            )
            .then(res => {
                if (res.data.code == 0) {
                    res.data.data.list.map(item => {
                        item.key = item.id;
                    });
                    dispatch(getListChangeAction(res.data.data, isSelectAll));
                } else {
                    message.error(res.data.msg);
                }
            })
            .catch(err => {
                message.error(err.response.data.msg);
            });
    };
};

//生成批次时 ，选择全部 生成2000条
export const getBatchSelectList = param => {
    return dispatch => {
        let temp = `dataCheckType=${param.dataCheckType}`;
        if (param.barcode) {
            temp += `&barcode=${param.barcode}`;
        }
        if (param.applayNum) {
            temp += `&applayNum=${param.applayNum}`;
        }
        if (param.examinerName) {
            temp += `&examinerName=${param.examinerName}`;
        }
        if (param.examinerPhone) {
            temp += `&examinerPhone=${param.examinerPhone}`;
        }
        if (param.credentialsNumber) {
            temp += `&credentialsNumber=${param.credentialsNumber}`;
        }
        if (param.itemTypeId) {
            temp += `&itemTypeId=${param.itemTypeId}`;
        }
        if (param.startTime) {
            temp += `&startTime=${param.startTime}`;
        }
        if (param.endTime) {
            temp += `&endTime=${param.endTime}`;
        }
        if (param.requestStartTime) {
            temp += `&requestStartTime=${param.requestStartTime}`;
        }
        if (param.requestEndTime) {
            temp += `&requestEndTime=${param.requestEndTime}`;
        }
        if (param.irregularType) {
            temp += `&irregularType=${param.irregularType}`;
        }
        if (param.pageSize) {
            temp += `&pageSize=${param.pageSize}`;
        }
        if (param.pageNum) {
            temp += `&pageNum=${param.pageNum}`;
        }
        axios
            .get(
                `/v999/doctor/insuredVerufyinfos/?${temp}&orderBy=create_date desc`
            )
            .then(res => {
                if (res.data.code == 0) {
                    let list = res.data.data.list;
                    dispatch(geneBatchNo(list.length));
                    dispatch(chageBatchList(list));
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
export const getListChangeAction = (result, isSelectAll) => {
    if (isSelectAll) {
        let keys = [];
        result.list.map(item => {
            keys.push(item.id);
        });
        return dispatch => {
            dispatch({
                type: actionTypes.CHANGE_LISTDATA,
                insureHandleList: result.list,
                listTotal: result.total,
                currentPage: result.pageNum,
                pageLoading: false,
                selectedRowKeys: keys
            });
        };
    } else {
        return dispatch => {
            dispatch({
                type: actionTypes.CHANGE_LISTDATA,
                insureHandleList: result.list,
                listTotal: result.total,
                currentPage: result.pageNum,
                pageLoading: false,
                selectedRowKeys: []
            });
            return result;
        };
    }
    // return {
    //     type: actionTypes.CHANGE_LISTDATA,
    //     insureHandleList: result.list,
    //     listTotal: result.total,
    //     currentPage: result.pageNum,
    //     pageLoading: false,
    // };
};

//展示列表loading
export const showPageLoading = isshow => {
    return {
        type: actionTypes.SHOW_PAGE_LOADING,
        pageLoading: isshow
    };
};

//展示modal loading
export const showModalLoading = isshow => {
    return {
        type: actionTypes.SHOW_MODALLOADING,
        modalLoading: isshow
    };
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

// 改变选中项
export const selectRows = (selectedRowKeys, selectedRows) => {
    return {
        type: actionTypes.SET_SELECT_ROWS,
        selectedRowKeys: selectedRowKeys,
        selectedRows: selectedRows
    };
};

//展示详情
export const showDetail = isshow => {
    return {
        type: actionTypes.SHOW_DETAIL,
        isShowDetail: isshow
    };
};

//查询详情
export const getInsureDetail = id => {
    return dispatch => {
        axios
            .get(`/v999/doctor/insuredVerufyinfos/${id}`)
            .then(res => {
                if (res.data.code == 0) {
                    dispatch(chageDetail(res.data.data));
                    dispatch(showPageLoading(false));
                } else {
                    message.error(res.data.msg);
                }
            })
            .catch(err => {
                message.error(err.response.data.msg);
            });
    };
};

//改变选中的详情
export const chageDetail = result => {
    return {
        type: actionTypes.CHAGE_DETAIL,
        detailInfo: result,
        pageLoading: false
    };
};

//展示批次列表
export const showBatchList = val => {
    return {
        type: actionTypes.SHOW_BATCHLIST,
        isShowBatch: val
    };
};

//改变批次列表
export const chageBatchList = result => {
    return {
        type: actionTypes.CHAGE_BATCHLIST,
        batchList: result
    };
};

//查询批次号码
export const geneBatchNo = insuredCount => {
    return dispatch => {
        dispatch(showPageLoading(true));
        axios
            .get(
                `/v999/doctor/InsuredBatchs/getBatchNumber?insuredCount=${insuredCount}`
            )
            .then(res => {
                if (res.data.code == 0) {
                    dispatch(showPageLoading(false));
                    dispatch(chageBatchNo(res.data.data.batchNumber));
                    dispatch(showBatchList(true));
                } else {
                    message.error(res.data.msg);
                }
            })
            .catch(err => {
                message.error(err.response.data.msg);
            });
    };
};
//改变批次号码
export const chageBatchNo = result => {
    return {
        type: actionTypes.CHAGE_BATCHNO,
        batchNo: result,
        pageLoading: false
    };
};

//提交生成批次
export const submitBatchNo = (operatorName, list) => {
    return dispatch => {
        dispatch(showPageLoading(true));
        axios
            .post(
                `/v999/doctor/InsuredBatchs/create?operator=${operatorName}`,
                list
            )
            .then(res => {
                if (res.data.code == 0) {
                    dispatch(showPageLoading(false));
                    dispatch(getInsureHandle());
                    dispatch(showBatchList(false));
                    dispatch(changeSelectAll(false));
                    message.success("批次生成功");
                } else {
                    message.error(res.data.msg);
                }
            })
            .catch(err => {
                message.error(err.response.data.msg);
            });
    };
};

/**
 * 异常信息-需处理
 */
//运管信息
export const getYKDetail = id => {
    return dispatch => {
        dispatch(showPageLoading(true));
        axios
            .get(`/v999/doctor/insuredVerufyinfos/getInsuredYgOrder/${id}`)
            .then(res => {
                if (res.data.code == 0) {
                    dispatch(showPageLoading(false));
                    dispatch(chageDetail(res.data.data));
                    dispatch(showDetail(true));
                } else {
                    message.error(res.data.msg);
                }
            })
            .catch(err => {
                message.error(err.response.data.msg);
            });
    };
};

//康源信息
export const getKYDetail = id => {
    return dispatch => {
        dispatch(showPageLoading(true));
        axios
            .get(`/v999/doctor/insuredVerufyinfos/getInsuredNipOrder/${id}`)
            .then(res => {
                if (res.data.code == 0) {
                    dispatch(showPageLoading(false));
                    dispatch(chageDetail(res.data.data));
                    dispatch(showDetail(true));
                } else {
                    message.error(res.data.msg);
                }
            })
            .catch(err => {
                message.error(err.response.data.msg);
            });
    };
};

//生成批次时 ，选择全部 生成2000条  noDealList为选择的无需处理的数据
export const getNoDealSelectList = param => {
    return dispatch => {
        let temp = `dataCheckType=${param.dataCheckType}`;
        if (param.barcode) {
            temp += `&barcode=${param.barcode}`;
        }
        if (param.applayNum) {
            temp += `&applayNum=${param.applayNum}`;
        }
        if (param.examinerName) {
            temp += `&examinerName=${param.examinerName}`;
        }
        if (param.examinerPhone) {
            temp += `&examinerPhone=${param.examinerPhone}`;
        }
        if (param.credentialsNumber) {
            temp += `&credentialsNumber=${param.credentialsNumber}`;
        }
        if (param.itemTypeId) {
            temp += `&itemTypeId=${param.itemTypeId}`;
        }
        if (param.startTime) {
            temp += `&startTime=${param.startTime}`;
        }
        if (param.endTime) {
            temp += `&endTime=${param.endTime}`;
        }
        if (param.requestStartTime) {
            temp += `&requestStartTime=${param.requestStartTime}`;
        }
        if (param.requestEndTime) {
            temp += `&requestEndTime=${param.requestEndTime}`;
        }
        if (param.irregularType) {
            temp += `&irregularType=${param.irregularType}`;
        }
        if (param.pageSize) {
            temp += `&pageSize=${param.pageSize}`;
        }
        if (param.pageNum) {
            temp += `&pageNum=${param.pageNum}`;
        }
        axios
            .get(
                `/v999/doctor/insuredVerufyinfos/?${temp}&orderBy=create_date desc`
            )
            .then(res => {
                dispatch(showPageLoading(false));
                if (res.data.code == 0) {
                    let list = res.data.data.list;
                    dispatch(chageNoDealList(list));
                    dispatch(showNoDeal(true));
                } else {
                    message.error(res.data.msg);
                }
            })
            .catch(err => {
                message.error(err.response.data.msg);
            });
    };
};

//改变无需处理数据
export const chageNoDealList = result => {
    return {
        type: actionTypes.CHAGE_NODEALLIST,
        noDealList: result
    };
};

//展示无需处理理由
export const showNoDeal = val => {
    return {
        type: actionTypes.SHOW_NODEAL,
        isShowNoDeal: val
    };
};
//提交 无需处理理由
export const submitNoDeal = _para => {
    return dispatch => {
        dispatch(showModalLoading(true));
        axios
            .patch(`/v999//doctor/insuredVerufyinfos/modifyProcessing?ids=${_para.ids}&nohandleReason=${_para.nohandleReason}&nohandleRemarks=${_para.nohandleRemarks}`,
                _para
            )
            .then(res => {
                if (res.data.code == 0) {
                    message.success("提交成功!");
                    dispatch(changeSelectAll(false));
                    dispatch(showNoDeal(false));
                    dispatch(showModalLoading(false));
                } else {
                    message.error(res.data.msg);
                }
            })
            .catch(err => {
                message.error(err.response.data.msg);
            });
    };
};

//展示修改详情
export const showModify = isshow => {
    return {
        type: actionTypes.SHOW_MODIFY,
        isShowModify: isshow
    };
};

//改变修改的详情
export const chageModifyInfo = result => {
    return {
        type: actionTypes.CHAGE_MODIFYINFO,
        modifyInfo: result,
        pageLoading: false
    };
};

//提交 修改的详情
export const submitModifyInfo = _para => {
    return dispatch => {
        dispatch(showModalLoading(true));
        axios
            .put(`/v999//doctor/insuredVerufyinfos/${_para.id}`, _para)
            .then(res => {
                if (res.data.code == 0) {
                    message.success("提交成功!");
                    dispatch(showModify(false));
                    dispatch(showModalLoading(false));
                } else {
                    message.error(res.data.msg);
                }
            })
            .catch(err => {
                message.error(err.response.data.msg);
            });
    };
};

//信息导入 excel
export const importErorrExcel = formatData => {
    return dispatch => {
        dispatch(showPageLoading(true));
        axios
            .post(`/v999/doctor/insured/excel/execExcelImport/`, formatData, {
                headers: {
                    Accept: "application/json",
                    "If-Modified-Since": "0"
                }
            })
            .then(res => {
                if (res.data.code == 0) {
                    message.success(res.data.msg);
                    dispatch(showPageLoading(false));
                    dispatch(
                        getInsureHandle({
                            dataCheckType: "01",
                            pageNum: 1,
                            pageSize: 10
                        })
                    );
                } else {
                    message.error(res.data.msg);
                }
            })
            .catch(err => {
                message.error(err.response.data.msg);
            });
    };
};

/**
 * 异常信息-再次投保
 */

// 查询异常信息-再次投保列表
export const getAgainInsureList = (param = { pageSize: 10, pageNum: 1 }, isSelectAll = false, type = "1") => {
    return dispatch => {
        let temp = "";
        if (param.barcode) {
            temp += `&barcode=${param.barcode}`;
        }
        if (param.dataCheckType) {
            temp += `dataCheckType=${param.dataCheckType}`;
        }

        if (param.offlineStatus) {
            temp += `&offlineStatus=${param.offlineStatus}`;
        }
        if (param.pageSize) {
            temp += `&pageSize=${param.pageSize}`;
        }
        if (param.pageNum) {
            temp += `&pageNum=${param.pageNum}`;
        }
        axios
            .get(
                `/v999/doctor/abnormalAgainInfo/?${temp}&orderBy=createDate desc`
            )
            .then(res => {
                if (res.data.code == 0) {
                    let ids = "";
                    res.data.data.list.map(item => {
                        item.key = item.id;
                        ids += `,${item.id}`;
                    });
                    if (type == "1") {
                        dispatch(getAgainInsureListChangeAction(res.data.data, isSelectAll));
                    } else if (type == "2") {
                        dispatch(getInlineIdsChangeAction(ids));
                        dispatch(showConfirm(true));
                    }

                } else {
                    message.error(res.data.msg);
                }
            })
            .catch(err => {
                message.error(err.response.data.msg);
            });
    };
};

//改变再次投保列表查询结果
export const getAgainInsureListChangeAction = (result, isSelectAll) => {
    if (isSelectAll) {
        let keys = [];
        result.list.map(item => {
            keys.push(item.id);
        });
        return dispatch => {
            dispatch({
                type: actionTypes.CHAGE_AGAININSURELIST,
                againInsureList: result.list,
                listTotal: result.total,
                currentPage: result.pageNum,
                pageLoading: false,
                selectedRowKeys: keys
            });
        };
    } else {
        return dispatch => {
            dispatch({
                type: actionTypes.CHAGE_AGAININSURELIST,
                againInsureList: result.list,
                listTotal: result.total,
                currentPage: result.pageNum,
                pageLoading: false,
                selectedRowKeys: []
            });
            return result;
        };
    }
    // return {
    //     type: actionTypes.CHANGE_LISTDATA,
    //     insureHandleList: result.list,
    //     listTotal: result.total,
    //     currentPage: result.pageNum,
    //     pageLoading: false,
    // };
};
//改变线下投保2000条查询结果 选择全部
export const getInlineIdsChangeAction = result => {
    return {
        type: actionTypes.CHAGE_INLINEIDS,
        inlineIds: result,
        pageLoading: false
    };
};

//展示确认对话框
export const showConfirm = val => {
    return {
        type: actionTypes.SHOW_CONFIRM,
        isConfirm: val
    };
};

//异常再次（线下）投保信息表
export const inlineInsureList = (param) => {
    return dispatch => {
        axios
            .patch(
                `/v999//doctor/abnormalAgainInfo/offlineInsureds?ids=${param.ids}&offlineStatus=1`,
                param
            )
            .then(res => {
                if (res.data.code == 0) {
                    message.success("线下投保成功!");
                    dispatch(changeSelectAll(false));
                    dispatch(showModalLoading(false));
                    dispatch(showConfirm(false));
                } else {
                    message.error(res.data.msg);
                }
            })
            .catch(err => {
                message.error(err.response.data.msg);
            });
    };
};

//查询详情
export const getInlineInsureDetail = id => {
    return dispatch => {
        axios
            .get(`/v999/doctor/abnormalAgainInfo/${id}`)
            .then(res => {
                if (res.data.code == 0) {
                    dispatch(chageDetail(res.data.data));
                    dispatch(showPageLoading(false));
                    dispatch(showDetail(true));
                } else {
                    message.error(res.data.msg);
                }
            })
            .catch(err => {
                message.error(err.response.data.msg);
            });
    };
};