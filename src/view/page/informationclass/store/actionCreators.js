import axios from "axios";
//import * as actionTypes from './actionTypes';
import { actionTypes } from "./interface";
import { message } from "antd";

//createAction
// 查询列表

export const getInfoClass = (_para = { pageSize: "10", pageNum: 1 }) => {
    return dispatch => {
        let _param = "";
        if (_para.name) {
            _param += `name=${_para.name}&`;
        }
        if (_para.appCode) {
            _param += `appCode=${_para.appCode}&`;
        }
        if (_para.careerType) {
            _param += `careerType=${_para.careerType}&`;
        }
        if (_para.status) {
            _param += `status=${_para.status}&`;
        }
        if (_para.pageSize) {
            _param += `pageSize=${_para.pageSize}&`;
        }
        if (_para.pageNum) {
            _param += `pageNum=${_para.pageNum}&`;
        }
        axios
            .get(
                `/v999/doctor/m/classifications/?${_param}orderBy=sort&orderBy=createDate desc`
            )
            .then(res => {
                if (res.data.code == 0) {
                    res.data.data.list.map(item => {
                        item.key = item.id;
                    });
                    res.data.data.total = (res.data.data.pageSize) * (res.data.data.pages);
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
export const getListChangeAction = result => {
    return {
        type: actionTypes.CHANGE_ACTION,
        classTyprList: result.list,
        listTotal: result.total,
        currentPage: result.pageNum,
        isPageLoading: false
    };
};

// 改变列表查询条件
export const changeQueryCriteria = queryCriteria => {
    return {
        type: actionTypes.CHANGE_QUERYCRITERIA,
        queryCriteria: queryCriteria
    };
};

//展示页面loading
export const showPageLoading = isshow => {
    return {
        type: actionTypes.SHOW_PAGE_LOADING,
        isPageLoading: isshow
    };
};

/*
 *modal详情
 */
//是否显示modal详情
export const showModal = flag => {
    return {
        type: actionTypes.SHOW_MODAL,
        isShowModal: flag
    };
};

// // 咨询分类详情
export const getClassDetail = id => {
    return dispatch => {
        axios
            .get(`/v999/doctor/m/classifications/${id}`)
            .then(res => {
                dispatch(chageModalData(res.data.data));
                //dispatch(showModal(true));
            })
            .catch(err => {
                message.error(err.response.data.msg);
            });
    };
};

// // 获取一级分类
export const getClassificationsRoot = () => {
    return dispatch => {
        axios
            .get(`/v999/doctor/m/classifications/root`)
            .then(res => {
                dispatch(chageClassifications(res.data.data));
            })
            .catch(err => {
                message.error(err.response.data.msg);
            });
    };
};

//改变选中modal内容的详情
export const chageModalData = (result = {
    appCode: "",
    careerType: "",
    grade: "",
    hasSubClassification: "",
    id: "",
    name: "",
    parentId: "-1",
    parentName: "无",
    sort: "",
    status: ""
}) => {
    return {
        type: actionTypes.CHAGE_MODALDATA,
        modalData: result,
        isPageLoading: false,
        isShowModal: true
    };
};
//改变选中modal的详情
export const chageModalInfo = result => {
    return {
        type: actionTypes.CHAGE_MODALINFO,
        modalInfo: result,
        isPageLoading: false
    };
};
//改变一级分类
export const chageClassifications = result => {
    return {
        type: actionTypes.CHAGE_CLASSIFICATIONS,
        classifications: result,
        isPageLoading: false
    };
};
//展示modal loading
export const showModalLoading = isshow => {
    return {
        type: actionTypes.SHOW_MODALLOADING,
        modalLoading: isshow
    };
};
//保存 modal信息
export const addModal = parm => {
    return dispatch => {
        dispatch(showModalLoading(true));
        axios
            .post(
                `/v999/doctor/m/classifications/`,
                parm
            )
            .then(res => {
                dispatch(showModalLoading(false));
                if (res.data.code == 0) {
                    message.success("提交成功!");
                    dispatch(showModal(false));
                    dispatch(getInfoClass());
                } else {
                    message.error(res.data.msg);
                }
            })
            .catch(err => {
                dispatch(showModalLoading(false));
                message.error(err.response.data.msg);
            });
    };
};

//修改 modal信息
export const modifyModal = parm => {
    return dispatch => {
        dispatch(showModalLoading(true));
        axios
            .patch(
                `/v999/doctor/m/classifications/${parm.id}`,
                parm
            )
            .then(res => {
                dispatch(showModalLoading(false));
                if (res.data.code == 0) {
                    message.success("提交成功!");
                    dispatch(showModal(false));
                    dispatch(getInfoClass());
                } else {
                    message.error(res.data.msg);
                }
            })
            .catch(err => {
                dispatch(showModalLoading(false));
                message.error(err.response.data.msg);
            });
    };
};

/*
 *列表操作
 */
//禁用
export const changeStatus = parm => {
    return dispatch => {
        dispatch(showPageLoading(true));
        axios
            .patch(
                `/v999/doctor/m/classifications/${parm.id}/${parm.status}`,
                parm
            )
            .then(res => {
                if (res.data.code == 0) {
                    message.success("提交成功!");
                    dispatch(showPageLoading(false));
                    dispatch(getInfoClass());
                } else {
                    message.error(res.data.msg);
                }
            })
            .catch(err => {
                message.error(err.response.data.msg);
            });
    };
};
//删除
export const deleteItem = id => {
    return dispatch => {
        dispatch(showPageLoading(true));
        axios
            .delete(`/v999/doctor/m/classifications/${id}`)
            .then(res => {
                if (res.data.code == 0) {
                    message.success("删除成功!");
                    dispatch(showPageLoading(false));
                    dispatch(getInfoClass());
                } else {
                    message.error(res.data.msg);
                }
            })
            .catch(err => {
                message.error(err.response.data.msg);
            });
    };
};
