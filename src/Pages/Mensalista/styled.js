// TableStyles.js
import styled from 'styled-components';

export const StyledTable = styled.div`
  width: 100%;
  margin: 20px 0;
`;

export const TableHeader = styled.div`
  display: flex;
  background-color: #007C7F; 
  padding: 10px;
`;

export const HeaderCell = styled.div`
  flex: 1;
  font-weight: bold;
  padding: 8px;
  text-align: center;
  color: #fff;
`;

export const TableRow = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
  padding: 10px;
  background-color: #fff;
`;

export const TableCell = styled.div`
  flex: 1;
  padding: 8px;
  text-align: center;
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
`;

export const EditButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin-right: 12px;
  cursor: pointer;
  border-radius: 4px;
`;

export const DeleteButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 8px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
`;

// Novos componentes adicionados
export const Modal = styled.div`
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

export const ModalContent = styled.div`
  background: #f1f1f1;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

export const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  label {
    margin-bottom: 10px;
  }
  input {
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  button {
    background-color: #4caf50;
    color: #fff;
    border: none;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s;
    &:hover {
      background-color: #45a049;
    }
  }
`;

export const CloseButton = styled.button`
  background-color: #e74c3c!important;
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  margin-top: 15px;
  border-radius: 5px;
  transition: background-color 0.3s;
  &:hover {
    background-color: #c0392b;
  }
`;