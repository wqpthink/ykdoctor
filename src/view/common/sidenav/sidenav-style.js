import styled from 'styled-components';

export const SideNavWrapper = styled.div`
    border-right: 1px solid #cccccc;
    height: 92vh;
    .sidenav-title{
        font-size: 16px;
        padding: 2px 5px 2px 0px;
        height: 25px;
        line-height: 25px;
        font-weight: 700;
        color: #000;
    }
    .sidenav-item{
        font-size: 14px;
        height: 25px;
        line-height: 25px;
        color: #1d2121;
        padding: 2px 5px 2px 15px;
        cursor: pointer;
        :hover{
            background-color: #F0F0F0;
        }
    }
    .active{
        background-color: #1A9C9E;
    }
    .sidenav-tag{
        display: inline-block;
        width: 5px;
        height: 25px;
        background-color: #1A9C9E;
    }
    .sidenav-title > div{
        display: inline-block;
        vertical-align: middle;
    }
`;
