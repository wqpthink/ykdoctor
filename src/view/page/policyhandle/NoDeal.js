import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Modal, Form, Row, Col, Radio ,Input} from "antd";
import { actionCreators } from "./store/interface";
import { ModalWrapper } from "./policyhandle-style";

const FormItem = Form.Item;
const { TextArea } = Input;
class NoDeal extends PureComponent {
    /**
* 无需处理原因
*/
    //隐藏无需处理原因弹框
    cancelNoDeal = () => {
        this.props.showNoDeal(false);
    }
    //提交需处理原因
    submitNoDeal = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            let self=this,temp = [];
            this.props.noDealList.map((item) => {
                temp.push(item.id)
            });
            let ids = temp.join(",");
            let _para = {
                ...values,
                ids:ids
            };
            this.props.submitNoDeal(_para);
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
        const { modalLoading, isShowNoDeal } = this.props; //
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
                        height: "20vh",
                        overflow: "auto"
                    }}
                    confirmLoading={modalLoading}
                    visible={isShowNoDeal}
                    title="无需处理原因"
                    destroyOnClose={true}
                    onCancel={this.cancelNoDeal}
                    onOk={this.submitNoDeal}
                    getContainer={() => document.getElementById("root")}
                    className="detail">
                    <Form className="search-form" onSubmit={this.submitNoDeal}>
                        <FormItem
                            {...formItemLayout}
                            label={
                                <span className="item-label">
                                    原因
                                    </span>
                            }>
                            {getFieldDecorator(`nohandleReason`, {
                                valuePropName: 'radio',
                            })(
                                <Radio.Group onChange={this.onChange} value={this.state.value}>
                                <Radio value={0}>线下投保</Radio>
                                <Radio value={1}>其它</Radio>
                                </Radio.Group>
                            )}
                        </FormItem>
                        <Row gutter={24}>
                            <FormItem
                                {...formItemLayout}
                                label={
                                    <span className="item-label">
                                        备注
                                    </span>
                                }>
                                {getFieldDecorator(`nohandleRemarks`)(<TextArea rows={6} placeholder="请输入备注"/>)}
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
        isShowNoDeal: stateObj.policyhandle.isShowNoDeal,
        noDealList: stateObj.policyhandle.noDealList,
        queryCriteria: stateObj.policyhandle.queryCriteria,
    };
};
const mapDispatchToProps = dispatch => ({
    showDetail: flag => {
        dispatch(actionCreators.showDetail(flag));
    },
    showNoDeal: val => {
        dispatch(actionCreators.showNoDeal(val));
    },
    submitNoDeal: (operatorName, list) => {
        dispatch(actionCreators.submitBatchNo(operatorName, list));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Form.create({})(NoDeal));


