import React,{PureComponent} from 'react';
import {connect} from 'react-redux';

class PolicyRecord extends PureComponent{

    render(){

        return (
            <div>保单记录</div>
        );
    }

}


const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});


export default connect(mapStateToProps, mapDispatchToProps)(PolicyRecord);
