import { fromJS } from "immutable";
import { actionTypes } from "./interface";

const defaultState = fromJS({
    tableData: [],
    loading: false,
    pageTotal: 0,
    queryCriteria: {}
});


export default (state = defaultState, action) => {
    switch (action.type) {
    case actionTypes.CHANGE_ACTION: //改变列表查询结果
        return state.merge({
            tableData: action.tableData,
            pageTotal: action.pageTotal,
            loading: action.isTableLoading
        });

    case actionTypes.SHOW_LOADING: // 显示列表加载框
        return state.merge({
            loading: action.isTableLoading
        });
    case actionTypes.CHANGE_QUERYCRITERIA: // 改变列表查询条件
        return state.merge({
            queryCriteria: action.queryCriteria
        });
    default:
        return state;
    }
};
