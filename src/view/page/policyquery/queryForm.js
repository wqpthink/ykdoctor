import React, { Component } from "react";
import { Form, Row, Col, Input, Button, Select, DatePicker } from "antd";
import { connect } from "react-redux";
import { actionCreators } from "./store/interface";
import { QureWrapper } from "./policyquery-style";

const FormItem = Form.Item;
const createForm = Form.create;

class AdvancedSearchForm extends Component {
    handleSearch = e => {
        e.preventDefault();    
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            const applyTimes = values['applyTimes'];
            let para = {};
            if (applyTimes.length>0) {
                para= {
                    ...values,
                    'startTime': applyTimes[0].format('YYYY-MM-DD'),
                    'endTime': applyTimes[1].format('YYYY-MM-DD'),
                }
            } else {
                para = { ...values };
            }
            this.props.changeQueryCriteria(para);
            this.props.showLoading(true);
            this.props.getTableData(para);
        });
    };

    handleReset = () => {
        this.props.form.resetFields();
        this.props.changeQueryCriteria({});
    };

    render() {
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
                        <Col span={6} key="credentialsNumber">
                            <FormItem
                                {...formItemLayout}
                                label={
                                    <span className="item-label">
                                        身份证号
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
                                    <Input placeholder="身份证号" maxLength="18"/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={24}>
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
                                    <Input placeholder="电话号码" maxLength="11"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6} key="itemType">
                            <FormItem
                                {...formItemLayout}
                                label={
                                    <span className="item-label">
                                        投保项目
                                    </span>
                                }>
                                {getFieldDecorator(`itemType`)(
                                    <Select placeholder="投保项目">
                                        <Select.Option value="">全部</Select.Option>
                                        <Select.Option value="1">无创</Select.Option>
                                        <Select.Option value="2">无创PLUS</Select.Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6} key="resultStatus">
                            <FormItem
                                {...formItemLayout}
                                label={
                                    <span className="item-label">
                                        投保状态
                                    </span>
                                }>
                                {getFieldDecorator(`resultStatus`)(
                                    <Select placeholder="投保状态">
                                        <Select.Option value="">全部</Select.Option>
                                        <Select.Option value="1">申请中</Select.Option>
                                        <Select.Option value="2">投保成功</Select.Option>
                                        <Select.Option value="3">投保失败</Select.Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6} key="policyNo">
                            <FormItem
                                {...formItemLayout}
                                label={
                                    <span className="item-label">
                                        投保单号
                                    </span>
                                }>
                                {getFieldDecorator(`policyNo`)(
                                    <Input placeholder="投保单号" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
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
                        <Col span={24} style={{ textAlign: "right" }}>
                            <Button type="primary"  htmlType="submit">
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
        );
    }
}


const mapStateToProps = state => {
    let stateObj = state.toJS();
    return {
        queryCriteria:stateObj.policyquery.queryCriteria,
    };   
};

const mapDispatchToProps = dispatch => ({
    changeQueryCriteria: params => {
        dispatch( actionCreators.changeQueryCriteria(params));
    },
    getTableData: params => {
        dispatch( actionCreators.getData(params));
    },
    showLoading: val => {
        dispatch(actionCreators.showLoading(val));
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(createForm({
    // onFieldsChange(props, fields) {
    //     const applyTimes = fields['applyTimes'];
    //         let para = {};
    //         if (applyTimes) {
    //             para= {
    //                 ...fields,
    //                 'startTime': applyTimes[0].format('YYYY-MM-DD'),
    //                 'endTime': applyTimes[1].format('YYYY-MM-DD'),
    //             }
    //         } else {
    //             para = { ...fields };
    //         }
    //         props.changeQueryCriteria(para);
    // }
})(AdvancedSearchForm));