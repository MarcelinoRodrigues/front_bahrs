// styles.js
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

//Login
export const Button = styled.button`
  background-color: #007C7F; 
  color: #fff;
  padding: 12px 50px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: ${props => props.marginLeft}; 
  :hover {
    color: ${props => props.hovercolor}; 
  }
`;

export const LabelText = styled.h1`
    color: #fff;
`;

export const ContainerLink = styled.div`
    display:grid;
`;

export const Login = styled.div`
    background-image: url('../images/fundobase.jpg');
    background-repeat: no-repeat;
    background-size: 100%;
    bottom: 0;
    color: black;
    left: 0;
    overflow: auto;
    padding: 3em;
    position: absolute;
    right: 0;
    text-align: center;
    top: 0;
    background-size: cover;
`;

//Nav
export const FormCard = styled.div`
    margin: auto;
    width: 400px;
    background-color: rgba(0,0,0,0.5) !important;
    padding: 25px 50px 24px 50px;
`;

export const InputForm = styled.input`
    text-align: center;
    width: 95%;
    margin: 0 0 01em 0;
    padding: 9px;
    border-radius: 25px;
`;

export const StyledNavLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  margin: 0.6em;
  &:hover {
    text-decoration: underline;
    color: #000
  }
`;

export const ButtonNav = styled(NavLink)`
background-color: ${props => props.backgroundColor}; 
  color: ${props => props.color};
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
  text-decoration: none;
  display: block;
  text-align: center;
  width: 10%;
  :hover {
    background-color: ${props => props.backgroundColor}; 
  }
`;

// Criando o estilo da NavBar
export const StyledNavBar = styled.nav`
  display: flex;
  align-items: center;
  background-color: #333;
  color: #fff;
  padding: 1rem;
`;

// Criando o estilo do dropdown
export const Dropdown = styled.div`
  position: relative;
  display: inline-block;
  &:hover {
    .dropdown-content {
      display: block;
    }
  }
`;

// Criando o estilo do conteúdo do dropdown
export const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
`;

// Criando o estilo do link dentro do dropdown
export const DropdownLink = styled(NavLink)`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  margin: 1em;
  &:hover {
    background-color: #f1f1f1;
  }
`;

//Historico grid
export const Table = styled.table`
  width: 100%;
  background: aliceblue;
`;

export const THead = styled.thead`
  background-color: #483D8B;
  color: white;
`;

export const TH = styled.th`
`;

export const THCenter = styled.th`
  font-weight: bold;
  color: #fff;
  padding: 8px;
  text-align: left;
  text-align: center;
  width: 25%;
`;

export const TBody = styled.tbody`
`;

export const TR = styled.tr`
    height: 40px;
`;

export const TD = styled.td`
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  text-align: center;
`;

export const TDFlex = styled.td`
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    display:flex;
    justify-content: center;
`;

export const TDConditional = styled.td`
  padding: 8px;
  text-align: center;
  background-color: ${props => (props.status === 0 ? '#90EE90' : '#FF6347')};
  width: 100px;
  border-radius: 7px;
  color: #000;
`;

//Modal
export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

export const H5 = styled.h5`
  display: contents;
`;

export const Input = styled.input`
   width:92%;
    &::placeholder {
        color: #000;
    }
`;

export const ManagerTable = styled.div`
    height: 440px;
    overflow-x: hidden;
`;

export const H2 = styled.h2`
{
    margin-bottom: 13px!important;
}
`;

export const StyledTable = styled.div`
  width: 100%;
  margin: 20px 0;
  height: 440px;
  overflow-x: hidden;
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
  background-color: #90EE90;
  color: #000;
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
  background-color: #FF6347;
  color: #000;
  border: none;
  padding: 8px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
`;

export const ExitButton = styled.button`
  background-color: #007C7F;
  color: #000;
  border: none;
  padding: 8px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
  margin-right: 12px;
`;

export const NotaButton = styled.button`
  background-color: #5bc0de;
  color: #000;
  border: none;
  padding: 8px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
  margin-right: 12px;
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