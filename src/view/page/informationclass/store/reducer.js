import { fromJS } from "immutable";
import { actionTypes } from "./interface";

const defaultState = fromJS({
    classTyprList: [],
    isPageLoading: false,
    listTotal: 0,
    currentPage: 1,
    queryCriteria: {},
    modalInfo: {},
    modalData: {
        appCode:"",
        careerType:"",
        grade:"",
        hasSubClassification:"",
        id:"",
        name:"",
        parentId:"-1",
        parentName:"无",
        sort:"",
        status:""
    },
    classifications: [],
    isShowModal: false,
    modalLoading: false
});

export default (state = defaultState, action) => {
    switch (action.type) {
    case actionTypes.CHANGE_ACTION: //改变列表查询结果
        return state.merge({
            classTyprList: action.classTyprList,
            listTotal: action.listTotal,
            isPageLoading: action.isPageLoading,
            currentPage: action.currentPage
        });
    case actionTypes.SHOW_PAGE_LOADING: // 显示页面加载框
        return state.merge({
            isPageLoading: action.isPageLoading
        });
    case actionTypes.CHANGE_QUERYCRITERIA: // 改变列表查询条件
        return state.merge({
            queryCriteria: action.queryCriteria
        });
    case actionTypes.SHOW_MODAL: // 显示modal
        return state.merge({
            isShowModal: action.isShowModal
        });
    case actionTypes.CHAGE_MODALINFO: //改变选中modal的详情
        return state.merge({
            modalInfo: action.modalInfo,
            isPageLoading: action.isPageLoading
        });
    case actionTypes.SHOW_MODALLOADING: // 展示modal加载框
        return state.merge({
            modalLoading: action.modalLoading
        });
    case actionTypes.CHAGE_CLASSIFICATIONS: // 改变一级分类
        return state.merge({
            classifications: action.classifications,
            isPageLoading: action.isPageLoading
        });
    case actionTypes.CHAGE_MODALDATA: // 改变选中modal内容的详情
        return state.merge({
            modalData: action.modalData,
            isPageLoading: action.isPageLoading,
            isShowModal:action.isShowModal
        });
    default:
        return state;
    }
};
