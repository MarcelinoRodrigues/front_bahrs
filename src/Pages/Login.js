import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Login, FormCard, InputForm, Button, StyledNavLink } from '../styles/styles';

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

    //lidar com o envio do formulário e imprimir os dados do formulário no console
    async function handleSubmit(event) {
        event.preventDefault();
        // Verificação de login com a API
        const instance = axios.create({
            baseURL: 'https://localhost:5001/api/',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
        });

        try {
            instance.get('/Contas')
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
                    <StyledNavLink to={"/"}>Esqueceu a senha?</StyledNavLink>               
                </form>
            </FormCard>
        </Login>
    );
}