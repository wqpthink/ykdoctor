import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Modal, Form, Row, Col, Input } from "antd";
import { actionCreators } from "./store/interface";
import { ModalWrapper } from "./policyhandle-style";

const FormItem = Form.Item;
const { TextArea } = Input;
class ModifyInfo extends PureComponent {
    /**
* 修改
*/
    //隐藏修改
    cancelModify = () => {
        this.props.showModify(false);
    }
    //提交修改
    confirmModify = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            let self = this, _para = {
                ...values,
                id: this.props.modifyInfo.id
            };
            this.props.submitModifyInfo(_para);
            setTimeout(() => {
                let param = {
                    ...self.props.queryCriteria,
                    dataCheckType: "01",
                    pageNum: 1,
                    pageSize: 10
                };
                self.props.getInsureHandle(param, self.props.isSelectAll);
            }, 1000);
        });
    };

    render() {
        const { modalLoading, isShowModify, modifyInfo } = this.props; //
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
            <ModalWrapper>
                <Modal
                    width={500}
                    bodyStyle={{
                        height: "50vh",
                        overflow: "auto"
                    }}
                    confirmLoading={modalLoading}
                    visible={isShowModify}
                    title="无需处理原因"
                    destroyOnClose={true}
                    onCancel={this.cancelModify}
                    onOk={this.confirmModify}
                    getContainer={() => document.getElementById("root")}
                    className="detail">
                    <Form className="search-form" onSubmit={this.confirmModify}>
                        <Row gutter={24}>
                            <Col span={24} key="barcode">
                                <FormItem
                                    {...formItemLayout}
                                    label={
                                        <span className="item-label">
                                            检验条码
                                    </span>
                                    }>
                                    {modifyInfo.barcode}
                                </FormItem>
                            </Col>
                            <Col span={24} key="examinerName">
                                <FormItem
                                    {...formItemLayout}
                                    label={
                                        <span className="item-label">
                                            检验条码
                                    </span>
                                    }>
                                    {getFieldDecorator(`examinerName`, {
                                        initialValue: modifyInfo.examinerName || '',
                                    })(<Input placeholder="投保人姓名" />)}
                                </FormItem>
                            </Col>
                            <Col span={24} key="examinerPhone">
                                <FormItem
                                    {...formItemLayout}
                                    label={
                                        <span className="item-label">
                                            电话号码
                                    </span>
                                    }>
                                    {getFieldDecorator(`examinerPhone`, {

                                        initialValue: modifyInfo.examinerPhone || '',
                                    })(<Input placeholder="电话号码" maxLength="11" />)}
                                </FormItem>
                            </Col>
                            <Col span={24} key="credentialsNumber">
                                <FormItem
                                    {...formItemLayout}
                                    label={
                                        <span className="item-label">
                                            证件号码
                                    </span>
                                    }>
                                    {getFieldDecorator(`credentialsNumber`, {
                                        initialValue: modifyInfo.credentialsNumber || '',
                                    })(<Input placeholder="检验条码" />)}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <FormItem
                                {...formItemLayout}
                                label={
                                    <span className="item-label">
                                        异常信息
                                    </span>
                                }>
                                {getFieldDecorator(`irregularDesc`, {
                                    initialValue: modifyInfo.irregularDesc || '',
                                })(<TextArea rows={6} disabled={true} />)}
                            </FormItem>
                        </Row>
                    </Form>
                </Modal>
            </ModalWrapper>
        );
    }
}
const mapStateToProps = state => {
    let stateObj = state.toJS();
    return {
        modalLoading: stateObj.policyhandle.modalLoading,
        isShowModify: stateObj.policyhandle.isShowModify,
        noDealList: stateObj.policyhandle.noDealList,
        queryCriteria: stateObj.policyhandle.queryCriteria,
        modifyInfo: stateObj.policyhandle.modifyInfo
    };
};
const mapDispatchToProps = dispatch => ({
    showModify: flag => {
        dispatch(actionCreators.showModify(flag));
    },
    chageModifyInfo: val => {
        dispatch(actionCreators.chageModifyInfo(val));
    },
    submitModifyInfo: val => {
        dispatch(actionCreators.submitModifyInfo(val));
    },
    getInsureHandle: (para, isSelectAll) => {
        dispatch(actionCreators.getInsureHandle(para, isSelectAll));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Form.create({})(ModifyInfo));


