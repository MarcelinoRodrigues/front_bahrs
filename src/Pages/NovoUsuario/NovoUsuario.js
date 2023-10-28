import axios from 'axios';
import { H2, ModalContent, ModalWrapper } from "../../styles/styles";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function NovoUsuario() {
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://localhost:44311/api/Contas', { 
                nome: nome, 
                senha: senha
            });

            alert("Usuario incluido com sucesso!");

            RevolvePath();

        } catch (error) {
            console.error(error);
        }
    };

    function RevolvePath(){
        return navigate('/');
    }

    return(
        <div className="main">
            <ModalWrapper>
                    <ModalContent>
                        <H2>Novo Usuário</H2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="nome"
                                placeholder='Nome'
                                value={nome}
                                autocomplete="off"
                                onChange={(e) => setNome(e.target.value)} />
                                <input
                                type="password"
                                name="senha"
                                placeholder='Senha'
                                value={senha}
                                autocomplete="off"
                                onChange={(e) => setSenha(e.target.value)} />
                            <button type="submit">Incluir</button>
                            <button type="button" onClick={(e) => RevolvePath()} >
                                Voltar
                            </button>
                        </form>
                    </ModalContent>
                </ModalWrapper>
        </div>
    )
}