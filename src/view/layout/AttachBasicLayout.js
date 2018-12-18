import React,{PureComponent, Fragment} from 'react';

/**
 * 基础布局组件
 */
export default class BasicLayout extends PureComponent{
    render(){
        return (
            <Fragment>
                {this.props.children}
            </Fragment>
        );
    }
}
