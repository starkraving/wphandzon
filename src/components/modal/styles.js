import styled from "styled-components";

export const ModalWrapper = styled.div`
    display: ${props => props.isOpen ? 'block' : 'none'};
    position: fixed;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    z-index: 10000;
`;

export const ModalOverlay = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    background-color: rgba(0,0,0,0.4);
`;

export const ModalContainer = styled.dialog`
    position: absolute;
    display: block;
    left: 50%;
    top: 50px;
    margin: 0 -200px;
    width: 400px;
    background-color: #fff;
    border-radius: 5px;
    border: 0;
`;

export const ModalTitle = styled.h3`
    margin: 0;
    padding: 0;
    background-color: #fff;
    color: #333;
    font-weight: normal;
    position: relative;
    border-radius: 5px 5px 0 0;
    font-family: Helvetica, Arial, sans-serif;
    padding: 4px 0 4px 10px;

    button {
        position: absolute;
        display: block;
        right: -5px;
        top: -5px;
        border: 0;
        border-radius: 50%;
    }
`;

export const ModalContent = styled.div`
    padding: 5px 10px;
`;

export const ModalButtons = styled.div`
    padding: 0 10px 5px;
    text-align: right;

    button {
        border: 0;
        margin: 0;
        padding: 10px;
        border-radius: 5px;
        background-color: #eee;
        color: #333;
        border: 1px solid #333;

        &[type=button] {
            background-color: gray;
        }
    }
`;