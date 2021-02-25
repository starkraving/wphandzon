import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export const Border = styled.div`
    position: absolute;
    background-color: green;
`;

export const MenuBar = styled.menu`
    position: absolute;
    padding: 0;
    margin: 0;
    top: -24px;
    left: 0;
`;

export const Button = styled.div`
    border: 0;
    display: inline-block;
    width: 16px;
    height: 16px;
    padding: 2px 4px 6px;
    text-align: center;
    background-color: green;
    cursor: ${props => props.$cursor || 'initial'};
`;

export const Icon = styled(FontAwesomeIcon)`
    color: white;
    display: inline-block;
    vertical-align: middle;
`;

export const Separator = styled.span`
    margin-left: 3px;
`;