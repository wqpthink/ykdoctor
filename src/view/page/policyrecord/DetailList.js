import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Table, Modal, Button, Pagination, Row, Col, Form, Select, Spin } from "antd";
import { actionCreators } from "./store/interface";
import { PageWrapper,ModalWrapper } from "./policyrecord-style";

const FormItem = Form.Item;
class DetailList extends PureComponent {
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
                title: "送检医院",
                dataIndex: "examinerHospital",
                width: 200,
                align: "center"
            },
            {
                title: "采样时间",
                width: 200,
                align: "center",
                dataIndex: "collectTime"
            },
            {
                title: "投保项目",
                width: 100,
                align: "center",
                render: (text, record) => (
                    <span>{this.renderType(record["itemType"])}</span>
                )
            },
            {
                title: "保单号",
                width: 150,
                align: "center",
                dataIndex: "policyNo"
            },
            {
                title: "信息状态",
                dataIndex: "dataCheckType",
                width: 100,
                align: "center",
                render: (text, record) => (
                    <span>{this.renderStatus(record["dataCheckType"])}</span>
                )
            },
            {
                title: "操作",
                align: "center",
                render: (text, record) => {
                    if (record["batchStatus"] == "0") {
                        return (
                            <span>
                                <a
                                    href="javascript:void(0);"
                                    className="c-red"
                                    onClick={() => this.showViewDetail(record)}>
                                    详情
                                </a>
                                <a
                                    href="javascript:void(0);"
                                    className="c-red"
                                    onClick={() => this.insureSel(record)}>
                                    投保
                                </a>
                            </span>
                        );
                    } else {
                        return (
                            <a
                                href="javascript:void(0);"
                                className="c-red"
                                onClick={() => this.showViewDetail(record)}>
                                详情
                            </a>
                        );
                    }
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
    // componentDidMount() {
    //     this.initData();
    // }
    // initData = () => {
    //     let info = this.props.modalInfo;
    //     let _para = {
    //         batchId: info.id,
    //         batchStatus: info.batchStatus,
    //         pageNum: 1
    //     };
    //     this.props.showPageLoading(true);
    //     this.props.getResultDetailList(_para);
    // };
    handleCancel = () => {
        this.setState({ visible: false });
    };
    //model 清单详情
    showViewDetail = record => {
        this.setState({ visible: true });
        let _para = {
            batchId: record.batchId,
            batchStatus: record.batchStatus,
            barcode: record.barcode
        };
        this.props.showPageLoading(true);
        this.props.getModalData(_para);
    };
    handleSearch = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            let state = {
                modalItem: values["modalItem"],
                modalStatus: values["modalStatus"]
            };
            this.setState(state);
            let info = this.props.modalInfo;
            let _para = {
                batchId: info.id,
                batchStatus: info.batchStatus,
                pageNum: 1,
                itemType: values["modalItem"],
                dataCheckType: values["modalStatus"]
            };
            this.props.showPageLoading(true);
            this.props.getResultDetailList(_para);
        });
    };
    handleReset = () => {
        this.props.form.resetFields();
    };
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
    onChange = pageNumber => {
        const para = {
            batchId: this.props.modalInfo.batchId,
            batchStatus: this.props.modalInfo.batchStatus,
            itemType: this.state.modalItem,
            dataCheckType: this.state.modalStatus,
            pageNum: pageNumber
        };
        this.props.showPageLoading(true);
        this.props.getResultDetailList(para);
    };
    render() {
        const { modalData, modalList, modalPageTotal, pageLoading } = this.props; //
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 18 },
                sm: { span: 12 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 }
            }
        };
        return (
            <PageWrapper>
                {/* <Spin spinning={pageLoading}> */}
                    <Form className="search-form" onSubmit={this.handleSearch}>
                        <Row gutter={24}>
                            <Col span={5} key="modalItem">
                                <FormItem
                                    {...formItemLayout}
                                    label={
                                        <span className="item-label">投保项目</span>
                                    }>
                                    {getFieldDecorator(`modalItem`, {
                                        initialValue: ""
                                    })(
                                        <Select placeholder="">
                                            <Select.Option value="">
                                                全部
                                        </Select.Option>
                                            <Select.Option value="1">
                                                无创
                                        </Select.Option>
                                            <Select.Option value="2">
                                                无创PLUS
                                        </Select.Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={5} key="modalStatus">
                                <FormItem
                                    {...formItemLayout}
                                    label={
                                        <span className="item-label">信息状态</span>
                                    }>
                                    {getFieldDecorator(`modalStatus`, {
                                        initialValue: ""
                                    })(
                                        <Select placeholder="">
                                            <Select.Option value="">
                                                全部
                                        </Select.Option>
                                            <Select.Option value="0">
                                                异常
                                        </Select.Option>
                                            <Select.Option value="1">
                                                正常
                                        </Select.Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>

                            <Col span={8} style={{ textAlign: "right" }}>
                                <Button
                                    style={{ backgroundColor: "#1a9c9e" }}
                                    onClick={this.exportExcel}>
                                    导出Excel
                            </Button>
                                <Button
                                    style={{
                                        marginLeft: 8,
                                        backgroundColor: "#ffce55"
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
                    <Table
                        size="small"
                        columns={this.columns}
                        dataSource={modalList}
                        bordered
                        rowClassName="table"
                        pagination={false}
                    />
                    <Pagination
                        showQuickJumper
                        defaultCurrent={1}
                        total={modalPageTotal}
                        onChange={this.onChange}
                        className="page"
                    />
                    <ModalWrapper>
                        <Modal
                            getContainer={() => document.getElementById("root")}
                            visible={this.state.visible}
                            title="详情"
                            onCancel={this.handleCancel}
                            footer={[
                                <Button key="back" onClick={this.handleCancel}>
                                    返回
                        </Button>
                            ]}
                            className="detail">
                            <Row type="flex" justify="start">
                                <Col span={4}>
                                    <h4 className="h4-title">投保信息：</h4>
                                </Col>
                            </Row>
                            <Row type="flex" justify="space-around">
                                <Col span={12}>
                                    <span>投保项目：</span>
                                    {modalData.examinationProjectName}
                                </Col>
                                <Col span={12}>
                                    <span>投保状态：</span>
                                    <span>
                                        {this.renderInsureStatus(modalData.batchStatus)}
                                    </span>
                                </Col>
                                <Col span={12}>
                                    <span>所属批次：</span>
                                    {modalData.batchNumber}
                                </Col>
                                <Col span={12}>
                                    <span>保单号：</span>
                                    {modalData.policyNo}
                                </Col>
                                <Col span={12}>
                                    <span>投保时间：</span>
                                    {modalData.insuredTime}
                                </Col>
                                <Col span={12}>
                                    <span>保险公司：</span>
                                    {modalData.insuranceCompany}
                                </Col>
                            </Row>
                            <Row type="flex" justify="start">
                                <Col span={4}>
                                    <h4 className="h4-title">标本信息：</h4>
                                </Col>
                            </Row>
                            <Row type="flex" justify="space-around">
                                <Col span={12}>
                                    <span>检验条码：</span>
                                    {modalData.barcode}
                                </Col>
                                <Col span={12}>
                                    <span>采样时间：</span>
                                    {modalData.collectTime}
                                </Col>
                                <Col span={12}>
                                    <span>送检医院：</span>
                                    {modalData.examinerHospital}
                                </Col>
                                <Col span={12}>
                                    <span>申请单号：</span>
                                    {modalData.applayNum}
                                </Col>
                            </Row>
                            <Row type="flex" justify="start">
                                <Col span={4}>
                                    <h4 className="h4-title">个人信息：</h4>
                                </Col>
                            </Row>
                            <Row type="flex" justify="space-around">
                                <Col span={12}>
                                    <span>姓名：</span>
                                    {modalData.examinerName}
                                </Col>
                                <Col span={12}>
                                    <span>证件类型：</span>
                                    <span>
                                        {this.renderCertificates(
                                            modalData.credentialsType
                                        )}
                                    </span>
                                </Col>
                                <Col span={12}>
                                    <span>联系电话：</span>
                                    {modalData.examinerPhone}
                                </Col>
                                <Col span={12}>
                                    <span>证件号码：</span>
                                    {modalData.credentialsNumber}
                                </Col>
                                <Col span={24}>
                                    <span>异常类型：</span>
                                    <span>
                                        {this.renderError(modalData.irregularType)}
                                    </span>
                                </Col>
                                <Col span={24}>
                                    <span>备注：</span>
                                    {modalData.irregularDesc}
                                </Col>
                            </Row>
                        </Modal>
                    </ModalWrapper>
                {/* </Spin> */}
            </PageWrapper>
        );
    }
}

const mapStateToProps = state => {
    let stateObj = state.toJS();
    return {
        pageLoading: stateObj.policyrecord.pageLoading,
        modalInfo: stateObj.policyrecord.modalInfo,
        modalList: stateObj.policyrecord.modalList,
        modalData: stateObj.policyrecord.modalData,
        modalPageTotal: parseInt(stateObj.policyrecord.modalPageTotal),
    };
};

const mapDispatchToProps = dispatch => ({
    showPageLoading: val => {
        dispatch(actionCreators.showPageLoading(val));
    },
    getModalData: para => {
        dispatch(actionCreators.getModalData(para));
    },
    getResultDetailList: para => {
        dispatch(actionCreators.getResultDetailList(para));
    },
    getModalData: para => {
        dispatch(actionCreators.getModalData(para));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Form.create({})(DetailList));
