import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, ModalContent, ModalWrapper, Table, TBody, TD, TDFlex, TH, THCenter, THead, TR } from '../../styles/styles';
import Nav from "../../components/Nav";

export default function Configuracoes() {
    const [data, setData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [diaria, setDiaria] = useState('');
    const [hora, setHora] = useState('');
    const [mensal, setMensal] = useState('');
    const [limpezaCompleta, setLimpezaCompleta] = useState('');
    const [limpezaExterna, setLimpezaExterna] = useState('');
    const [limpezaInterna, setLimpezaInterna] = useState('');
    const [editdiaria, setEditDiaria] = useState(null);
    const [edithora, setEditHora] = useState(null);
    const [editmensal, setEditMensal] = useState(null);
    const [editlimpezaCompleta, setEditLimpezaCompleta] = useState(null);
    const [editlimpezaExterna, setEditLimpezaExterna] = useState(null);
    const [editlimpezaInterna, setEditLimpezaInterna] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios('https://localhost:5001/api/Configuracoes');
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
            await axios.post('https://localhost:5001/api/Configuracoes', { diaria });
            toggleModal();

            const result = await axios('https://localhost:5001/api/Configuracoes');
            setData(result.data);
        } catch (error) {
            alert('Erro no servidor, descrição do erro: ' + error);
        }
    };

    const handleEdit = async (id, diaria, hora, mensal, limpezaCompleta, limpezaExterna, limpezaInterna) => {
        try {
            await axios.put(`https://localhost:5001/api/Configuracoes/${id}`, {
                id: id,
                diaria: diaria,
                hora: hora,
                mensal: mensal,
                limpezaCompleta: limpezaCompleta,
                limpezaExterna: limpezaExterna,
                limpezaInterna: limpezaInterna
            });

            const result = await axios('https://localhost:5001/api/Configuracoes');
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
                                name="diaria"
                                placeholder='Diaria'
                                value={diaria}
                                autocomplete="off"
                                onChange={(e) => setDiaria(e.target.value)} />
                            <input
                                type="text"
                                name="hora"
                                placeholder='hora'
                                value={hora}
                                autocomplete="off"
                                onChange={(e) => setHora(e.target.value)} />
                            <input
                                type="text"
                                name="mensal"
                                placeholder='Mensal'
                                value={mensal}
                                autocomplete="off"
                                onChange={(e) => setMensal(e.target.value)} />
                            <input
                                type="text"
                                name="limpezaCompleta"
                                placeholder='Limpeza Completa'
                                value={limpezaCompleta}
                                autocomplete="off"
                                onChange={(e) => setLimpezaCompleta(e.target.value)} />
                            <input
                                type="text"
                                name="limpezaExterna"
                                placeholder='Limpeza Externa'
                                value={limpezaExterna}
                                autocomplete="off"
                                onChange={(e) => setLimpezaExterna(e.target.value)} />
                            <input
                                type="text"
                                name="limpezaInterna"
                                placeholder='Limpeza Interna'
                                value={limpezaInterna}
                                autocomplete="off"
                                onChange={(e) => setLimpezaInterna(e.target.value)} />
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
                        <TH>Diaria</TH>
                        <TH>Hora</TH>
                        <TH>Valor Mensal</TH>
                        <TH>Limpeza Completa</TH>
                        <TH>Limpeza Externa</TH>
                        <TH>Limpeza Interna</TH>
                        <THCenter>Ações</THCenter>
                    </tr>
                </THead>
                <TBody>
                    {data.map((item) => (
                        <TR key={item.id}>
                            <TD>{item.diaria === null ? '' : item.diaria + '$'}</TD>
                            <TD>{item.hora === null ? '' : item.hora + '$'}</TD>
                            <TD>{item.mensal === null ? '' : item.mensal + '$'}</TD>
                            <TD>{item.limpezaCompleta === null ? '' : item.limpezaCompleta + '$'}</TD>
                            <TD>{item.limpezaExterna === null ? '' : item.limpezaExterna + '$'}</TD>
                            <TD>{item.limpezaInterna === null ? '' : item.limpezaExterna + '$'}</TD>
                            <TDFlex>
                                {showModal && (
                                    <ModalWrapper>
                                        <ModalContent>
                                            <h2>Editar</h2>
                                            <form>
                                                <input
                                                    type="text"
                                                    name="diaria"
                                                    placeholder="diaria"
                                                    value={editdiaria}
                                                    autocomplete="off"
                                                    onChange={(e) => setEditDiaria(e.target.value)} />
                                                    <input
                                                    type="text"
                                                    name="hora"
                                                    required
                                                    placeholder='hora'
                                                    value={edithora}
                                                    autocomplete="off"
                                                    onChange={(e) => setEditHora(e.target.value)} />
                                                    <input
                                                    type="text"
                                                    name="mensal"
                                                    placeholder='mensal'
                                                    value={editmensal}
                                                    autocomplete="off"
                                                    onChange={(e) => setEditMensal(e.target.value)} />
                                                    <input
                                                    type="text"
                                                    name="limpezaCompleta"
                                                    placeholder='limpezaCompleta'
                                                    value={editlimpezaCompleta}
                                                    autocomplete="off"
                                                    onChange={(e) => setEditLimpezaCompleta(e.target.value)} />
                                                    <input
                                                    type="text"
                                                    name="limpezaExterna"
                                                    placeholder='limpezaExterna'
                                                    value={editlimpezaExterna}
                                                    autocomplete="off"
                                                    onChange={(e) => setEditLimpezaExterna(e.target.value)} />
                                                    <input
                                                    type="text"
                                                    name="limpezaInterna"
                                                    placeholder='limpezaInterna'
                                                    value={editlimpezaInterna}
                                                    autocomplete="off"
                                                    onChange={(e) => setEditLimpezaInterna(e.target.value)} />
                                                <button type="submit" onClick={() => handleEdit(item.id, editdiaria,edithora,editmensal,editlimpezaCompleta,editlimpezaExterna,editlimpezaInterna)}>Alterar</button>
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
                            </TDFlex>
                        </TR>
                    ))}
                </TBody>
            </Table>
        </div>
    );
}