import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Modal, Spin } from "antd";
import { actionCreators } from "./store/interface";

class Insure extends PureComponent {
    state = {
        visible: false,
        confirmContent: "",
    }
    componentWillMount() {
        //this.props.showLoading(true);
        this.initData();
    }
    handleOk = () => {
        let idStr = this.props.insureRowKeys.join(",");
        this.props.showPageLoading(true);
        this.props.insureSelected(idStr);
        this.props.showInsureModal(false);
        this.handleCancel();
    }
    handleCancel = () => {
        this.props.showInsureModal(false);
        this.setState({ visible: false});
    }
    initData = () => {
        if (this.props.insureRowKeys.length == 0) {
            Modal.error({
                title: "提示",
                content: "您目前没有选中可投保信息,请选择！"
            });
            return;
        } else {
            let
                _confirmContent = `您正在对${
                    this.props.insureRowKeys.length
                    }个未投保的批次信息进行投保，是否继续？`;

            this.setState({ visible: true, confirmContent: _confirmContent });
        }
    }
    render() {
        const { isShowInsureModal } = this.props; //
        return (
            <Modal
                title="提示！"
                visible={this.state.visible}
                onOk={this.handleOk.bind(this)}
                onCancel={this.handleCancel}
                maskClosable={false}
            >
                <p>{this.state.confirmContent}</p>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    let stateObj = state.toJS();
    return {
        pageLoading: stateObj.policyrecord.pageLoading,
        insureRowKeys: stateObj.policyrecord.insureRowKeys,
        selectedRows: stateObj.policyrecord.selectedRows,
        isShowInsureModal:stateObj.policyrecord.isShowInsureModal,
    };
};

const mapDispatchToProps = dispatch => ({
    showLoading: val => {
        dispatch(actionCreators.showLoading(val));
    },
    insureSelected: str => {
        dispatch(actionCreators.insureSelected(str));
    },
    showPageLoading: val => {
        dispatch(actionCreators.showPageLoading(val));
    },
    showInsureModal: (flag) => {
        dispatch(actionCreators.showInsureModal(flag));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Insure);
