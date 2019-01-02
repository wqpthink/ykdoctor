import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Table, Modal, Button, Pagination, Row, Col, Form, Select, Spin, Input, DatePicker, } from "antd";
import { actionCreators } from "./store/interface";
import PolicyDetail from './Detail'
import { PageWrapper, ModalWrapper, QureWrapper } from "./policyhandle-style";

const FormItem = Form.Item;
class NoHandle extends PureComponent {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "序号",
                dataIndex: "index",
                width: 70,
                align: "center",
                render: (text, record, index) => <span>{index + 1}</span>
            },
            {
                title: "检验条码",
                dataIndex: "barcode",
                width: 150,
                align: "center"
            },
            {
                title: "申请单号",
                dataIndex: "applayNum",
                width: 200,
                align: "center"
            },
            {
                title: "姓名",
                dataIndex: "examinerName",
                width: 120,
                align: "center"
            },
            {
                title: "号码",
                dataIndex: "examinerPhone",
                width: 120,
                align: "center"
            },
            {
                title: "证件类型",
                dataIndex: "credentialsType",
                width: 70,
                align: "center",
                render: (text, record) => (
                    <span>{this.renderCertificates(record["credentialsType"])}</span>
                )
            },
            {
                title: "证件号码",
                dataIndex: "credentialsNumber",
                width: 200,
                align: "center"
            },
            {
                title: "投保项目",
                width: 100,
                align: "center",
                dataIndex: "itemTypeName"
            },
            {
                title: "异常类型",
                width: 100,
                align: "center",
                dataIndex: "irregularType",
                render: (text, record) => (
                    <span>{this.renderError(record["irregularType"])}</span>
                )
            },
            {
                title: "异常信息",
                width: 300,
                align: "center",
                dataIndex: "irregularDesc"
            },
            {
                title: "无需处理原因",
                width: 150,
                align: "center",
                dataIndex: "nohandleRemarks"
            },
            {
                title: "操作",
                align: "center",
                render: (text, record) => {
                    return (
                        <span>
                            <a
                                href="javascript:void(0);"
                                className="c-red"
                                onClick={() => this.viewKY(record)}>
                                康源信息
                            </a>
                            <a
                                href="javascript:void(0);"
                                className="c-red"
                                style={{ marginLeft: 6 }}
                                onClick={() => this.viewYK(record)}>
                                运管信息
                            </a>
                        </span>
                    );
                },
                width: 200
            }
        ];
    }

    state = {
        modifyVisible: false,
        modifyInfo: {}
    };
    /**
  * 列表显示
 */
    //投保项目
    renderType = val => {
        if (val == "1") {
            return "无创";
        } else if (val == "2") {
            return "无创PLUS";
        }
    };
    //证件类型
    renderCertificates = val => {
        if (val == "1") {
            return "身份证";
        }
    };
    //信息状态
    renderStatus = val => {
        if (val == "0") {
            return "异常";
        } else if (val == "1") {
            return "正常";
        }
    };
    //投保状态
    renderInsureStatus = val => {
        if (val == "0") {
            return "未投保";
        } else if (val == "1") {
            return "已作废";
        } else if (val == "2") {
            return "申请中";
        } else if (val == "3") {
            return "投保成功";
        } else if (val == "4") {
            return "投保失败";
        }
    };

    //异常类型
    renderError = val => {
        if (val == "1") {
            return <span>不一致</span>;
        } else if (val == "2") {
            return <span>校验错误</span>;
        } else if (val == "3") {
            return <span>患者退单</span>;
        } else if (val == "4") {
            return <span>重复投保</span>;
        } else if (val == "5") {
            return <span>投保异常</span>;
        }
    };
    /**
     * 上部查询等事件
    */
    //查询事件
    handleSearch = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            let _para = {
                ...values,
                dataCheckType: "02",
                pageNum: 1,
                pageSize: 10
            };
            this.props.changeQueryCriteria(_para);
            this.props.showPageLoading(true);
            this.props.getInsureHandle(_para);
        });
    };
    //条件重置
    handleReset = () => {
        this.props.form.resetFields();
    };
    //页码查询
    onChange = pageNumber => {
        let para = {
            ...this.props.queryCriteria,
            pageNum: pageNumber
        };
        this.props.showPageLoading(true);
        this.props.getInsureHandle(para, this.props.isSelectAll);
    };
    /**
     * model 运管信息 
    */
    // handleCancel = () => {
    //     this.props.showDetail(false);
    // };

    viewYK = record => {
        this.props.showPageLoading(true);
        this.props.getYKDetail(record.id);
    };

    viewKY = record => {
        this.props.showPageLoading(true);
        this.props.getKYDetail(record.id);
    };


    render() {
        const { pageLoading, insureHandleList, listTotal, currentPage, isShowDetail } = this.props; //
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return (
            <PageWrapper>
                <Spin spinning={pageLoading} style={{ zIndex: "9000" }}>
                    <QureWrapper>
                        <h3 style={{ color: "#43aaab" }}>查询条件</h3>
                        <Form className="search-form" onSubmit={this.handleSearch}>
                            <Row gutter={24}>
                                <Col span={6} key="barcode">
                                    <FormItem
                                        {...formItemLayout}
                                        label={
                                            <span className="item-label">
                                                检验条码
                                    </span>
                                        }>
                                        {getFieldDecorator(`barcode`, {
                                            rules: [
                                                {
                                                    type: "string",
                                                    message: "请输入正确的检验条码!"
                                                }
                                            ]
                                        })(<Input placeholder="检验条码" />)}
                                    </FormItem>
                                </Col>
                                <Col span={6} key="applayNum">
                                    <FormItem
                                        {...formItemLayout}
                                        label={
                                            <span className="item-label">
                                                申请单号
                                    </span>
                                        }>
                                        {getFieldDecorator(`applayNum`)(
                                            <Input placeholder="申请单号" />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={6} key="examinerName">
                                    <FormItem
                                        {...formItemLayout}
                                        label={
                                            <span className="item-label">
                                                投保人姓名
                                    </span>
                                        }>
                                        {getFieldDecorator(`examinerName`)(
                                            <Input placeholder="投保人姓名" />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={6} key="examinerPhone">
                                    <FormItem
                                        {...formItemLayout}
                                        label={
                                            <span className="item-label">
                                                电话号码
                                    </span>
                                        }>
                                        {getFieldDecorator(`examinerPhone`, {
                                            rules: [
                                                {
                                                    type: "number",
                                                    message: "请输入正确的电话号码!"
                                                }
                                            ]
                                        })(
                                            <Input placeholder="电话号码" maxLength="11" />
                                        )}
                                    </FormItem>
                                </Col>

                            </Row>
                            <Row gutter={24}>
                                <Col span={6} key="credentialsNumber">
                                    <FormItem
                                        {...formItemLayout}
                                        label={
                                            <span className="item-label">
                                                证件号码
                                    </span>
                                        }>
                                        {getFieldDecorator(`credentialsNumber`, {
                                            rules: [
                                                {
                                                    type: "string",
                                                    message: "请输入正确的身份证号!"
                                                }
                                            ]
                                        })(
                                            <Input placeholder="身份证号" maxLength="18" />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={6} key="itemTypeId">
                                    <FormItem
                                        {...formItemLayout}
                                        label={
                                            <span className="item-label">
                                                投保项目
                                    </span>
                                        }>
                                        {getFieldDecorator(`itemTypeId`)(
                                            <Select placeholder="投保项目">
                                                <Select.Option value="">全部</Select.Option>
                                                <Select.Option value="1">无创</Select.Option>
                                                <Select.Option value="2">无创PLUS</Select.Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={6} key="irregularType">
                                    <FormItem
                                        {...formItemLayout}
                                        label={
                                            <span className="item-label">
                                                异常类型
                                    </span>
                                        }>
                                        {getFieldDecorator(`irregularType`)(
                                            <Select placeholder="异常类型">
                                                <Select.Option value="">全部</Select.Option>
                                                <Select.Option value="1">不一致</Select.Option>
                                                <Select.Option value="2">校验错误</Select.Option>
                                                {/* <Select.Option value="2">校验错误</Select.Option> */}
                                                <Select.Option value="5">投保异常</Select.Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>

                            </Row>
                            <Row >

                                <Col span={24} style={{ textAlign: "right" }}>
                                    <Button type="primary" htmlType="submit">
                                        查询
                            </Button>
                                    <Button
                                        style={{ marginLeft: 8 }}
                                        onClick={this.handleReset}>
                                        条件重置
                            </Button>
                                </Col>
                            </Row>
                        </Form>
                    </QureWrapper>
                    <Table
                        size="small"
                        columns={this.columns}
                        dataSource={insureHandleList}
                        bordered
                        rowClassName="table"
                        pagination={false}
                    />
                    <Pagination
                        showQuickJumper
                        current={currentPage}
                        total={listTotal}
                        onChange={this.onChange}
                        className="page"
                    />

                </Spin>
            </PageWrapper >
        );
    }
}

const mapStateToProps = state => {
    let stateObj = state.toJS();
    return {
        pageLoading: stateObj.policyhandle.pageLoading,
        listTotal: parseInt(stateObj.policyhandle.listTotal),
        insureHandleList: stateObj.policyhandle.insureHandleList,
        currentPage: stateObj.policyhandle.currentPage,
        queryCriteria: stateObj.policyhandle.queryCriteria,
        isSelectAll: stateObj.policyhandle.isSelectAll,
        selectedRowKeys: stateObj.policyhandle.selectedRowKeys,
        selectedRows: stateObj.policyhandle.selectedRows,
        batchRows: stateObj.policyhandle.batchRows,
        isShowNoDeal: stateObj.policyhandle.isShowNoDeal,
        modalLoading: stateObj.policyhandle.modalLoading,
        batchList: stateObj.policyhandle.batchList,
        isShowDetail: stateObj.policyhandle.isShowDetail,
        batchNo: stateObj.policyhandle.batchNo,
        isShowModify: stateObj.policyhandle.isShowModify
    };
};

const mapDispatchToProps = dispatch => ({
    showPageLoading: val => {
        dispatch(actionCreators.showPageLoading(val));
    },
    getInsureHandle: (para, isSelectAll) => {
        dispatch(actionCreators.getInsureHandle(para, isSelectAll));
    },
    changeQueryCriteria: para => {
        dispatch(actionCreators.changeQueryCriteria(para));
    },
    chageBatchList: list => {
        dispatch(actionCreators.chageBatchList(list));
    },
    getKYDetail: val => {
        dispatch(actionCreators.getKYDetail(val));
    },
    getYKDetail: val => {
        dispatch(actionCreators.getYKDetail(val));
    },
    changeSelectAll: val => {
        dispatch(actionCreators.changeSelectAll(val));
    },
    selectRows: (selectedRowKeys, selectedRows) => {
        dispatch(actionCreators.selectRows(selectedRowKeys, selectedRows));
    },

    geneBatchNo: count => {
        dispatch(actionCreators.geneBatchNo(count));
    },
    getNoDealSelectList: para => {
        dispatch(actionCreators.getNoDealSelectList(para));
    },
    chageModifyInfo: val => {
        dispatch(actionCreators.chageModifyInfo(val));
    },
    showModify: flag => {
        dispatch(actionCreators.showModify(flag));
    },
    chageNoDealList: val => {
        dispatch(actionCreators.chageNoDealList(val));
    },
    showNoDeal: val => {
        dispatch(actionCreators.showNoDeal(val));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Form.create({})(NoHandle));
