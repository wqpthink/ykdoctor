import React,{PureComponent} from 'react';
import {connect} from 'react-redux';
import {Redirect, Link} from 'react-router-dom';
import {HeaderWrapper, GuideText, ModifyPsw, LoginOut} from './header-style';
import {actionCreators} from '_page/login/store/interface';
import {actionCreators as actionCreatorsSidenav} from '_common/sidenav/store/interface';


class Header extends PureComponent{

    render(){
        const {loginState,modifyPsw,loginOut} = this.props;

        if(loginState){
            return(
                <HeaderWrapper>
                    <div className="header-edge"/>
                    <div className="header-operate">
                        <GuideText>
                            <span>dxw</span>&nbsp;&nbsp;欢迎您
                        </GuideText>
                        <ModifyPsw onClick={modifyPsw}>修改密码</ModifyPsw>
                        <LoginOut onClick={loginOut}>退出</LoginOut>
                    </div>
                </HeaderWrapper>
            );
        }else{
            return <Redirect to={"/login"} />;
        }
    }
}

const mapStateToProps = (state) => ({
    loginState: state.getIn(['login', 'loginState'])
});

const mapDispatchToProps = (dispatch) => ({
    modifyPsw(){
        dispatch(actionCreators.modifyPsw());
    },
    loginOut(){
        dispatch(actionCreators.loginOut("dxw"));
        dispatch(actionCreatorsSidenav.clearMenuData());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
