import React, {PureComponent, Fragment} from "react";
import Header from '_common/header/Header';
import SideNav from '_common/sidenav/SideNav';
import {HeaderAndSideContentWrapper, HeaderAndSideContentChildLeftWrapper, HeaderAndSideContentChildRightWrapper} from './layout-style';

/**
 * 附头部、侧边导航布局组件,头部默认高度50px,内容部分左15%,右85%
 */
export default class AttachHeadAndSideLayout extends PureComponent{
    render (){
        return (
            <Fragment>
                <Header/>
                <HeaderAndSideContentWrapper>
                    <HeaderAndSideContentChildLeftWrapper><SideNav/></HeaderAndSideContentChildLeftWrapper>
                    <HeaderAndSideContentChildRightWrapper>{this.props.children}</HeaderAndSideContentChildRightWrapper>
                </HeaderAndSideContentWrapper>
            </Fragment>
        );
    }
}
