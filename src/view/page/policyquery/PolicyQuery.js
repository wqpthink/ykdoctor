import React,{PureComponent} from 'react';
import {connect} from 'react-redux';

class PolicyQuery extends PureComponent{

    render(){

        return (
            <div>保单查询</div>
        );
    }

}


const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});


export default connect(mapStateToProps, mapDispatchToProps)(PolicyQuery);
