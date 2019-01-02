import styled from "styled-components";

export const PageWrapper = styled("div")`
    height: 100%;
    padding: 10px;
    font-size: 12px;
    line-height: 18px;
    .mrgR10px {
        margin-right: 10px;
    }
    .mrg10px {
        margin-top: 10px;
    }
    .table {
        width: 100%;
        font-size: 12px;
    }
    .page {
        margin: 3vh 0;
        text-align: right;
    }
    .detail {
        width: 700px;
        margin-left: -295px;
        margin-top: -147px;
    }
    .c-red{
        color:red;
    }
`;

export const QureWrapper = styled("div")`
    padding: 5px;
    margin-bottom: 3vh;
    .detail {
        width: 700px;
        margin-left: -295px;
        margin-top: -147px;
    }
    h4 {
        font-size: 14.04px;
        line-height: 21.06px;
        font-family: inherit;
        font-weight: 700;
    }
    .search-form {
        margin-top: 10px;

        color:#fff;
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
`;

export const ModalWrapper = styled("div")`
    padding: 5px;
    margin-bottom: 3vh;
    h4 {
        font-size: 14.04px;
        line-height: 21.06px;
        font-family: inherit;
        font-weight: 700;
    }
`;
