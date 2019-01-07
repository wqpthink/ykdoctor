import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Modal, Button, Row, Col } from "antd";
import  StringUtil  from "../../../util/StringUtil";
import { actionCreators } from "./store/interface";
import { ModalWrapper } from "./policyhandle-style";

const defaultString = StringUtil.defaultString;
class PolicyDetail extends PureComponent {
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

    render() {
        const { isShowDetail, detailInfo, showDetail } = this.props; //
        return (
            <ModalWrapper>
                <Modal
                    visible={isShowDetail}
                    title="详情"
                    onCancel={() => { showDetail(false)}}
                    footer={[
                        <Button key="back" onClick={() => {showDetail(false)}}>
                            返回
                        </Button>
                    ]}>
                    <Row type="flex" justify="start">
                        <Col span={4}>
                            <h4>投保信息：</h4>
                        </Col>
                    </Row>
                    <Row type="flex" justify="space-around">
                        <Col span={12}>
                            <span>投保项目：</span>
                            {defaultString(detailInfo.itemTypeName,"----")}
                        </Col>
                        <Col span={12}>
                            <span>投保状态：</span>
                            <span>
                                {defaultString(this.renderStatus(detailInfo.batchStatus),"----")}
                            </span>
                        </Col>
                        <Col span={12}>
                            <span>所属批次：</span>
                            {defaultString(detailInfo.batchNumber,"----")}
                        </Col>
                        <Col span={12}>
                            <span>保单号：</span>
                            {defaultString(detailInfo.policyNo,"----")}
                        </Col>
                        <Col span={12}>
                            <span>投保时间：</span>
                            {defaultString(detailInfo.insuredTime,"----")}
                        </Col>
                        <Col span={12}>
                            <span>保险公司：</span>
                            {defaultString(detailInfo.insuranceCompany,"----")}
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
                            {defaultString(detailInfo.barcode,"----")}
                        </Col>
                        <Col span={12}>
                            <span>采样时间：</span>
                            {defaultString(detailInfo.collectTime,"----")}
                        </Col>
                        <Col span={12}>
                            <span>送检医院：</span>
                            {defaultString(detailInfo.examinerHospital,"----")}
                        </Col>
                        <Col span={12}>
                            <span>申请单号：</span>
                            {defaultString(detailInfo.applayNum,"----")}
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
                            {defaultString(detailInfo.examinerName,"----")}
                        </Col>
                        <Col span={12}>
                            <span>证件类型：</span>
                            <span>
                                {defaultString(this.renderCertificates(
                                    detailInfo.credentialsType
                                ),"----")}
                            </span>
                        </Col>
                        <Col span={12}>
                            <span>联系电话：</span>
                            {defaultString(detailInfo.examinerPhone,"----")}
                        </Col>
                        <Col span={12}>
                            <span>证件号码：</span>
                            {defaultString(detailInfo.credentialsNumber,"----")}
                        </Col>
                        <Col span={24}>
                            <span>异常类型：</span>
                            <span>
                                {defaultString(this.renderError(detailInfo.irregularType),"----")}
                            </span>
                        </Col>
                        <Col span={24}>
                            <span>备注：</span>
                            {defaultString(detailInfo.irregularDesc,"----")}
                        </Col>
                    </Row>
                </Modal>
            </ModalWrapper>
        );
    }
}
const mapStateToProps = state => {
    let stateObj = state.toJS();
    return {
        isShowDetail: stateObj.policyhandle.isShowDetail,
        detailInfo: stateObj.policyhandle.detailInfo
    };
};
const mapDispatchToProps = dispatch => ({
    showDetail: flag => {
        dispatch(actionCreators.showDetail(flag));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PolicyDetail);
