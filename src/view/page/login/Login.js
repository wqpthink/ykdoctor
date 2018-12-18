import React, {PureComponent, Fragment} from 'react';
import {connect} from 'react-redux';
import {actionCreators} from './store/interface';
import {
    LoginHeaderWrapper, LoginContentWrapper, LoginContentLeft, LoginContentRight, LoginInput, LoginButton
} from './login-style';
const {Input} = require('react-app-engine');


class Login extends PureComponent{



    render(){
        const {loginIn} = this.props;
        return (
            <Fragment>
                <LoginHeaderWrapper>
                    <div className={"header-edge"}></div>
                </LoginHeaderWrapper>
                <LoginContentWrapper>
                    <LoginContentLeft></LoginContentLeft>
                    <LoginContentRight>
                        <span className="title">用户登录</span>
                        <div>
                            <span>用户名:</span><LoginInput maxLength="20" ref={input=>this.username=input} defaultValue="admin001"/>
                        </div>
                        <div>
                            <span>&ensp;&ensp;密码:</span><LoginInput type="password" maxLength="12" ref={input=>this.password=input} defaultValue="123456"/>
                        </div>
                        <LoginButton onClick={()=>loginIn(this.username, this.password)}>登录</LoginButton>
                    </LoginContentRight>
                </LoginContentWrapper>
            </Fragment>
        );
    }
}


const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
    loginIn(userameElement,passwordElement){
        dispatch(actionCreators.loginIn(userameElement.value, passwordElement.value));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
