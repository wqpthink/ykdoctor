import React,{PureComponent,Fragment} from 'react';
import {connect} from 'react-redux';
import {
    HomeWrapper,
    PropsBox
} from './home-style';

/**
 * 主页组件
 */
class Home extends PureComponent{

    render(){
        return (
            <Fragment>
                <PropsBox background = "red">
                    <div>主页</div>
                </PropsBox>
            </Fragment>
        );
    }
}


const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
