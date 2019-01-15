import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Table, Modal, Button, Pagination, Row, Col, Spin } from "antd";
import { PageWrapper } from "./informationclass-style";
import AdvancedSearchForm from "./queryForm";
import ModifyInfo from "./modalInfo";
import StringUtil from "../../../util/StringUtil";
import { actionCreators } from "./store/interface";

const defaultString = StringUtil.defaultString;

class InformationClass extends PureComponent {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "序号",
                dataIndex: "index",
                width: 60,
                align: "center",
                render: (text, record, index) => <span>{index + 1}</span>
            },
            {
                title: "分类名称",
                dataIndex: "name",
                width: 200,
                align: "center"
            },
            {
                title: "上级分类",
                dataIndex: "parentName",
                width: 200,
                align: "center",
                render: (text, record) => (
                    <span>{defaultString(record["parentName"], "无")}</span>
                )
            },
            {
                title: "访问入口",
                dataIndex: "appCode",
                width: 200,
                align: "center",
                render: (text, record, index) => {
                    if (record["appCode"]) {
                        let appCodeList = record["appCode"].split(",");
                        return (<span>{appCodeList.map(item => {
                            return this.renderCode(item);
                        })}</span>);
                    } else {
                        return (<span>无</span>);
                    }

                },
            },
            {
                title: "授权身份",
                dataIndex: "careerType",
                width: 100,
                align: "center",
                render: (text, row, index) => {
                    if (row["careerType"]) {
                        let appCodeList = row["careerType"].split(",");
                        return (<span>{appCodeList.map(item => {
                            return this.renderCareerType(item);
                        })}</span>);
                    } else {
                        return (<span>无</span>);
                    }
                },
            },
            {
                title: "排序",
                dataIndex: "sort",
                width: 60,
                align: "center"
            },
            {
                title: "创建时间",
                width: 150,
                align: "center",
                dataIndex: "createDate"
            },
            {
                title: "状态",
                dataIndex: "status",
                width: 120,
                align: "center",
                render: (text, record) => (
                    <span>{this.renderStatus(record["status"])}</span>
                )
            },
            {
                title: "操作",
                align: "center",
                render: (text, record) => {
                    return (
                        <span>
                            <a
                                href="javascript:void(0);"
                                className="c-red mrgR10px"
                                onClick={() => this.modify(record)}>
                                修改
                                </a>
                            <a
                                href="javascript:void(0);"
                                className="c-red mrgR10px"
                                onClick={() => this.reset(record)}>
                                {record["status"] == "1" ? "禁用" : "启用"}
                            </a>
                            <a
                                href="javascript:void(0);"
                                className="c-red mrgR10px"
                                onClick={() => this.delete(record)}>
                                删除
                                </a>
                        </span>
                    );
                },
                width: 100
            }
        ];
    }

    state = {
        visible: false,
        title: "",
        modalItem: "",
        modalStatus: ""
    };

    componentDidMount() {
        this.props.showPageLoading(true);
        this.props.getInfoClass();
    }

    //访问入口
    renderCode = item => {

        if (item == 1) {
            return <p>云康医生</p>;
        } else if (item == 2) {
            return <p>云康服务</p>;
        } else if (item == 3) {
            return <p>云康社区</p>;
        } else if (item == 4) {
            return <p>微信公众号</p>;
        }
    };

    //授权身份
    renderCareerType = item => {
        if (item == 1) {
            return <p>合作医生</p>;
        } else if (item == 2) {
            return <p>认证医生</p>;
        } else if (item == 3) {
            return <p>社区医生</p>;
        } else if (item == 4) {
            return <p>普通医生</p>;
        } else if (item == 5) {
            return <p>保险代理人</p>;
        } else if (item == 6) {
            return <p>康信用户</p>;
        } else if (item == 7) {
            return <p>认证护士</p>;
        } else if (item == 8) {
            return <p>普通护士</p>;
        } else if (item == 9) {
            return <p>云康销售</p>;
        } else if (item == 10) {
            return <p>游客</p>;
        }
    };
    //状态
    renderStatus = val => {
        if (val == "0") {
            return "禁用";
        } else if (val == "1") {
            return "启用";
        }
    };

    //操作
    //修改
    modify = item => {
        this.props.showPageLoading(true);
        this.props.chageModalInfo({
            title: "修改分类",
            isAdd: false
        });
        this.props.getClassificationsRoot();
        this.props.getClassDetail(item.id);
    }

    //删除
    delete = item => {
        this.props.deleteItem(item.id);
    }
    // 禁用/启用
    reset = item => {
        let para = {
            id: item.id,
            status: item.status
        }
        this.props.changeStatus(para);

        const param = {
            ...this.props.queryCriteria,
            pageNum: 1
        };
        this.props.showPageLoading(true);
        this.props.getInfoClass(param);
    }
    //submitModal
    submit = item => {
        let para = {
            id: item.id,
            status: item.status
        }
        this.props.submitModal(para);
    }

    onChange = pageNumber => {
        const para = {
            ...this.props.queryCriteria,
            pageNum: pageNumber
        };
        this.props.showPageLoading(true);
        this.props.getInfoClass(para);
    };
    render() {
        const {
            classTyprList,
            listTotal,
            currentPage,
            isShowModal,
            isPageLoading
        } = this.props; //
        return (
            <PageWrapper>
                <Spin spinning={isPageLoading} style={{ zIndex: "9000" }}>
                    <AdvancedSearchForm />
                    <Table
                        size="small"
                        columns={this.columns}
                        dataSource={classTyprList}
                        bordered
                        rowClassName="table"
                        pagination={false}
                    // loading={isTableLoading}
                    />
                    <Pagination
                        showQuickJumper
                        defaultCurrent={1}
                        total={listTotal}
                        onChange={this.onChange}
                        className="page"
                        current={currentPage}
                    />
                    {isShowModal ? (<ModifyInfo></ModifyInfo>) : ""}
                </Spin>
            </PageWrapper>
        );
    }
}

const mapStateToProps = state => {
    let stateObj = state.toJS();
    return {
        queryCriteria: stateObj.informationclass.queryCriteria,
        classTyprList: stateObj.informationclass.classTyprList,
        listTotal: parseInt(stateObj.informationclass.listTotal),
        isPageLoading: stateObj.informationclass.isPageLoading,
        currentPage: stateObj.informationclass.currentPage,
        isShowModal: stateObj.informationclass.isShowModal,
        Classifications: stateObj.informationclass.Classifications,
        modalInfo: stateObj.informationclass.modalInfo,
        modalData: stateObj.informationclass.modalData,
    };
};

const mapDispatchToProps = dispatch => ({
    getInfoClass: (params) => {
        dispatch(actionCreators.getInfoClass(params));
    },
    showPageLoading: val => {
        dispatch(actionCreators.showPageLoading(val));
    },
    getInsureDetail: id => {
        dispatch(actionCreators.getInsureDetail(id));
    },
    chageModalInfo: (val) => {
        dispatch(actionCreators.chageModalInfo(val));
    },
    getClassificationsRoot: () => {
        dispatch(actionCreators.getClassificationsRoot());
    },
    getClassDetail: (id) => {
        dispatch(actionCreators.getClassDetail(id));
    },
    changeStatus: (para) => {
        dispatch(actionCreators.changeStatus(para));
    },
    deleteItem: (id) => {
        dispatch(actionCreators.deleteItem(id));
    },

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InformationClass);
