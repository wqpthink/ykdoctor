import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Table, Modal, Button, Pagination, Row, Col } from "antd";
import { PageWrapper } from "./policyquery-style";
import AdvancedSearchForm from "./queryForm";
import { actionCreators } from "./store/interface";

class PolicyQuery extends PureComponent {
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
                title: "批次号",
                dataIndex: "batchNumber",
                width: 200,
                align: "center"
            },
            {
                title: "检验条码号",
                dataIndex: "barcode",
                width: 200,
                align: "center"
            },
            {
                title: "申请单号",
                dataIndex: "applayNum",
                width: 250,
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
                title: "投保项目",
                width: 150,
                align: "center",
                render: (text, record) => (
                    <span>{this.renderType(record["itemType"])}</span>
                )
            },
            {
                title: "投保状态",
                dataIndex: "resultStatus",
                width: 150,
                align: "center",
                render: (text, record) => (
                    <span>{this.renderStatus(record["resultStatus"])}</span>
                )
            },
            {
                title: "身份证号",
                dataIndex: "credentialsNumber",
                width: 300,
                align: "center"
            },
            {
                title: "投保时间",
                dataIndex: "insuredTime",
                width: 250,
                align: "center"
            },
            {
                title: "保单号",
                dataIndex: "policyNo",
                width: 200,
                align: "center"
            },
            {
                title: "操作",
                align: "center",
                render: (text, record) => (
                    <a
                        href="javascript:void(0);"
                        className="c-red"
                        onClick={() => this.showViewDetail(record)}>
                        详情
                    </a>
                ),
                width: 100
            }
        ];
    }

    state = {
        visible: false,
        modalData: {}
    };

    componentDidMount() {
        this.props.getTableData({});
    }
    handleCancel = () => {
        this.setState({ visible: false });
    };
    showViewDetail = record => {
        this.setState({ modalData: record, visible: true });
    };

    //投保项目
    renderType = val => {
        if (val == "1") {
            return "无创";
        } else if (val == "2") {
            return "无创PLUS";
        }
    };
    //投保状态
    renderStatus = val => {
        if (val == "1") {
            return "申请中";
        } else if (val == "2") {
            return "投保成功";
        } else if (val == "3") {
            return "投保失败";
        }
    };

    //证件类型
    renderCertificates = val => {
        if (val == "1") {
            return "身份证";
        }
    };
    //证件类型
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
            ...this.props.queryCriteria,
            pageNum: pageNumber
        };
        this.props.showLoading(true);
        this.props.getTableData(para);
    };
    render() {
        const { tableData, pageTotal, loading } = this.props; //
        return (
            <PageWrapper>
                <AdvancedSearchForm />
                <Table
                    size="small"
                    loading={loading}
                    columns={this.columns}
                    dataSource={tableData}
                    bordered
                    rowClassName="table"
                    pagination={false}
                />
                <Pagination
                    showQuickJumper
                    defaultCurrent={1}
                    total={pageTotal}
                    onChange={this.onChange}
                    className="page"
                />
                <Modal
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
                            <h4>投保信息：</h4>
                        </Col>
                    </Row>
                    <Row type="flex" justify="space-around">
                        <Col span={12}>
                            <span>投保项目：</span>
                            {this.state.modalData.examinationProjectName}
                        </Col>
                        <Col span={12}>
                            <span>投保状态：</span>
                            <span>
                                {this.renderStatus(
                                    this.state.modalData.batchStatus
                                )}
                            </span>
                        </Col>
                        <Col span={12}>
                            <span>所属批次：</span>
                            {this.state.modalData.batchNumber}
                        </Col>
                        <Col span={12}>
                            <span>保单号：</span>
                            {this.state.modalData.policyNo}
                        </Col>
                        <Col span={12}>
                            <span>投保时间：</span>
                            {this.state.modalData.insuredTime}
                        </Col>
                        <Col span={12}>
                            <span>保险公司：</span>
                            {this.state.modalData.insuranceCompany}
                        </Col>
                    </Row>
                    <Row type="flex" justify="start">
                        <Col span={4}>
                            <h4>标本信息：</h4>
                        </Col>
                    </Row>
                    <Row type="flex" justify="space-around">
                        <Col span={12}>
                            <span>检验条码：</span>
                            {this.state.modalData.barcode}
                        </Col>
                        <Col span={12}>
                            <span>采样时间：</span>
                            {this.state.modalData.collectTime}
                        </Col>
                        <Col span={12}>
                            <span>送检医院：</span>
                            {this.state.modalData.examinerHospital}
                        </Col>
                        <Col span={12}>
                            <span>申请单号：</span>
                            {this.state.modalData.applayNum}
                        </Col>
                    </Row>
                    <Row type="flex" justify="start">
                        <Col span={4}>
                            <h4>个人信息：</h4>
                        </Col>
                    </Row>
                    <Row type="flex" justify="space-around">
                        <Col span={12}>
                            <span>姓名：</span>
                            {this.state.modalData.examinerName}
                        </Col>
                        <Col span={12}>
                            <span>证件类型：</span>
                            <span>
                                {this.renderCertificates(
                                    this.state.modalData.credentialsType
                                )}
                            </span>
                        </Col>
                        <Col span={12}>
                            <span>联系电话：</span>
                            {this.state.modalData.examinerPhone}
                        </Col>
                        <Col span={12}>
                            <span>证件号码：</span>
                            {this.state.modalData.credentialsNumber}
                        </Col>
                        <Col span={24}>
                            <span>异常类型：</span>
                            <span>
                                {this.renderError(
                                    this.state.modalData.irregularType
                                )}
                            </span>
                        </Col>
                        <Col span={24}>
                            <span>备注：</span>
                            {this.state.modalData.irregularDesc}
                        </Col>
                    </Row>
                </Modal>
            </PageWrapper>
        );
    }
}

const mapStateToProps = state => {
    let stateObj = state.toJS();
    return {
        queryCriteria: stateObj.policyquery.queryCriteria,
        tableData: stateObj.policyquery.tableData,
        pageTotal: stateObj.policyquery.pageTotal,
        loading: stateObj.policyquery.loading
    };
};

const mapDispatchToProps = dispatch => ({
    getTableData: params => {
        dispatch(actionCreators.getData(params));
    },
    showLoading: val => {
        dispatch(actionCreators.showLoading(val));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PolicyQuery);
