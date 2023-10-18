import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Login, FormCard, InputForm, Button, StyledNavLink, LabelText, ContainerLink } from '../../styles/styles';
import api from '../../services/api';

export default function LoginForm() {
    const redirectNavigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    //usado para atualizar o estado a medida que os usuários digitam nos campos
    const handleInputChange = event => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            api.get('/Contas')
                .then(response => {
                    const user = response.data.find(item =>
                        item.nome === formData.username && item.senha === formData.password);
                    if (user) {
                        redirectNavigate("/nav");
                    } else {
                        alert("Informe Usuário ou senha validos");
                    }
                })
                .catch(error => {
                    alert(`erro ao acessar dados. nome do erro: ${error}`);
                });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Login>
            <FormCard>
                <LabelText>BaseCar</LabelText>
                <form onSubmit={handleSubmit}>
                    <InputForm
                        type="text"
                        name="username"
                        placeholder='Login'
                        autoComplete='none'
                        value={formData.username}
                        onChange={handleInputChange}
                    />
                    <InputForm
                        type="password"
                        name="password"
                        placeholder='password'
                        value={formData.password}
                        onChange={handleInputChange}
                    />

                    <Button type='submit' backgroundColor="#FFC312" color='black'>
                        Entrar
                    </Button>
                    <ContainerLink>
                        <StyledNavLink to={"/novoUsuario"}>Novo Usuario</StyledNavLink>
                        <StyledNavLink to={"/"}>Esqueceu a senha?</StyledNavLink>
                    </ContainerLink>
                </form>
            </FormCard>
        </Login>
    );
}