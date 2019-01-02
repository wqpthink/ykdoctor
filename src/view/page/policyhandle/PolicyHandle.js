import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Tabs } from 'antd';
import { actionCreators } from "./store/interface";
import NormalInfo from './NormalInfo';
import CkAbnormal from './CkAbnormal';
import NoHandle from './NoHandle';


const TabPane = Tabs.TabPane;

class PolicyHandle extends PureComponent {
    callback = (key) => {
        this.props.initStore();
        let para = {};
        if (key == '1') {
            para={
                dataCheckType: key,
                itemTypeId: 1,
                pageSize: 10,
                pageNum: 1,               
            }
            this.props.showPageLoading(true);
            this.props.getInsureHandle(para);
        } else if (key == '01'||key == '02') {
            let para = {
                dataCheckType: key,
                pageSize: 10,
                pageNum: 1,               
            }
            this.props.showPageLoading(true);
            this.props.getInsureHandle(para); 
        } else if (key == '03') {           
            this.props.showPageLoading(true);
            this.props.getInsureHandle();
        }
        this.props.changeQueryCriteria(para);
    }
    componentDidMount() {
        let para = {
            dataCheckType: 1,
            itemTypeId: 1,
            pageSize: 10,
            pageNum: 1,               
        }
        this.props.showPageLoading(true);
        this.props.getInsureHandle(para);
        this.props.changeQueryCriteria(para);
    }
    render() {
        return (
            <Tabs onChange={this.callback} type="card">
                <TabPane tab="正常信息" key="1"><NormalInfo></NormalInfo></TabPane>
                <TabPane tab="异常信息-需处理" key="01"><CkAbnormal></CkAbnormal></TabPane>
                <TabPane tab="异常信息-无需处理" key="02"><NoHandle></NoHandle></TabPane>
                <TabPane tab="异常信息-再次投保" key="03">Content of Tab Pane 3</TabPane>
            </Tabs>
        );
    }

}


const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => ({
    showPageLoading: val => {
        dispatch(actionCreators.showPageLoading(val));
    },
    getInsureHandle: para => {
        dispatch(actionCreators.getInsureHandle(para));
    },
    changeQueryCriteria: para => {
        dispatch(actionCreators.changeQueryCriteria(para));
    },
    initStore: () => {
        dispatch(actionCreators.initStore());
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(PolicyHandle);
