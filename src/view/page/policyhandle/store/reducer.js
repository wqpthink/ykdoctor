import { fromJS } from "immutable";
import { actionTypes } from "./interface";

const defaultState = fromJS({
    insureHandleList: [],
    pageLoading: false,
    listTotal: 0,
    currentPage: 1,
    queryCriteria: {},
    isSelectAll: false,
    selectedRowKeys: [],
    selectedRows: [],
    batchRows: [],
    // detail modal
    isShowDetail: false,
    detailInfo: {},

    //batch modal
    isShowBatch: false,
    modalLoading: false,
    batchList: [],
    batchNo: "",

    //NoDeal
    noDealList: [],
    isShowNoDeal: false,

    //Modify info
    isShowModify: false,
    modifyInfo: {},
    //againInsure
    againInsureList: [],
    inlineIds: [],//线下投保
    isConfirm:false

});


export default (state = defaultState, action) => {
    switch (action.type) {
    case actionTypes.INIT_STORE: // 初始化所有store数据
        return defaultState;
    case actionTypes.CHANGE_LISTDATA: //改变列表查询结果
        return state.merge({
            insureHandleList: action.insureHandleList,
            listTotal: action.listTotal,
            pageLoading: action.pageLoading,
            currentPage: action.currentPage,
            selectedRowKeys: action.selectedRowKeys,
        });

    case actionTypes.SHOW_MODALLOADING: // 显示modal加载框
        return state.merge({
            modalLoading: action.modalLoading
        });
    case actionTypes.SHOW_PAGE_LOADING: // 显示页面加载框
        return state.merge({
            pageLoading: action.pageLoading
        });
    case actionTypes.CHANGE_QUERYCRITERIA: // 改变列表查询条件
        return state.merge({
            queryCriteria: action.queryCriteria
        });
    case actionTypes.SHOW_DETAIL: // 展示详情
        return state.merge({
            isShowDetail: action.isShowDetail
        });
    case actionTypes.CHAGE_DETAIL: // 改变详情
        return state.merge({
            detailInfo: action.detailInfo,
            pageLoading: action.pageLoading
        });
    case actionTypes.CHANGE_SELECTALL: // 改变选择全部状态
        return state.merge({
            isSelectAll: action.isSelectAll
        });
    case actionTypes.SET_SELECT_ROWS: // 改变选中项
        return state.merge({
            selectedRowKeys: action.selectedRowKeys,
            selectedRows: action.selectedRows
        });
    case actionTypes.SHOW_BATCHLIST: // 展示批次列表
        return state.merge({
            isShowBatch: action.isShowBatch,
        });
    case actionTypes.CHAGE_BATCHLIST: //改变批次列表
        return state.merge({
            batchList: action.batchList
        });
    case actionTypes.CHAGE_BATCHNO: //改变批次号
        return state.merge({
            batchNo: action.batchNo,
            pageLoading: action.pageLoading,
        });
        /**
        * 异常信息-需处理
        */
    case actionTypes.CHAGE_NODEALLIST: //改变无需处理数据
        return state.merge({
            noDealList: action.noDealList,
        });
    case actionTypes.SHOW_NODEAL: //展示无需处理理由
        return state.merge({
            isShowNoDeal: action.isShowNoDeal,
        });
    case actionTypes.SHOW_MODIFY: //展示修改详情
        return state.merge({
            isShowModify: action.isShowModify,
        });
    case actionTypes.CHAGE_MODIFYINFO: //改变修改的详情
        return state.merge({
            modifyInfo: action.modifyInfo,
            pageLoading: action.pageLoading,
        });
        /**
         * 异常信息-再次投保
         */
    case actionTypes.CHAGE_AGAININSURELIST: //改变再次投保列表查询结果
        return state.merge({
            againInsureList: action.againInsureList,
            listTotal: action.listTotal,
            pageLoading: action.pageLoading,
            currentPage: action.currentPage,
        });
    case actionTypes.CHAGE_INLINEIDS: //改变再次投保列表查询结果 选择全部
        return state.merge({
            inlineIds: action.inlineIds,
            pageLoading: action.pageLoading,
        });
    case actionTypes.SHOW_CONFIRM: //改变再次投保列表查询结果 选择全部
        return state.merge({
            isConfirm: action.isConfirm,
        });
    default:
        return state;
    }
};
