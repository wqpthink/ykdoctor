import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Modal, Form, Row, Col, Input, Select, Checkbox } from "antd";
import { actionCreators } from "./store/interface";
import { ModalWrapper } from "./informationclass-style";

const FormItem = Form.Item;
const { TextArea } = Input;
class ModifyInfo extends PureComponent {
    /**
* 修改
*/
    //隐藏修改
    cancelModal = () => {
        this.props.showModal(false);
    }
    //提交修改
    confirmModal = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            let self = this;
            let _appCode = values['appCode'].join(","),
                _careerType = values['careerType'].join(","),
                _parentClass=values['parentId'],
                _parentId = "",
                _parentName="";
            if (_parentClass) {
                _parentId = values['parentId'].key;
                _parentName = values['parentId'].label; 
            } else {
                _parentId = this.props.modalData.parentId;
                _parentName = this.props.modalData.parentName; 
            }             
            let para = {
                ...values,
                appCode: _appCode,
                careerType: _careerType,
                parentId: _parentId,
                parentName: _parentName,
                grade: _parentId == "-1" ? "1" : "2"
            };
            if (this.props.modalInfo.isAdd) {
                this.props.addModal(para);
            } else {
                para.id = this.props.modalData.id;
                this.props.modifyModal(para);
            }

        });
    };

    render() {
        const { modalLoading, isShowModal, modalInfo, modalData, classifications } = this.props; //
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 20 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 },
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
                    visible={isShowModal}
                    title={modalInfo.title}
                    destroyOnClose={true}
                    onCancel={this.cancelModal}
                    onOk={this.confirmModal}
                    getContainer={() => document.getElementById("root")}
                    className="detail">
                    <Form className="search-form" onSubmit={this.confirmModify}>
                        <Row gutter={24}>
                            <Col span={24} key="name">
                                <FormItem
                                    {...formItemLayout}
                                    label={
                                        <span className="item-label">
                                            分类名称
                                    </span>
                                    }>
                                    {getFieldDecorator(`name`, {
                                        initialValue: modalData.name || '',
                                        rules: [{ type: 'string', required: true, message: '分类名称不能为空!' }],
                                    })(<Input placeholder="分类名称" maxLength={10} />)}
                                </FormItem>
                            </Col>
                            <Col span={24} key="classifications">
                                {modalData.hasSubClassification && modalData.hasSubClassification == "1" ? "" : (
                                    <FormItem
                                        {...formItemLayout}
                                        label={
                                            <span className="item-label">
                                                上级分类
                                    </span>
                                        }
                                    >
                                        {getFieldDecorator(`parentId`, {
                                            initialValue: { key: `${modalData.parentId}`,label: `${modalData.parentName}` } || {},
                                            rules: [{ required: true, message: '上级分类不能为空!' }],
                                        })(<Select labelInValue >
                                            <Select.Option key="-1">
                                                无
                                            </Select.Option>
                                            {classifications.map(item => {
                                                return (<Select.Option key={item.id}>
                                                    {item.name}
                                                </Select.Option>)
                                            })}
                                        </Select>)}
                                    </FormItem>
                                )}

                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={24} key="appCode">
                                <FormItem
                                    {...formItemLayout}
                                    label={
                                        <span className="item-label">
                                            访问入口
                                    </span>
                                    }>
                                    {getFieldDecorator(`appCode`, {
                                        initialValue: modalData.appCode&&modalData.appCode.split(",") || [],
                                        rules: [{ type: 'array', required: true, message: '访问入口不能为空!' }],
                                    })(
                                        <Checkbox.Group style={{ width: "100%" }} >
                                            <Row>
                                                <Col span={8}><Checkbox value="1">云康医生</Checkbox></Col>
                                                <Col span={8}><Checkbox value="2">云康服务</Checkbox></Col>
                                                <Col span={8}><Checkbox value="3">云康社区</Checkbox></Col>
                                                <Col span={8}><Checkbox value="4">微信公众号</Checkbox></Col>
                                            </Row>
                                        </Checkbox.Group>,
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={24} key="careerType">
                                <FormItem
                                    {...formItemLayout}
                                    label={
                                        <span className="item-label">
                                            授权身份
                                    </span>
                                    }>
                                    {getFieldDecorator(`careerType`, {
                                        initialValue: modalData.careerType&&modalData.careerType.split(",") || [],
                                        rules: [{ type: 'array', required: true, message: '授权身份不能为空!' }],
                                    })(
                                        <Checkbox.Group style={{ width: "100%" }} >
                                            <Row>
                                                <Col span={8}><Checkbox value="1">合作医生</Checkbox></Col>
                                                <Col span={8}><Checkbox value="2">认证医生</Checkbox></Col>
                                                <Col span={8}><Checkbox value="3">社区医生</Checkbox></Col>
                                                <Col span={8}><Checkbox value="4">普通医生</Checkbox></Col>
                                                <Col span={8}><Checkbox value="5">保险代理人</Checkbox></Col>
                                                <Col span={8}><Checkbox value="6">康信用户</Checkbox></Col>
                                                <Col span={8}><Checkbox value="7">认证护士</Checkbox></Col>
                                                <Col span={8}><Checkbox value="8">普通护士</Checkbox></Col>
                                                <Col span={8}><Checkbox value="9">云康销售</Checkbox></Col>
                                                <Col span={8}><Checkbox value="10">游客</Checkbox></Col>
                                            </Row>
                                        </Checkbox.Group>,
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={24} key="sort">
                                <FormItem
                                    {...formItemLayout}
                                    label={
                                        <span className="item-label">
                                            排序
                                    </span>
                                    }>
                                    {getFieldDecorator(`sort`, {
                                        initialValue: modalData.sort || '',
                                        rules: [{ required: true, message: '排序不能为空!' }],
                                    })(<Input placeholder="排序" maxLength={2} />)}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={24} key="status">
                                <FormItem
                                    {...formItemLayout}
                                    label={
                                        <span className="item-label">
                                            状态
                                    </span>
                                    }>
                                    {getFieldDecorator(`status`, {
                                        initialValue: modalData.status || '1',
                                    })(<Select placeholder="">
                                        <Select.Option value="1">
                                            启用
                                </Select.Option>
                                        <Select.Option value="0">
                                            禁用
                                </Select.Option>
                                    </Select>)}
                                </FormItem>
                            </Col>
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
        modalLoading: stateObj.informationclass.modalLoading,
        isShowModal: stateObj.informationclass.isShowModal,
        queryCriteria: stateObj.informationclass.queryCriteria,
        modalInfo: stateObj.informationclass.modalInfo,
        modalData: stateObj.informationclass.modalData,
        classifications: stateObj.informationclass.classifications,
    };
};
const mapDispatchToProps = dispatch => ({
    showModal: flag => {
        dispatch(actionCreators.showModal(flag));
    },
    chageModifyInfo: val => {
        dispatch(actionCreators.chageModifyInfo(val));
    },
    addModal: val => {
        dispatch(actionCreators.addModal(val));
    },
    modifyModal: val => {
        dispatch(actionCreators.modifyModal(val));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Form.create({})(ModifyInfo));


