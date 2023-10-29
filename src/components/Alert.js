import React from 'react';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 56px;
  z-index: 1000;
  border-radius: 7px;
  border: solid 1px red;
`;

const Message = styled.p`
  font-size: 16px;
  color: #333;
`;

const CloseButton = styled.button`
  background-color: #e74c3c;
  color: #fff;
  border: none;
  padding: 7px 13px;
  border-radius: 5px;
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 5px;
`;

const Alert = ({ message, showCloseButton, onClose }) => {
    return (
      <ModalWrapper>
        <Message>{message}</Message>
        {showCloseButton && <CloseButton onClick={onClose}>Fechar</CloseButton>}
      </ModalWrapper>
    );
};

export default Alert;