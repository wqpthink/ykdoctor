import styled from 'styled-components';
import logo from '_asset/images/banner_logo.jpg';
import bg_logo from '_asset/images/bg_logo.png';

export const LoginHeaderWrapper = styled.div`
    width: 100%;
    height: 87px;
    background-image: url(${logo});
    background-repeat: no-repeat;
    background-size: contain;
    .header-edge{
        width: 100%;
        height: 10px;
        background: #2e9794;
    }
`;

export const LoginContentWrapper = styled.div`
    position: relative;
    width: 80%;
    height: 86vh;
    margin: 0 auto;
`;

export const LoginContentLeft = styled.div`
    display: inline-block;
    width: 48%;
    height: 63vh;
    vertical-align: top;
    position: relative;
    background-image: url(${bg_logo});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: right;
`;

export const LoginContentRight = styled.div`
    display: inline-block;
    width: 48%;
    height: 63vh;
    vertical-align: top;
    text-align: center;
    padding-top: 100px;
    .title{
        font-size: 20px;
        font-weight: 900;
        color: rgb(56, 156, 154);
        text-align:center;
        display: block;
        margin-bottom: 35px;
    }
    div{
        text-align: center;
        margin-top: 25px;
        margin-bottom: 25px;
        margin-left: -40px;
    }
`;

export const LoginInput = styled.input`
    width: 200px;
    height: 20px;
    outline: none;
    border-radius: 3px;
    border: 1px solid #CCCCCC;
    margin-left: 10px;
    padding-left: 2px;
    :hover{
        border-color: #3A9D9A;
    }
`;

export const LoginButton = styled.button`
    width: 90px;
    height: 30px;
    border: 1px solid #3A9D9A;
    background-color: #3A9D9A;
    color: #fff;
    border-radius: 3px;
    display: inline-block;
`;
