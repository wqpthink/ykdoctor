import React,{PureComponent, Fragment} from 'react';
import {connect} from 'react-redux';

class PaymentImport extends PureComponent{


    render(){

        return (
            <div>回款导入</div>
        );
    }

}


const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    
});

export default connect(mapStateToProps, mapDispatchToProps())(PaymentImport);
