import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
    Table,
    Modal,
    Button,
    Pagination,
    Row,
    Col,
    Form,
    Select,
    Spin,
    Input,
    message
} from "antd";
import { actionCreators } from "./store/interface";
import StringUtil from "../../../util/StringUtil";
import PolicyDetail from "./Detail";
import NoDeal from "./NoDeal";
import ModifyInfo from "./ModifyInfo";
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
                    <span>
                        {this.renderCertificates(record["credentialsType"])}
                    </span>
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
                title: "投保状态",
                dataIndex: "offlineStatus",
                width: 100,
                align: "center",
                render: (text, record) => (
                    <span>
                        {this.renderInsureStatus(record["offlineStatus"])}
                    </span>
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
                                onClick={() => this.showViewDetail(record)}>
                                详情
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
            return "已投保";
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
                pageNum: 1,
                pageSize: 10
            };
            this.props.changeQueryCriteria(_para);
            this.props.showPageLoading(true);
            this.props.getAgainInsureList(_para, this.props.isSelectAll);
        });
    };
    //条件重置
    handleReset = () => {
        this.props.form.resetFields();
    };
    //线下投保 选择多个的
    insureInline = () => {
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
                };
                this.props.showPageLoading(true);
                this.props.getAgainInsureList(
                    para,
                    this.props.isSelectAll,
                    "2"
                );
            } else {
                let keys = this.props.selectedRows.join(",");
                this.props.getInlineIdsChangeAction(keys);
                this.props.showConfirm(true);
            }
        }
    };
    sumbitInline = () => {
        this.props.showModalLoading(true);
        let param = {
            ids:this.props.inlineIds
        }
        this.props.inlineInsureList(param);
        let para = {
            ...this.props.queryCriteria,
            pageNum: 1,
            pageSize: 10
        };
        this.props.getAgainInsureList(para);
    };
    hideModal = () => {
        this.props.showConfirm(false);
    };
    //页码查询
    onChange = pageNumber => {
        let para = {
            ...this.props.queryCriteria,
            pageNum: pageNumber
        };
        this.props.showPageLoading(true);
        this.props.getAgainInsureList(para, this.props.isSelectAll);
    };
    /**
     * model 运管信息
     */
    // handleCancel = () => {
    //     this.props.showDetail(false);
    // };

    showViewDetail = record => {
        this.props.showPageLoading(true);
        this.props.getInlineInsureDetail(record.id);
        //this.props.showDetail(true);
    };

    /**
     * 选中事件
     */
    //选择全部
    checkAll = () => {
        let val = !this.props.isSelectAll;
        this.props.changeSelectAll(val);
        let keys = [];
        if (val) {
            this.props.againInsureList.map(item => {
                keys.push(item.id);
            });
            this.props.selectRows(keys, this.props.againInsureList);
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
        let keys = selectedRows.join(",");
        this.props.getInlineIdsChangeAction(keys);
    };
    render() {
        const {
            pageLoading,
            againInsureList,
            listTotal,
            currentPage,
            selectedRowKeys,
            isSelectAll,
            modalLoading,
            isShowDetail,
            isConfirm
        } = this.props; //
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 }
            }
        };
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            getCheckboxProps: record => ({
                disabled: record.offlineStatus === '1', // Column configuration not to be checked
                name: record.name,
              }),
        };
        return (
            <PageWrapper>
                <Spin spinning={pageLoading} style={{ zIndex: "9000" }}>
                    <QureWrapper>
                        <h3 style={{ color: "#43aaab" }}>查询条件</h3>
                        <Form
                            className="search-form"
                            onSubmit={this.handleSearch}>
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
                                                    message:
                                                        "请输入正确的检验条码!"
                                                }
                                            ]
                                        })(<Input placeholder="检验条码" />)}
                                    </FormItem>
                                </Col>
                                <Col span={6} key="offlineStatus">
                                    <FormItem
                                        {...formItemLayout}
                                        label={
                                            <span className="item-label">
                                                投保状态
                                            </span>
                                        }>
                                        {getFieldDecorator(`offlineStatus`)(
                                            <Select placeholder="投保状态">
                                                <Select.Option value="">
                                                    全部
                                                </Select.Option>
                                                <Select.Option value="0">
                                                    未投保
                                                </Select.Option>
                                                <Select.Option value="1">
                                                    已投保
                                                </Select.Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24} style={{ textAlign: "right" }}>
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
                                        onClick={this.insureInline}>
                                        线下投保
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
                        dataSource={againInsureList}
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
                    {isShowDetail ? <PolicyDetail /> : ""}
                    {isConfirm ? (
                        <Modal
                            title="注意！"
                            visible={isConfirm}
                            onOk={this.sumbitInline}
                            onCancel={this.hideModal}
                            okText="确认"
                            cancelText="取消"
                            confirmLoading={modalLoading}>
                            <p>是否将选中数据标识为线下投保？</p>
                        </Modal>
                    ) : (
                        ""
                    )}
                </Spin>
            </PageWrapper>
        );
    }
}

const mapStateToProps = state => {
    let stateObj = state.toJS();
    return {
        pageLoading: stateObj.policyhandle.pageLoading,
        listTotal: parseInt(stateObj.policyhandle.listTotal),
        againInsureList: stateObj.policyhandle.againInsureList,
        currentPage: stateObj.policyhandle.currentPage,
        queryCriteria: stateObj.policyhandle.queryCriteria,
        isSelectAll: stateObj.policyhandle.isSelectAll,
        selectedRowKeys: stateObj.policyhandle.selectedRowKeys,
        selectedRows: stateObj.policyhandle.selectedRows,
        isConfirm: stateObj.policyhandle.isConfirm,
        isShowDetail: stateObj.policyhandle.isShowDetail,
        modalLoading: stateObj.policyhandle.modalLoading,
        inlineIds: stateObj.policyhandle.inlineIds,
    };
};

const mapDispatchToProps = dispatch => ({
    showPageLoading: val => {
        dispatch(actionCreators.showPageLoading(val));
    },
    getAgainInsureList: (para, isSelectAll, type = "1") => {
        dispatch(actionCreators.getAgainInsureList(para, isSelectAll, type));
    },
    changeQueryCriteria: para => {
        dispatch(actionCreators.changeQueryCriteria(para));
    },
    changeSelectAll: val => {
        dispatch(actionCreators.changeSelectAll(val));
    },
    selectRows: (selectedRowKeys, selectedRows) => {
        dispatch(actionCreators.selectRows(selectedRowKeys, selectedRows));
    },
    getInlineIdsChangeAction: val => {
        dispatch(actionCreators.getInlineIdsChangeAction(val));
    },
    showConfirm: val => {
        dispatch(actionCreators.showConfirm(val));
    },
    getInlineInsureDetail: id => {
        dispatch(actionCreators.getInlineInsureDetail(id));
    },
    inlineInsureList: para => {
        dispatch(actionCreators.inlineInsureList(para));
    },
    showModalLoading: val => {
        dispatch(actionCreators.showModalLoading(val));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Form.create({})(Abnormal));
