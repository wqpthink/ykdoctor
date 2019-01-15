import React, { PureComponent } from "react";
import { Form, Row, Col, Input, Button, Select, DatePicker, Modal } from "antd";
import { connect } from "react-redux";
import { actionCreators } from "./store/interface";
import { QureWrapper } from "./informationclass-style";


const FormItem = Form.Item;
const createForm = Form.create;

class AdvancedSearchForm extends PureComponent {
    handleSearch = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            let para = {
                ...values,
                pageSize: "10",
                pageNum:1
            }
            this.props.changeQueryCriteria(para);
            this.props.showPageLoading(true);
            this.props.getInfoClass(para);
        });
    };

    handleReset = () => {
        this.props.form.resetFields();
        this.props.changeQueryCriteria({});
    };

    // 展示新增
    showAdd = () => {
        this.props.chageModalInfo({
            title: "添加分类",
            isAdd: true
        });
        this.props.chageModalData();
        this.props.getClassificationsRoot();
        this.props.showModal(true);
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 16 },
                sm: { span: 6 }
            },
            wrapperCol: {
                xs: { span: 10 },
                sm: { span: 6 }
            }
        };
        return (
            <QureWrapper>
                <h3 style={{ color: "#43aaab" }}>查询条件</h3>
                <Form className="search-form" onSubmit={this.handleSearch}>
                    <Row gutter={18}>
                        <Col span={6} key="name">
                            <FormItem
                                {...formItemLayout}
                                label={
                                    <span className="item-label">分类名称</span>
                                }>
                                {getFieldDecorator(`name`, {
                                    rules: [
                                        {
                                            type: "string",
                                            message: "请输入正确的分类名称!"
                                        }
                                    ]
                                })(<Input placeholder="请输入分类名称" />)}
                            </FormItem>
                        </Col>
                        <Col span={6} key="appCode">
                            <FormItem
                                {...formItemLayout}
                                label={
                                    <span className="item-label">访问入口</span>
                                }>
                                {getFieldDecorator(`appCode`, {
                                    initialValue: ""
                                })(
                                    <Select placeholder="">
                                        <Select.Option value="">
                                            请选择
                                        </Select.Option>
                                        <Select.Option value="1">
                                            云康医生
                                        </Select.Option>
                                        <Select.Option value="2">
                                            云康服务
                                        </Select.Option>
                                        <Select.Option value="3">
                                            云康社区
                                        </Select.Option>
                                        <Select.Option value="4">
                                            微信公众号
                                        </Select.Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6} key="careerType">
                            <FormItem
                                {...formItemLayout}
                                label={
                                    <span className="item-label">授权身份</span>
                                }>
                                {getFieldDecorator(`careerType`, {
                                    initialValue: ""
                                })(
                                    <Select placeholder="">
                                        <Select.Option value="">
                                            请选择
                                        </Select.Option>
                                        <Select.Option value="1">
                                            合作医生
                                        </Select.Option>
                                        <Select.Option value="2">
                                            认证医生
                                        </Select.Option>
                                        <Select.Option value="3">
                                            社区医生
                                        </Select.Option>
                                        <Select.Option value="4">
                                            普通医生
                                        </Select.Option>
                                        <Select.Option value="5">
                                            保险代理人
                                        </Select.Option>
                                        <Select.Option value="6">
                                            康信用户
                                        </Select.Option>
                                        <Select.Option value="7">
                                            认证护士
                                        </Select.Option>
                                        <Select.Option value="8">
                                            普通护士
                                        </Select.Option>
                                        <Select.Option value="9">
                                            云康销售
                                        </Select.Option>
                                        <Select.Option value="10">
                                            游客
                                        </Select.Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6} key="status">
                            <FormItem
                                {...formItemLayout}
                                label={
                                    <span className="item-label">状 态</span>
                                }>
                                {getFieldDecorator(`status`, {
                                    initialValue: ""
                                })(
                                    <Select placeholder="">
                                        <Select.Option value="">
                                            请选择
                                        </Select.Option>
                                        <Select.Option value="1">
                                            启用
                                        </Select.Option>
                                        <Select.Option value="2">
                                            禁用
                                        </Select.Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} style={{ textAlign: "right" }}>
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
                    <Row>
                        <Col span={12} style={{ textAlign: "left" }}>
                            <Button
                                style={{
                                    backgroundColor: "#50c1e9",
                                    color: "#fff"
                                }}
                                onClick={this.showAdd}>
                                新增
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
        queryCriteria: stateObj.informationclass.queryCriteria,
        currentPage: stateObj.informationclass.currentPage
    };
};

const mapDispatchToProps = dispatch => ({
    changeQueryCriteria: params => {
        dispatch(actionCreators.changeQueryCriteria(params));
    },
    getInfoClass: (params) => {
        dispatch(actionCreators.getInfoClass(params));
    },
    showPageLoading: val => {
        dispatch(actionCreators.showPageLoading(val));
    },
    showModal: val => {
        dispatch(actionCreators.showModal(val));
    },
    chageModalInfo: (val) => {
        dispatch(actionCreators.chageModalInfo(val));
    },
    getClassificationsRoot: () => {
        dispatch(actionCreators.getClassificationsRoot());
    },
    chageModalData: (val) => {
        dispatch(actionCreators.chageModalData(val));
    },
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(createForm({})(AdvancedSearchForm));
