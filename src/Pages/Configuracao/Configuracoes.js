import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Input, ModalContent, ModalWrapper, Table, TBody, TD, TDFlex, TH, THCenter, THead, TR } from '../../styles/styles';
import Nav from "../../components/Nav";

export default function Configuracoes() {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editdiaria, setEditDiaria] = useState(null);
    const [edithora, setEditHora] = useState(null);
    const [editmensal, setEditMensal] = useState(null);
    const [editlimpezaCompleta, setEditLimpezaCompleta] = useState(null);
    const [editlimpezaExterna, setEditLimpezaExterna] = useState(null);
    const [editlimpezaInterna, setEditLimpezaInterna] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios('https://localhost:44311/api/Configuracoes');
            setData(result.data);
        };

        fetchData();
    }, []);

    const handleEdit = async (id, diaria, hora, mensal, limpezaCompleta, limpezaExterna, limpezaInterna) => {
        try {
            await axios.put(`https://localhost:44311/api/Configuracoes/${id}`, {
                id: id,
                diaria: diaria,
                hora: hora,
                mensal: mensal,
                limpezaCompleta: limpezaCompleta,
                limpezaExterna: limpezaExterna,
                limpezaInterna: limpezaInterna
            });

            const result = await axios('https://localhost:44311/api/Configuracoes');
            setData(result.data);
        } catch (error) {
            console.error(error);
        }
    };

    const ReloadClose = () => {
        setShowModal(false)
    }

    return (
        <div className="main">
            <Nav />
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
                                                <label>Diaria</label>
                                                <Input
                                                    type="text"
                                                    name="diaria"
                                                    placeholder={item.diaria}
                                                    value={editdiaria}
                                                    autocomplete="off"
                                                    onChange={(e) => setEditDiaria(e.target.value)} />
                                                <label>Valor Por hora</label>
                                                <Input
                                                    type="text"
                                                    name="hora"
                                                    required
                                                    placeholder={item.hora}
                                                    value={edithora}
                                                    autocomplete="off"
                                                    onChange={(e) => setEditHora(e.target.value)} />
                                                <label>Valor mensal</label>
                                                <Input
                                                    type="text"
                                                    name="mensal"
                                                    placeholder={item.mensal}
                                                    value={editmensal}
                                                    autocomplete="off"
                                                    onChange={(e) => setEditMensal(e.target.value)} />
                                                <label>Limpeza completa</label>
                                                <Input
                                                    type="text"
                                                    name="limpezaCompleta"
                                                    placeholder={item.limpezaCompleta}
                                                    value={editlimpezaCompleta}
                                                    autocomplete="off"
                                                    onChange={(e) => setEditLimpezaCompleta(e.target.value)} />
                                                <label>Limpeza externa</label>
                                                <Input
                                                    type="text"
                                                    name="limpezaExterna"
                                                    placeholder={item.limpezaExterna}
                                                    value={editlimpezaExterna}
                                                    autocomplete="off"
                                                    onChange={(e) => setEditLimpezaExterna(e.target.value)} />
                                                <label>Limpeza interna</label>
                                                <Input
                                                    type="text"
                                                    name="limpezaInterna"
                                                    placeholder={item.limpezaInterna}
                                                    value={editlimpezaInterna}
                                                    autocomplete="off"
                                                    onChange={(e) => setEditLimpezaInterna(e.target.value)} />
                                                <button type="submit" onClick={() => handleEdit(item.id, editdiaria,edithora,editmensal,editlimpezaCompleta,editlimpezaExterna,editlimpezaInterna)}>Alterar</button>
                                                <button type="button" onClick={() => ReloadClose()}>Fechar</button>
                                            </form>
                                        </ModalContent>
                                    </ModalWrapper>
                                )}
                                <Button
                                    type='submit'
                                    backgroundColor="#90EE90"
                                    onClick={() => setShowModal(true)}
                                >
                                    Configurar
                                </Button>
                            </TDFlex>
                        </TR>
                    ))}
                </TBody>
            </Table>
        </div>
    );
}