import React, { useState } from 'react';
import { StyledNavLink, Dropdown, DropdownContent, DropdownLink, StyledNavBar } from "../styles/styles";

export default function Nav() {
    // Gerenciando o estado do dropdown
    const [isOpen, setIsOpen] = useState(false);

    return (
        <StyledNavBar>
            <Dropdown>
                <StyledNavLink to="/dashboard" onClick={() => setIsOpen(!isOpen)}>Dashboard</StyledNavLink>
            </Dropdown>
            <Dropdown>
                <StyledNavLink to="/estacionamento" onClick={() => setIsOpen(!isOpen)}>Estacionamento</StyledNavLink>
                <DropdownContent className={isOpen ? "dropdown-content" : "dropdown-content hidden"}>
                    <DropdownLink to="/funcionario">Funcionário</DropdownLink>
                    <DropdownLink to="/vagas">Vagas</DropdownLink>
                </DropdownContent>
            </Dropdown>
            <Dropdown>
                <StyledNavLink to="/configuracoes" onClick={() => setIsOpen(!isOpen)}>Configurações</StyledNavLink>
                <DropdownContent className={isOpen ? "dropdown-content" : "dropdown-content hidden"}>
                    <DropdownLink to="/senha">Alterar Senha</DropdownLink>
                </DropdownContent>
            </Dropdown>
            <Dropdown>
                <StyledNavLink to="/mensalista" onClick={() => setIsOpen(!isOpen)}>Mensalistas</StyledNavLink>
            </Dropdown>
            <Dropdown>
                <StyledNavLink to="/historico" onClick={() => setIsOpen(!isOpen)}>Historico</StyledNavLink>
            </Dropdown>
            <Dropdown>
                <StyledNavLink to="/" onClick={() => setIsOpen(!isOpen)}>Sair</StyledNavLink>
            </Dropdown>
        </StyledNavBar>
    );

}