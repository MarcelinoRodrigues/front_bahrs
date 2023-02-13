import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, ModalContent, ModalWrapper, Table, TBody, TD, TDFlex, TH, THCenter, THead, TR } from '../../styles/styles';
import Nav from "../../components/Nav";

export default function Funcionario() {
    const [data, setData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [nome, setNome] = useState('');
    const [nomeFuncionario, setNomeFuncionario] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios('https://localhost:5001/api/Funcionarios');
            setData(result.data);
        };
        fetchData();
    }, []);

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://localhost:5001/api/Funcionarios', { nome });
            toggleModal();

            const result = await axios('https://localhost:5001/api/Funcionarios');
            setData(result.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleRemoveSubmit = async (id) => {
        try {
            await axios.delete(`https://localhost:5001/api/Funcionarios/${id}`);
            const result = await axios('https://localhost:5001/api/Funcionarios');
            setData(result.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = async (id, nome) => {
        try {
            await axios.put(`https://localhost:5001/api/Funcionarios/${id}`, {
                id: id,
                Nome: nome,
            });
            
            const result = await axios('https://localhost:5001/api/Funcionarios');
            setData(result.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="main">
            <Nav />
            <Button
                type='submit'
                backgroundColor="#90EE90"
                onClick={toggleModal}
            >
                Adicionar +
            </Button>
            {modalOpen && (
                <ModalWrapper>
                    <ModalContent>
                        <h2>Novo Registro</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="nome"
                                placeholder='Nome'
                                value={nome}
                                autocomplete="off"
                                onChange={(e) => setNome(e.target.value)} />
                            <button type="submit">Incluir</button>
                            <button type="button" onClick={toggleModal}>
                                Fechar
                            </button>
                        </form>
                    </ModalContent>
                </ModalWrapper>
            )}
            <Table>
                <THead>
                    <tr>
                        <TH>Nome</TH>
                        <THCenter>Ações</THCenter>
                    </tr>
                </THead>
                <TBody>
                    {data.map((item) => (
                        <TR key={item.id}>
                            <TD>{item.nome}</TD>
                            <TDFlex>
                                {showModal && (
                                    <ModalWrapper>
                                        <ModalContent>
                                            <h2>Editar</h2>
                                            <form>
                                                <input
                                                    type="text"
                                                    name="nomeFuncionario"
                                                    placeholder='Nome'
                                                    value={nomeFuncionario}
                                                    autocomplete="off"
                                                    onChange={(e) => setNomeFuncionario(e.target.value)} />
                                                <button type="submit" onClick={() => handleEdit(item.id, nomeFuncionario)}>Alterar</button>
                                                <button type="button" onClick={() => setShowModal(false)}>Fechar</button>
                                            </form>
                                        </ModalContent>
                                    </ModalWrapper>
                                )}
                                <Button
                                    type='submit'
                                    backgroundColor="#90EE90"
                                    onClick={() => setShowModal(true)}
                                >
                                    Editar
                                </Button>
                                <Button
                                    type='submit'
                                    backgroundColor="#FF6347"
                                    onClick={() => handleRemoveSubmit(item.id)}
                                >
                                    Excluir
                                </Button>
                            </TDFlex>
                        </TR>
                    ))}
                </TBody>
            </Table>
        </div>
    );
}