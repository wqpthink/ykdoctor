import React, {Fragment, PureComponent} from 'react';
import {connect} from 'react-redux';
import {SideNavWrapper} from './sidenav-style';
import {actionCreators} from './store/interface';
import history from '_conf/history';



class SideNav extends PureComponent{

    render(){
        const {menuData, loadMenuData, menuClick} = this.props;
        const new_menuData = menuData.toJS();
        console.log(new_menuData);
        if(menuData.size === 0){
            loadMenuData();
            return null;
        }

        const temp_array = [];
        new_menuData.map(item => {
            const parentId = item.parentId;
            console.log(item);
            if (parentId === "0") {
                item["childrens"] = [];
                temp_array.push(item);
            }
        });
        new_menuData.map(item => {
            const parentId = item.parentId;
            if (parentId !== '0') {
                temp_array.map(itm => {
                    if (itm.id === parentId) {
                        itm.childrens.push(item);
                    }
                });
            }
        });

        return (
            <SideNavWrapper>
                {
                    temp_array.map((item,index) => (
                        <Fragment key={index}>
                            <div className={"sidenav-title"}><div className={"sidenav-tag"}></div><div>{item.name}</div></div>
                            {
                                item.childrens.map((itm,idx) => (
                                    <div key={idx} className={"sidenav-item"} onClick={() => menuClick(itm.id)}>{itm.name}</div>
                                ))
                            }
                        </Fragment>
                    ))
                }
            </SideNavWrapper>
        );
    }

}

const mapStateToProps = state => ({
    menuData: state.getIn(['sidenav', 'menuData'])
});

const mapDispatchToProps = dispatch => ({
    loadMenuData(){
        console.log("开始加载菜单了");
        dispatch(actionCreators.loadMeunData());
    },
    menuClick(menuId){
        console.log(menuId);
        if(menuId === '221083630876512256') history.push('/paymentimport');
        if(menuId === '192040527851180032') history.push('/policyquery');
        if(menuId === '192040424784547840') history.push('/policyrecord');
        if(menuId === '192038499984887808') history.push('/policyhandle');
        if(menuId === '188104493207670784') history.push('/identityimport');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);
