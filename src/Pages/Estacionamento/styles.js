import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width:400px;
    margin: auto;
    background-color: rgba(0,0,0,0.5) !important;
    padding: 50px;
}
`;

export const Label = styled.label`
  margin-bottom: 0.5rem;
  width: 100%;
  .form-control{
    padding: 0.5em;
    width: 100%;
    text-align: center;
  }
`;

export const Input = styled.input`
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: none;
  border-radius: 4px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

export const ContainerButton = styled.div`
`;

export const Button = styled.button`
background-color: ${props => props.backgroundColor}; 
  color: ${props => props.color};
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
  :hover {
    background-color: ${props => props.backgroundColor}; 
  }
`;

export const ButtonNavLink = styled(NavLink)`
padding: 0.5rem 1rem;
background-color: ${props => props.backgroundColor}; 
color: ${props => props.color};
border: none;
border-radius: 4px;
box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
text-decoration: none;

&:hover {
  background-color: #0066bb;
  color: white;
}

&:active {
  background-color: #0055aa;
}
`;

export const Option = styled.option`
padding: 0.5rem;
`;

export const Select = styled.select`
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: none;
  border-radius: 4px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

export const IMG = styled.img`
    width: 25px;
    height: 25px;
    margin-bottom: -6px;
`;