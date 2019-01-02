import React, { PureComponent } from "react";
import { Form, Row, Col, Input, Button, Select, DatePicker, Modal } from "antd";
import { connect } from "react-redux";
import { actionCreators } from "./store/interface";
import { QureWrapper } from "./policyrecord-style";


const FormItem = Form.Item;
const createForm = Form.create;

class AdvancedSearchForm extends PureComponent {
    handleSearch = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            const applyTimes = values["insureDate"];
            let _oderBy =
                values["orderByVal"] === "0"
                    ? "batchGenTime desc"
                    : "insuredTime desc";
            let para = {};
            if (applyTimes && applyTimes.length > 0) {
                para = {
                    ...values,
                    orderBy: _oderBy,
                    startTime: applyTimes[0].format("YYYY-MM-DD"),
                    endTime: applyTimes[1].format("YYYY-MM-DD")
                };
            } else {
                para = { ...values };
            }
            this.props.changeQueryCriteria(para);
            this.props.showPageLoading(true);
            this.props.getInsureRecord(para);
        });
    };

    handleReset = () => {
        this.props.form.resetFields();
        this.props.changeQueryCriteria({});
    };

    checkAll = () => {
        let val = !this.props.isSelectAll;
        this.props.changeSelectAll(val);
        const para = {
            ...this.props.queryCriteria,
            pageNum: this.props.currentPage
        };
        this.props.showPageLoading(true);
        this.props.getInsureRecord(para, val);
        //console.log("result:", result);
    };
    insuranceAll = async () => {
        if (this.props.isSelectAll) {
            let _self = this,
                para = {
                    batchStatus: "0",
                    pageSize: 2000,
                    pageNum: 1
                };
            // self.props.getInsureRecord(para).then(() => {
            //     console.log("selectedRowKeys:",this.props.selectedRowKeys);
            // });
            await _self.props.getInsureRecord(para, false, true);
            //_self.props.showPageLoading(true);
            setTimeout(() => {
                _self.props.showInsureModal(true);
            }, 100);
            //_self.props.showInsureModal(true);

        } else {
            if (this.props.selectedRowKeys.length == 0) {
                Modal.error({
                    title: "提示",
                    content: "您目前没有选中可投保信息,请选择！"
                });
                return;
            } else {
                let dataArrage = [];
                this.props.selectedRows.map(item => {
                    if (item.batchStatus != "0") {
                        dataArrage.push(item);
                    }
                });
                if (dataArrage.length != 0) {
                    Modal.error({
                        title: "提示",
                        content: "已投保的批次，请勿重复投保！"
                    });
                    return;
                }
            }
            //this.props.showPageLoading(true);
            this.props.showInsureModal(true);
        }
        //console.log("selectedRowKeys:",this.props.selectedRowKeys);
    };
    render() {
        const { isSelectAll } = this.props;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 18 },
                sm: { span: 6 }
            },
            wrapperCol: {
                xs: { span: 12 },
                sm: { span: 8 }
            }
        };
        return (
            <QureWrapper>
                <h3 style={{ color: "#43aaab" }}>查询条件</h3>
                <Form className="search-form" onSubmit={this.handleSearch}>
                    <Row gutter={18}>
                        <Col span={7} key="batchNumber">
                            <FormItem
                                {...formItemLayout}
                                label={
                                    <span className="item-label">批次号</span>
                                }>
                                {getFieldDecorator(`batchNumber`, {
                                    rules: [
                                        {
                                            type: "string",
                                            message: "请输入正确的批次号!"
                                        }
                                    ]
                                })(<Input placeholder="请输入批次号" />)}
                            </FormItem>
                        </Col>
                        <Col span={7} key="insuredOperator">
                            <FormItem
                                {...formItemLayout}
                                label={
                                    <span className="item-label">操作人</span>
                                }>
                                {getFieldDecorator(`insuredOperator`)(
                                    <Input placeholder="请输入操作人名称" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={7} key="insureDate">
                            <FormItem
                                {...formItemLayout}
                                label={
                                    <span className="item-label">投保时间</span>
                                }>
                                {getFieldDecorator("insureDate", {
                                    rules: [
                                        {
                                            type: "array"
                                        }
                                    ]
                                })(<DatePicker.RangePicker />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={18}>
                        <Col span={7} key="batchStatus">
                            <FormItem
                                {...formItemLayout}
                                label={
                                    <span className="item-label">批次状态</span>
                                }>
                                {getFieldDecorator(`batchStatus`, {
                                    initialValue: ""
                                })(
                                    <Select placeholder="">
                                        <Select.Option value="">
                                            全部
                                        </Select.Option>
                                        <Select.Option value="0">
                                            未投保
                                        </Select.Option>
                                        <Select.Option value="1">
                                            已作废
                                        </Select.Option>
                                        <Select.Option value="2">
                                            申请中
                                        </Select.Option>
                                        <Select.Option value="3">
                                            投保成功
                                        </Select.Option>
                                        <Select.Option value="4">
                                            投保失败
                                        </Select.Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={7} key="orderByVal">
                            <FormItem
                                {...formItemLayout}
                                label={
                                    <span className="item-label">列表排序</span>
                                }>
                                {getFieldDecorator(`orderByVal`, {
                                    initialValue: "0"
                                })(
                                    <Select placeholder="">
                                        <Select.Option value="0">
                                            按批次生成时间倒序
                                        </Select.Option>
                                        <Select.Option value="1">
                                            按投保时间倒序
                                        </Select.Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12} style={{ textAlign: "left" }}>
                            <Button
                                style={{
                                    backgroundColor: "#50c1e9",
                                    color: "#fff"
                                }}
                                onClick={this.checkAll}>
                                {isSelectAll ? "取消全选" : "选择全部"}
                            </Button>
                            <Button
                                style={{
                                    marginLeft: 8,
                                    backgroundColor: "#1a9c9e",
                                    color: "#fff"
                                }}
                                onClick={this.exportExcel}>
                                导出Excel
                            </Button>
                        </Col>
                        <Col span={12} style={{ textAlign: "right" }}>
                            <Button
                                style={{
                                    backgroundColor: "#48cfae",
                                    color: "#fff"
                                }}
                                onClick={this.insuranceAll}>
                                投保
                            </Button>
                            <Button
                                style={{
                                    marginLeft: 8,
                                    backgroundColor: "#ffce55",
                                    color: "#fff"
                                }}
                                onClick={this.handleReset}>
                                条件重置
                            </Button>
                            <Button
                                style={{ marginLeft: 8 }}
                                type="primary"
                                htmlType="submit">
                                查询
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </QureWrapper>
        );
    }
}

const mapStateToProps = state => {
    let stateObj = state.toJS();
    return {
        queryCriteria: stateObj.policyrecord.queryCriteria,
        isSelectAll: stateObj.policyrecord.isSelectAll,
        selectedRowKeys: stateObj.policyrecord.selectedRowKeys,
        selectedRows: stateObj.policyrecord.selectedRows,
        currentPage: stateObj.policyrecord.currentPage
    };
};

const mapDispatchToProps = dispatch => ({
    changeQueryCriteria: params => {
        dispatch(actionCreators.changeQueryCriteria(params));
    },
    getInsureRecord: (params, isSelectAll = false, isInsure = false) => {
        dispatch(actionCreators.getInsureRecord(params, isSelectAll, isInsure));
    },
    showPageLoading: val => {
        dispatch(actionCreators.showPageLoading(val));
    },
    changeSelectAll: val => {
        dispatch(actionCreators.changeSelectAll(val));
    },
    insureSelected: str => {
        dispatch(actionCreators.insureSelected(str));
    },
    showInsureModal: (flag) => {
        dispatch(actionCreators.showInsureModal(flag));
    },
    showPageLoading: val => {
        dispatch(actionCreators.showPageLoading(val));
    },
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(createForm({})(AdvancedSearchForm));
