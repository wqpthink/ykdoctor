import styled from 'styled-components';

export const HomeWrapper = styled('div')`
    background-color: red;
    height: 50px;
    width: 50px;
`;

export const PropsBox = styled.div(props => ({
    background: props.background,
    height: '50px',
    width: '50px'
}));
