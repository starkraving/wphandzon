import styled from "styled-components";

export const ContentModalButton = styled.button`
    display: block;
    width: 100%;
    border: 1px solid #333;
    border-radius: 5px;
    background: #fff;
    color: #333;
    padding: 10px;
    margin-top: 5px;

    &:first-child {
        margin-top: 0;
    }

    &:hover {
        background-color: #eee;
    }
`;