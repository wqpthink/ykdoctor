import React,{PureComponent} from 'react';
import {connect} from 'react-redux';

class PolicyHandle extends PureComponent{

    render(){

        return (
            <div>保单处理</div>
        );
    }

}


const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});


export default connect(mapStateToProps, mapDispatchToProps)(PolicyHandle);
