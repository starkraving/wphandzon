import styled from "styled-components";

const Border = styled.div`
    position: absolute;
    background-color: green;
`;

export const TopBorder = styled(Border)`
    height: 1px;
    top: ${props => (Math.round(props.top) - 1) + 'px'};
    left: ${props => (Math.round(props.left) - 1) + 'px'};
    width: ${props => (Math.round(props.width) + 2) + 'px'};
`;

export const RightBorder = styled(Border)`
    height: ${props => (Math.round(props.height) + 2) + 'px'};
    top: ${props => (Math.round(props.top) - 1) + 'px'};
    left: ${props => (Math.round(props.left) + Math.round(props.width) + 1) + 'px'};
    width: 1px;
`;

export const BottomBorder = styled(Border)`
    height: 1px;
    top: ${props => (Math.round(props.top) + Math.round(props.height) + 1) + 'px'};
    left: ${props => (Math.round(props.left) - 1) + 'px'};
    width: ${props => (Math.round(props.width) + 2) + 'px'};
`;

export const LeftBorder = styled(Border)`
    height: ${props => (Math.round(props.height) + 2) + 'px'};
    top: ${props => (Math.round(props.top) - 1) + 'px'};
    left: ${props => (Math.round(props.left) - 1) + 'px'};
    width: 1px;
`;