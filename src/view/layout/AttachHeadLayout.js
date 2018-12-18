import React,{PureComponent, Fragment} from 'react';
import Header from '_common/header/Header';

/**
 * 附头部布局组件,头部默认高度50px
 */
export default class AttachHeadLayout extends PureComponent{
    render(){
        return (
            <Fragment>
                <Header/>
                {this.props.children}
            </Fragment>
        );
    }
}
