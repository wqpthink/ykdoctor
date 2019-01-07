import styled from "styled-components";

export const PageWrapper = styled("div")`
    height: 100%;
    padding: 10px;
    font-size: 12px;
    line-height: 18px;
    .mrg10px {
        margin-top: 10px;
    }
    .table {
        width: 100%;
        font-size: 12px;
    }
    .page {
        margin-top: 3vh;
        text-align: right;
    }
    .detail {
        width: 700px;
        margin-left: -295px;
        margin-top: -147px;
    }
    .c-red {
        color: red;
    }
`;

export const QureWrapper = styled("div")`
    padding: 5px;
    h4 {
        font-size: 14.04px;
        line-height: 21.06px;
        font-family: inherit;
        font-weight: 700;
    }
    .search-form {
        margin-top: 10px;
    }
    .item-label {
        color: #43aaab;
        font-size: 14px;
    }
    .ant-form-item {
        display: flex;
    }
    .ant-form-item-control-wrapper {
        flex: 1;
    }
    .upload-input{
        position: absolute;
        top: 0px;
        left: 0px;
        width: 5vw;
        opacity: 0;
    }
`;

export const ModalWrapper = styled("div")`
    width: 700px;
    margin-left: -295px;
    margin-top: -147px;
`;
