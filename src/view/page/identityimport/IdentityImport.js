import React,{PureComponent} from 'react';
import {connect} from 'react-redux';

class IdentityImport extends PureComponent{

    render(){

        return (
            <div>身份导入</div>
        );
    }

}


const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});


export default connect(mapStateToProps, mapDispatchToProps)(IdentityImport);
