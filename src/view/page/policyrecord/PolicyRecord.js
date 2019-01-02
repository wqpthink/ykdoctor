import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Table, Modal, Button, Pagination, Row, Col, Spin } from "antd";
import { PageWrapper } from "./policyrecord-style";
import AdvancedSearchForm from "./queryForm";
import DetailList from "./DetailList";
import Insure from "./Insure";
import { actionCreators } from "./store/interface";


const initNumber = (val) => {
    if (!val) {
        return "0";
    }
}
class PolicyQuery extends PureComponent {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "序号",
                dataIndex: "index",
                width: 60,
                align: "center",
                render: (text, record, index) => (<span>{index + 1}</span>)
            },
            {
                title: "批次号",
                dataIndex: "batchNumber",
                width: 200,
                align: "center"
            },
            {
                title: "批次生成时间",
                dataIndex: "batchGenTime",
                width: 200,
                align: "center"
            },
            {
                title: "投保时间",
                dataIndex: "insuredTime",
                width: 200,
                align: "center"
            },
            {
                title: "保险公司",
                dataIndex: "insuranceCompany",
                width: 100,
                align: "center"
            },
            {
                title: "操作人",
                dataIndex: "insuredOperator",
                width: 150,
                align: "center"
            },
            {
                title: "投保人数(无创)",
                width: 150,
                align: "center",
                dataIndex: "insuredTotal",
            }, {
                title: "正常人数",
                width: 150,
                align: "center",
                dataIndex: "insuredSuccess",
            }, {
                title: "异常人数",
                width: 150,
                align: "center",
                dataIndex: "insuredFail",
            },
            {
                title: "批次状态",
                dataIndex: "batchStatus",
                width: 120,
                align: "center",
                render: (text, record) => (
                    <span>{this.renderStatus(record["batchStatus"])}</span>
                )
            },
            {
                title: "操作",
                align: "center",
                render: (text, record) => {
                    if (record["batchStatus"] == "0") {
                        return (<span>
                            < a
                                href="javascript:void(0);"
                                className="c-red mrgR10px"
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
                        return (<a
                            href="javascript:void(0);"
                            className="c-red"
                            onClick={() => this.showViewDetail(record)}>
                            详情
                        </a>);
                    }
                },
                width: 100
            }
        ];
    }

    state = {
        visible: false,
        title: '',
        modalItem: '',
        modalStatus: '',
    }

    componentDidMount() {
        this.props.showPageLoading(true);
        this.props.getInsureRecord();
    }
    handleCancel = () => {
        this.setState({ visible: false });
    }

    //model 清单详情
    showViewDetail = record => {
        this.props.showPageLoading(true);
        this.props.getInsureDetail(record.id);
        //let info = this.props.modalInfo;
        // let _title = `投保记录>记录清单（
        // 所属批次：${info.batchNumber}，
        // 共 ${info.insuredTotal}人，
        // 正常人数 ${info.insuredSuccess}，
        // 异常人数 ${info.insuredFail})`;
        this.setState({ visible: true });
    }
    onSelectChange = (selectedRowKeys, selectedRows) => {
        if (this.props.isSelectAll) {
            this.props.changeSelectAll(false);
        }
        this.props.selectRows(selectedRowKeys, selectedRows);
        this.props.setInsureRowKeys(selectedRowKeys);
    }
    modalPageChange = pageNumber => {
        const para = {
            batchId: this.props.modalInfo.batchId,
            batchStatus: this.props.modalInfo.batchStatus,
            itemType: this.state.modalItem,
            dataCheckType: this.state.modalStatus,
            pageNum: pageNumber,
        };
        this.props.getResultDetailList(para);
    }
    handleSearch = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            let state = {
                modalItem: values['modalItem'],
                modalStatus: values['modalStatus']
            }
            this.setState(state);
        });
    }

    
    insureSel = item => {
        const insureOk = (id) => {
            this.props.insureSelected(id);
            this.props.showPageLoading(true);
        }
        Modal.confirm({
            title: '提示！',
            content: `您正在进行投保操作,批次号为${item.batchNumber}共${item.insuredTotal}人，是否继续？`,
            okText: '确认',
            cancelText: '取消',
            onOk: () => {insureOk(item.id)},
        });
    }
    //投保项目
    renderType = val => {
        if (val == "1") {
            return "无创";
        } else if (val == "2") {
            return "无创PLUS";
        }
    }
    //投保状态
    renderStatus = val => {
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
    }


    onChange = pageNumber => {
        const para = {
            ...this.props.queryCriteria,
            pageNum: pageNumber
        };
        this.props.showLoading(true);
        this.props.getInsureRecord(para, this.props.isSelectAll);
    };
    render() {
        const { insureRecord, listTotal, selectedRowKeys, isTableLoading, currentPage, modalInfo, modalTitle, isShowInsureModal,pageLoading } = this.props; //
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <PageWrapper>
                <Spin spinning={pageLoading} style={{zIndex:"9000"}}>
                <AdvancedSearchForm />
                {isShowInsureModal ? (<Insure></Insure>) : ("")}
                <Table
                    rowSelection={rowSelection}
                    size="small"
                    columns={this.columns}
                    dataSource={insureRecord}
                    bordered
                    rowClassName="table"
                    pagination={false}
                    // loading={isTableLoading}
                />
                <Pagination
                    showQuickJumper
                    defaultCurrent={1}
                    total={listTotal}
                    onChange={this.onChange}
                    className="page"
                    current={currentPage}
                />
                <Modal
                    width={1000}
                    bodyStyle={{
                        height: "60vh",
                        overflow: "auto"
                    }}
                    visible={this.state.visible}
                    title={modalTitle}
                    onCancel={this.handleCancel}
                    getContainer={() => document.getElementById("root")}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            返回
                        </Button>
                    ]}
                    className="detail">
                    <DetailList></DetailList>
                </Modal>
                </Spin>
            </PageWrapper >
        );
    }
}

