import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Table, Modal, Button, Pagination, Row, Col, Form, Select, Spin, Input, DatePicker, } from "antd";
import { actionCreators } from "./store/interface";
import PolicyDetail from './Detail'
import { PageWrapper, ModalWrapper, QureWrapper } from "./policyhandle-style";

const FormItem = Form.Item;
class NormalInfo extends PureComponent {
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
                width: 150,
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
                width: 150,
                align: "center"
            },
            {
                title: "身份证号",
                dataIndex: "credentialsNumber",
                width: 250,
                align: "center"
            },
            {
                title: "采样时间",
                width: 200,
                align: "center",
                dataIndex: "collectTime"
            },
            {
                title: "送检医院",
                dataIndex: "examinerHospital",
                width: 200,
                align: "center"
            },
            {
                title: "接收时间",
                width: 200,
                align: "center",
                dataIndex: "requestTime"
            },
            {
                title: "投保项目",
                width: 100,
                align: "center",
                dataIndex: "itemTypeName"
            },
            {
                title: "操作",
                align: "center",
                render: (text, record) => {
                    return (
                        <a
                            href="javascript:void(0);"
                            className="c-red"
                            onClick={() => this.showViewDetail(record)}>
                            详情
                            </a>
                    );
                },
                width: 70
            }
        ];
        this.batchColumns = [
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
                title: "姓名",
                dataIndex: "examinerName",
                width: 120,
                align: "center"
            },
            {
                title: "号码",
                dataIndex: "examinerPhone",
                width: 150,
                align: "center"
            },
            {
                title: "证件号码",
                dataIndex: "credentialsNumber",
                width: 250,
                align: "center"
            },
            {
                title: "采样时间",
                width: 200,
                align: "center",
                dataIndex: "collectTime"
            },
            {
                title: "送检医院",
                dataIndex: "examinerHospital",
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
                title: "操作",
                align: "center",
                render: (text, row, index) => {
                    return (
                        <a
                            href="javascript:void(0);"
                            className="c-red"
                            onClick={() => this.deleteBatch(text, row, index)}>
                            删除
                            </a>
                    );
                },
                width: 70
            }
        ];
    }

    state = {
        visible: false,
        modalItem: "",
        modalStatus: ""
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
                dataCheckType: "1",
                pageNum: 1,
                pageSize: 10
            };
            const applyTimes = values['applyTimes'];
            const recevieTimes = values['recevieTimes'];
            if (applyTimes && applyTimes.length > 0) {
                _para['startTime'] = applyTimes[0].format('YYYY-MM-DD');
                _para['endTime'] = applyTimes[1].format('YYYY-MM-DD');
            }
            if (recevieTimes && recevieTimes.length > 0) {
                _para['requestStartTime'] = recevieTimes[0].format('YYYY-MM-DD');
                _para['requestEndTime'] = recevieTimes[1].format('YYYY-MM-DD');
            }
            this.props.changeQueryCriteria(_para);
            this.props.showPageLoading(true);
            this.props.getInsureHandle(_para, this.props.isSelectAll);
        });
    };
    //条件重置
    handleReset = () => {
        this.props.form.resetFields();
    };
    //生成批次
    geneBatch = () => {
        if (this.props.selectedRows.length == 0) {
            Modal.error({
                title: "提示",
                content: "您目前没有选中生成批次的数据,请选择！"
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
                this.props.getBatchSelectList(para);
            } else {
                this.props.geneBatchNo(this.props.selectedRows.length);
                this.props.chageBatchList(this.props.selectedRows);
            }

        }
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
     * model 清单详情 
    */
    // handleCancel = () => {
    //     this.props.showDetail(false);
    // };
    showViewDetail = record => {
        this.props.showPageLoading(true);
        this.props.getInsureDetail(record.id);
        this.props.showDetail(true);
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

    /**
 * 生成批次
*/
    //隐藏生成批次列表弹框
    cancelBatch = () => {
        this.props.showBatchList(false);
    }
    //删除批次列表数据
    deleteBatch = (text, row, index) => {
        let list = this.props.batchList.slice();
        list.splice(index, 1);
        this.props.chageBatchList(list);
    }
    //提交生成批次
    submitBatch = () => {
        let list = [];
        this.props.batchList.map(item => {
            let obj = {
                verufyId: item.id
            };
            list.push(obj);
        });
        let operatorName = "admin001";
        this.props.submitBatchNo(operatorName, list);
    }

    render() {
        const { pageLoading, insureHandleList, listTotal, currentPage, isShowBatch, modalLoading, batchList, batchNo, selectedRowKeys, isSelectAll, isShowDetail } = this.props; //
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
        <span className="title-right">投保人数：<span style={{color: "#9bcdcb",}}>{batchList.length}</span>人</span></h4>);
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
                                <Col span={6} key="applyTime">
                                    <FormItem
                                        {...formItemLayout}
                                        label={
                                            <span className="item-label">
                                                采样时间
                                    </span>
                                        }>
                                        {getFieldDecorator("applyTimes", {
                                            rules: [
                                                {
                                                    type: 'array'
                                                }
                                            ]
                                        })(
                                            <DatePicker.RangePicker />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={6} key="recevieTimes">
                                    <FormItem
                                        {...formItemLayout}
                                        label={
                                            <span className="item-label">
                                                接收时间
                                    </span>
                                        }>
                                        {getFieldDecorator("recevieTimes", {
                                            rules: [
                                                {
                                                    type: 'array'
                                                }
                                            ]
                                        })(
                                            <DatePicker.RangePicker />
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
                                    <Button
                                        style={{
                                            backgroundColor: "#48cfae",
                                            color: "#fff",
                                            marginLeft: 8
                                        }}
                                        onClick={this.geneBatch}>
                                        生成批次
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
                    {isShowBatch ? (<ModalWrapper>
                        <Modal
                            width={1000}
                            bodyStyle={{
                                height: "60vh",
                                overflow: "auto"
                            }}
                            confirmLoading={modalLoading}
                            visible={isShowBatch}
                            title={modalTitle}
                            onCancel={this.cancelBatch}
                            onOk={this.submitBatch}
                            getContainer={() => document.getElementById("root")}
                            className="detail">
                            <Table
                                size="small"
                                columns={this.batchColumns}
                                dataSource={batchList}
                                bordered
                                rowClassName="table"
                            />
                        </Modal>
                    </ModalWrapper>) : ""}
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
        isShowBatch: stateObj.policyhandle.isShowBatch,
        modalLoading: stateObj.policyhandle.modalLoading,
        batchList: stateObj.policyhandle.batchList,
        isShowDetail: stateObj.policyhandle.isShowDetail,
        batchNo: stateObj.policyhandle.batchNo,
    };
};

const mapDispatchToProps = dispatch => ({
    showPageLoading: val => {
        dispatch(actionCreators.showPageLoading(val));
    },
    getInsureHandle: (para,isSelectAll) => {
        dispatch(actionCreators.getInsureHandle(para,isSelectAll));
    },
    changeQueryCriteria: para => {
        dispatch(actionCreators.changeQueryCriteria(para));
    },
    chageBatchList: list => {
        dispatch(actionCreators.chageBatchList(list));
    },
    showDetail: val => {
        dispatch(actionCreators.showDetail(val));
    },
    changeSelectAll: val => {
        dispatch(actionCreators.changeSelectAll(val));
    },
    selectRows: (selectedRowKeys, selectedRows) => {
        dispatch(actionCreators.selectRows(selectedRowKeys, selectedRows));
    },
    showBatchList: val => {
        dispatch(actionCreators.showBatchList(val));
    },
    getInsureDetail: id => {
        dispatch(actionCreators.getInsureDetail(id));
    },
    geneBatchNo: count => {
        dispatch(actionCreators.geneBatchNo(count));
    },
    getBatchSelectList : para => {
        dispatch(actionCreators.getBatchSelectList(para));
    },
    submitBatchNo:(operatorName, list)=> {
        dispatch(actionCreators.submitBatchNo(operatorName, list));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Form.create({})(NormalInfo));
