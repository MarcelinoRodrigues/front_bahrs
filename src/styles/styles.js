// styles.js
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

//Login
export const Button = styled.button`
  background-color: ${props => props.backgroundColor}; 
  color: ${props => props.color};
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  margin-bottom: 10px;
  :hover {
    background-color: ${props => props.backgroundColor}; 
  }
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
    width: 300px;
    background-color: rgba(0,0,0,0.5) !important;
    padding: 50px;
`;

export const InputForm = styled.input`
    text-align: center;
    width: 95%;
    margin: 0 0 01em 0;
    padding: 5px;
    border-radius: 25px;
`;

export const StyledNavLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  margin: 1em;
  &:hover {
    text-decoration: underline;
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
  border-collapse: collapse;
`;

export const THead = styled.thead`
  background-color: #483D8B;
  color: white;
`;

export const TH = styled.th`
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

export const THCenter = styled.th`
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  text-align: center;
`;

export const TBody = styled.tbody`
`;

export const TR = styled.tr`

`;

export const TD = styled.td`
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

export const TDFlex = styled.td`
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    display:flex;
`;

export const TDConditional = styled.td`
  padding: 8px;
  text-align: center;
  border-bottom: 1px solid #ddd;
  background-color: ${props => (props.status === 0 ? 'green' : 'red')};
  width: 100px;
  color: white;
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

export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  width: 100%;
  h2 {
    margin-bottom: 20px;
    text-align: center;
  }
  form {
    display: flex;
    flex-direction: column;
    input[type="text"]{
        text-align:center;
        padding:12px 20px;
        margin-bottom: 5px;
    }
    button[type="submit"] {
      background-color: green; 
      color: white;
      padding: 12px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 20px;
      :hover {
        background-color: #90EE90;
      }
    }
    button[type="button"] {
      background-color: red;
      color: white;
      padding: 12px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 10px;
      :hover {
        background-color: #FF6347;
      }
    }
  }
`;

export const H5 = styled.h5`
  display: contents;
`;