const mapStateToProps = state => {
    let stateObj = state.toJS();
    return {
        queryCriteria: stateObj.policyrecord.queryCriteria,
        insureRecord: stateObj.policyrecord.insureRecord,
        listTotal: parseInt(stateObj.policyrecord.listTotal),
        isSelectAll: stateObj.policyrecord.isSelectAll,
        selectedRowKeys: stateObj.policyrecord.selectedRowKeys,
        selectedRows: stateObj.policyrecord.selectedRows,
        isTableLoading: stateObj.policyrecord.isTableLoading,
        pageLoading: stateObj.policyrecord.pageLoading,
        currentPage: stateObj.policyrecord.currentPage,
        modalInfo: stateObj.policyrecord.modalInfo,
        modalTitle: stateObj.policyrecord.modalTitle,
        isShowInsureModal: stateObj.policyrecord.isShowInsureModal,
    };
};

const mapDispatchToProps = dispatch => ({
    getInsureRecord: (params, isSelectAll = false) => {
        dispatch(actionCreators.getInsureRecord(params, isSelectAll));
    },
    showLoading: val => {
        dispatch(actionCreators.showLoading(val));
    },
    showPageLoading: val => {
        dispatch(actionCreators.showPageLoading(val));
    },
    selectRows: (selectedRowKeys, selectedRows) => {
        dispatch(actionCreators.selectRows(selectedRowKeys, selectedRows));
    },
    changeSelectAll: val => {
        dispatch(actionCreators.changeSelectAll(val));
    },
    insureSelected: str => {
        dispatch(actionCreators.insureSelected(str));
    },
    getInsureDetail: id => {
        dispatch(actionCreators.getInsureDetail(id));
    },
    setInsureRowKeys: list => {
        dispatch(actionCreators.setInsureRowKeys(list));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PolicyQuery);
