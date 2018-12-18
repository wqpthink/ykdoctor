import styled from 'styled-components';
import logo from '_asset/images/banner_logo.jpg';

export const HeaderWrapper = styled.div`
    width: 100%;
    height: 7.8vh;
    background-image: url(${logo});
    background-size: contain;
    background-repeat: no-repeat;
    border-bottom: 1px solid #ccc;
    .header-edge{
        width: 100%;
        height: 10px;
        background: #2e9794;
    }
    .header-operate{
        text-align: right;
        vertical-align: bottom;
        height: 39px;
        line-height: 39px;
    }
`;

export const GuideText = styled.div`
    display: inline-block;
    padding: 0 10px;
    font-size: 15px;
    span{
        color: #389c9a;
    }
`;

export const ModifyPsw = styled.div`
    display: inline-block;
    padding: 0 10px;
    font-size: 15px;
    cursor: pointer;
    :hover{
        color: #389C9A;
    }
`;

export const LoginOut = styled.div`
    display: inline-block;
    padding: 0 10px;
    font-size: 15px;
    cursor: pointer;
    :hover{
        color: #389C9A;
    }
`;
