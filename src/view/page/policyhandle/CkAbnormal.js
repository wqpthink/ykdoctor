import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Table, Modal, Button, Pagination, Row, Col, Form, Select, Spin, Input, message } from "antd";
import { actionCreators } from "./store/interface";
import StringUtil from "../../../util/StringUtil";
import PolicyDetail from './Detail';
import NoDeal from './NoDeal';
import ModifyInfo from './ModifyInfo';
import { PageWrapper, ModalWrapper, QureWrapper } from "./policyhandle-style";

const isEmpty = StringUtil.isEmpty;
const FormItem = Form.Item;
class Abnormal extends PureComponent {
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
                            <a
                                href="javascript:void(0);"
                                className="c-red"
                                style={{ marginLeft: 6 }}
                                onClick={() => this.modifyDetail(record)}>
                                信息修正
                            </a>
                            <a
                                href="javascript:void(0);"
                                className="c-red"
                                style={{ marginLeft: 6 }}
                                onClick={() => this.noNeedHandleSignle(record)}>
                                无需处理
                            </a>

                        </span>

                    );
                },
                width: 250
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
                dataCheckType: "01",
                pageNum: 1,
                pageSize: 10
            };
            this.props.changeQueryCriteria(_para);
            this.props.showPageLoading(true);
            this.props.getInsureHandle(_para, this.props.isSelectAll);
        });
    };
    //条件重置
    handleReset = () => {
        this.props.form.resetFields();
    };
    //无需处理 选择多个的
    noNeedHandleAll = () => {
        if (this.props.selectedRows.length == 0) {
            Modal.error({
                title: "提示",
                content: "您目前没有选中无需处理的数据,请选择！"
            });
            return;
        } else {
            if (this.props.isSelectAll) {
                let para = {
                    ...this.props.queryCriteria,
                    pageNum: 1,
                    pageSize: 2000
                }
                this.props.showPageLoading(true);
                this.props.getNoDealSelectList(para);
            } else {
                this.props.chageNoDealList(this.props.selectedRows);
                this.props.showNoDeal(true);
            }
        }
    };
    //导出Excel
    insureErorrExcel = () => {
        let _para = {
            ...this.props.queryCriteria
        };
        let temp = `dataCheckType=${_para.dataCheckType}`;
        if (this.props.selectedRowKeys && this.props.selectedRowKeys.length > 0) {
            let selectedCheck = this.props.selectedRowKeys.join(",");
            temp += `&ids=${selectedCheck}`;
        }
        if (!isEmpty(_para.barcode)) {
            temp += `&barcode=${_para.barcode}`;
        }
        if (!isEmpty(_para.applayNum)) {
            temp += `&applayNum=${_para.applayNum}`;
        }
        if (!isEmpty(_para.examinerName)) {
            temp += `&examinerName=${_para.examinerName}`;
        }
        if (!isEmpty(_para.examinerPhone)) {
            temp += `&examinerPhone=${_para.examinerPhone}`;
        }
        if (!isEmpty(_para.credentialsNumber)) {
            temp += `&credentialsNumber=${_para.credentialsNumber}`;
        }
        if (!isEmpty(_para.itemTypeId)) {
            temp += `&itemTypeId=${_para.itemTypeId}`;
        }
        if (!isEmpty(_para.irregularType)) {
            temp += `&irregularType=${_para.irregularType}`;
        }
        window.open(`http://manager-doctor.daanlab.com/api/doctor/insured/excel/execExcelExport?${temp}&orderBy=create_date desc`)
    };
    //信息导入
    importInfo = (e) => {
        let tag = e.target,
            self = this;
        let _file = tag.files[0],
            _extend = _file.name.split('.')[_file.name.split('.').length - 1];
        if (_extend !== 'xlsx' && _extend !== 'xls') {
            message.error(`不支持${_extend}格式的文件导入，请选择其他格式文件`);
            return;
        }
        let formData = new FormData();
        formData.append('file', _file);
        this.props.importErorrExcel(formData);
        this.props.changeQueryCriteria({
            dataCheckType: "01",
            pageNum: 1,
            pageSize: 10
        });
        this.handleReset();
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

    modifyDetail = record => {
        this.props.showPageLoading(true);
        this.props.chageModifyInfo(record);
        this.props.showModify(true);
    };
    noNeedHandleSignle = record => {
        this.props.chageNoDealList(record);
        this.props.showNoDeal(true);
    }

    /**
     * 选中事件
    */
    //选择全部
    checkAll = () => {
        let val = !this.props.isSelectAll;
        this.props.changeSelectAll(val);
        let keys = [];
        if (val) {
            this.props.insureHandleList.map(item => {
                keys.push(item.id);
            });
            this.props.selectRows(keys, this.props.insureHandleList);
        } else {
            this.props.selectRows([], []); //取消全选
        }

    };
    //选中事件
    onSelectChange = (selectedRowKeys, selectedRows) => {
        if (this.props.isSelectAll) {
            this.props.changeSelectAll(false);
        }
        this.props.selectRows(selectedRowKeys, selectedRows);
    }



    render() {
        const { pageLoading, insureHandleList, listTotal, currentPage, isShowNoDeal, isShowModify, batchList, batchNo, selectedRowKeys, isSelectAll, isShowDetail } = this.props; //
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
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const modalTitle = (<h4 className="modal-title"><span>批次号：{batchNo}，</span>
            <span className="title-right">投保人数：<span style={{ color: "#9bcdcb", }}>{batchList.length}</span>人</span></h4>);
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
                                <Col span={12} style={{ textAlign: "left" }}>
                                    <Button
                                        style={{
                                            backgroundColor: "#50c1e9",
                                            color: "#fff"
                                        }}
                                    >
                                        信息导入
                                        <Input type="file" id="importExcel" className="upload-input" onChange={(e) => { this.importInfo(e) }} />
                                    </Button>
                                    <Button
                                        style={{
                                            marginLeft: 8,
                                            backgroundColor: "#1a9c9e",
                                            color: "#fff"
                                        }}
                                        onClick={this.insureErorrExcel}>
                                        导出Excel
                            </Button>
                                </Col>
                                <Col span={12} style={{ textAlign: "right" }}>
                                    <Button type="primary" htmlType="submit">
                                        查询
                            </Button>
                                    <Button
                                        style={{ marginLeft: 8 }}
                                        onClick={this.handleReset}>
                                        条件重置
                            </Button>
                                    <Button
                                        style={{
                                            backgroundColor: "#48cfae",
                                            color: "#fff",
                                            marginLeft: 8
                                        }}
                                        onClick={this.noNeedHandleAll}>
                                        无需处理
                            </Button>
                                    <Button
                                        style={{
                                            backgroundColor: "#50c1e9",
                                            color: "#fff",
                                            marginLeft: 8
                                        }}
                                        onClick={this.checkAll}>
                                        {isSelectAll ? "取消全选" : "选择全部"}
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </QureWrapper>
                    <Table
                        rowSelection={rowSelection}
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
                    {isShowModify ? (<ModifyInfo></ModifyInfo>) : ""}
                    {isShowNoDeal ? (<NoDeal></NoDeal>) : ""}
                    {isShowDetail ? (<PolicyDetail></PolicyDetail>) : ""}

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
    importErorrExcel: formatData => {
        dispatch(actionCreators.importErorrExcel(formatData));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Form.create({})(Abnormal));
