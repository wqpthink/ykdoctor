import { fromJS } from "immutable";
import { actionTypes } from "./interface";

const defaultState = fromJS({
    insureRecord: [],
    isTableLoading: false,
    listTotal: 0,
    currentPage:1,
    modalPageTotal: 0,
    queryCriteria: {},
    isSelectAll: false,
    selectedRowKeys: [],
    selectedRows: [],
    insureRowKeys: [],
    modalList: [],
    modalInfo: {},
    modalData: {},
    pageLoading: false,
    modalTitle: '',
    isShowInsureModal: false,
    modalLoading: false,

});


export default (state = defaultState, action) => {
    switch (action.type) {
    case actionTypes.CHANGE_ACTION: //改变列表查询结果
        return state.merge({
            insureRecord: action.insureRecord,
            listTotal: action.listTotal,
            pageLoading: action.pageLoading,
            currentPage: action.currentPage,
            selectedRowKeys: action.selectedRowKeys,
        });

    case actionTypes.SHOW_LOADING: // 显示列表加载框
        return state.merge({
            isTableLoading: action.isTableLoading
        });
    case actionTypes.SHOW_PAGE_LOADING: // 显示页面加载框
        return state.merge({
            pageLoading: action.isPageLoading
        });
    case actionTypes.CHANGE_QUERYCRITERIA: // 改变列表查询条件
        return state.merge({
            queryCriteria: action.queryCriteria
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
    case actionTypes.CHAGE_INSUREDETAIL: //改变选中的清单详情包括列表
        return state.merge({
            modalInfo: action.modalInfo,
            modalTitle: action.modalTitle,
            pageLoading: action.isPageLoading
        });
    case actionTypes.CHAGE_INSURELIST: //改变选中的清单列表
        return state.merge({
            modalList: action.modalList,
            modalPageTotal: action.modalPageTotal,
            pageLoading: action.isPageLoading
        });
    case actionTypes.CHAGE_MODALDATA: //改变选中的清单列表的详情
        return state.merge({
            modalData: action.modalData,
            pageLoading: action.isPageLoading
        });
    case actionTypes.SHOW_INSUREMODAL: // 是否显示投保modal
        return state.merge({
            isShowInsureModal: action.isShowInsureModal
        });
    case actionTypes.SET_INSURE_ROWKEYS: // 设置投保的数据keys
        return state.merge({
            insureRowKeys: action.insureRowKeys,
            pageLoading:action.pageLoading,
        });
    case actionTypes.SHOW_MODALLOADING: // 展示modal加载框
        return state.merge({
            modalLoading: action.modalLoading
        });
    default:
        return state;
    }
};
