import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, ButtonNav, H5, ModalContent, ModalWrapper, Table, TBody, TD, TDFlex, TH, THCenter, THead, TR } from '../../styles/styles';
import Nav from "../../components/Nav";
import { Limpeza } from '../../services/Traducoes';
import moment from 'moment';

export default function Estacionamento() {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [mensalistas, setMensalistas] = useState([]);
    const [funcionarios, setFuncionarios] = useState([]);
    const [vagas, setVagas] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios('https://localhost:44311/api/Estacionamento');
            setData(result.data);
        };
        const fetchMensalistas = async () => {
            const result = await axios('https://localhost:44311/api/Mensalistas');
            setMensalistas(result.data);
        };
        const fetchFuncionario = async () => {
            const result = await axios('https://localhost:44311/api/Funcionarios');
            setFuncionarios(result.data);
        };
        const fetchVaga = async () => {
            const result = await axios('https://localhost:44311/api/Vagas');
            setVagas(result.data);
        };
        fetchData();
        fetchMensalistas();
        fetchFuncionario();
        fetchVaga();
    }, []);

    const handleRemove = async (id) => {
        try {
            await axios.delete(`https://localhost:44311/api/Estacionamento/${id}`);
            const result = await axios('https://localhost:44311/api/Estacionamento');
            setData(result.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = async (id, nome, status) => {
        try {
            await axios.put(`https://localhost:44311/api/Vagas/${id}`, {
                id: id,
                Nome: nome,
                Status: status
            });

            const result = await axios('https://localhost:44311/api/Vagas');
            setData(result.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="main">
            <Nav />
            <ButtonNav
                type='submit'
                backgroundColor="#90EE90"
                color='black'
                to="/novoestacionamento"
            >
                Adicionar +
            </ButtonNav>
            <Table>
                <THead>
                    <tr>
                        <TH>Entrada</TH>
                        <TH>Saída</TH>
                        <TH>Mensalista</TH>
                        <TH>Placa</TH>
                        <TH>Funcionario</TH>
                        <TH>Valor</TH>
                        <TH>Vaga</TH>
                        <TH>Limpeza</TH>
                        <THCenter>Ações</THCenter>
                    </tr>
                </THead>
                <TBody>
                    {data.map((item) => {
                        const getMensalista = mensalistas.find(m => m.id === item.mensalistaId);
                        const nomeMensalista = getMensalista ? getMensalista.nome : '';

                        const getFuncionario = funcionarios.find(f => f.id === item.funcionarioId);
                        const nomeFuncionario = getFuncionario ? getFuncionario.nome : '';

                        const getVaga = vagas.find(v => v.id === item.vagaId);
                        const nomeVaga = getVaga ? getVaga.nome : '';

                        const ExecuteExit = async (id) =>{
                            try {
                                await axios.put(`https://localhost:44311/api/Estacionamento/Saida`, {
                                    id: id,
                                    entrada: item.entrada, 
                                    vencimento: null,
                                    mensalistaId: item.mensalistaId,
                                    placa: item.placa,
                                    valor: null,
                                    funcionarioId: item.funcionarioId,
                                    vagaId: item.vagaId,
                                    limpeza: item.limpeza
                                });

                                const result = await axios('https://localhost:44311/api/Estacionamento');
                                setData(result.data);
                            } catch (error) {
                                console.error(error);
                            }
                        }
                        return (
                            <TR key={item.id}>
                                <TD>{moment(item.entrada).format('DD-MM-YYYY HH:mm')}</TD>
                                <TD>{item.vencimento === null ? '' : moment(item.vencimento).format('DD-MM-YYYY HH:mm')}</TD>
                                <TD>{nomeMensalista}</TD>
                                <TD>{item.placa}</TD>
                                <TD>{nomeFuncionario}</TD>
                                <TD>{item.valor === null ? '' : item.valor + '$'}</TD>
                                <TD>{nomeVaga}</TD>
                                <TD>{Limpeza[item.limpeza]}</TD>
                                <TDFlex>
                                    {showModal && (
                                        <ModalWrapper>
                                            <ModalContent>
                                                <h2>Editar</h2>
                                                <form>
                                                    <H5>
                                                        Entrada:
                                                    </H5>
                                                    <input
                                                        type="text"
                                                        name="Entrada"
                                                        autoComplete='off'
                                                        value={item.entrada}
                                                    />
                                                    <H5>
                                                        Saída:
                                                    </H5>
                                                    <input
                                                        type="text"
                                                        name="Entrada"
                                                        autoComplete='off'
                                                        value={item.vencimento}
                                                    />
                                                    <H5>
                                                        Valor:
                                                    </H5>
                                                    <input
                                                        type="text"
                                                        name="Entrada"
                                                        autoComplete='off'
                                                        value={item.valor}
                                                    />
                                                    <H5>
                                                        Mensalista:
                                                    </H5>
                                                    <input
                                                        type="text"
                                                        name="Entrada"
                                                        autoComplete='off'
                                                        value={nomeMensalista}
                                                    />
                                                    <H5>
                                                        Placa:
                                                    </H5>
                                                    <input
                                                        type="text"
                                                        name="Entrada"
                                                        autoComplete='off'
                                                        value={item.placa}
                                                    />
                                                    <H5>
                                                        Funcionario:
                                                    </H5>
                                                    <input
                                                        type="text"
                                                        name="Entrada"
                                                        autoComplete='off'
                                                        value={nomeFuncionario}
                                                    />
                                                    <H5>
                                                        Vagas:
                                                    </H5>
                                                    <input
                                                        type="text"
                                                        name="Entrada"
                                                        autoComplete='off'
                                                        value={nomeVaga}
                                                    />
                                                    <H5>
                                                        Limpeza:
                                                    </H5>
                                                    <input
                                                        type="text"
                                                        name="Entrada"
                                                        autoComplete='off'
                                                        value={Limpeza[item.limpeza]}
                                                    />
                                                    <button type="submit" onClick={() => handleEdit(item.id, nomeVaga, item.status)}>Alterar</button>
                                                    <button type="button" onClick={() => setShowModal(false)}>Fechar</button>
                                                </form>
                                            </ModalContent>
                                        </ModalWrapper>
                                    )}
                                    <Button
                                        type='submit'
                                        backgroundColor="#5bc0de"
                                        color='white'
                                    >
                                        Gerar Nota
                                    </Button>
                                    <Button
                                        type='submit'
                                        backgroundColor="#191970"
                                        color='white'
                                        onClick={() => ExecuteExit(item.id)}
                                    >
                                        Saída
                                    </Button>
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
                                        onClick={() => handleRemove(item.id)}
                                    >
                                        Excluir
                                    </Button>
                                </TDFlex>
                            </TR>
                        );
                    })}
                </TBody>
            </Table>
        </div>
    );
}
