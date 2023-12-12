import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, CloseButton, EditForm, HeaderCell, Modal, ModalContent, StyledTable, TableCell, TableHeader, TableRow} from '../../styles/styles';
import Nav from "../../components/Nav";

export default function Configuracoes() {
    const [data, setData] = useState([]);
    const [editdiaria, setEditDiaria] = useState(null);
    const [edithora, setEditHora] = useState(null);
    const [editmensal, setEditMensal] = useState(null);
    const [editlimpezaCompleta, setEditLimpezaCompleta] = useState(null);
    const [editlimpezaExterna, setEditLimpezaExterna] = useState(null);
    const [editlimpezaInterna, setEditLimpezaInterna] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);

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

    return (
        <div className="main">
            <Nav />
            <StyledTable>
                <TableHeader>
                        <HeaderCell>Diaria</HeaderCell>
                        <HeaderCell>Hora</HeaderCell>
                        <HeaderCell>Valor Mensal</HeaderCell>
                        <HeaderCell>Limpeza Completa</HeaderCell>
                        <HeaderCell>Limpeza Externa</HeaderCell>
                        <HeaderCell>Limpeza Interna</HeaderCell>
                        <HeaderCell>Ações</HeaderCell>
                </TableHeader>
                    {data.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.diaria === null ? '' : item.diaria + '$'}</TableCell>
                            <TableCell>{item.hora === null ? '' : item.hora + '$'}</TableCell>
                            <TableCell>{item.mensal === null ? '' : item.mensal + '$'}</TableCell>
                            <TableCell>{item.limpezaCompleta === null ? '' : item.limpezaCompleta + '$'}</TableCell>
                            <TableCell>{item.limpezaExterna === null ? '' : item.limpezaExterna + '$'}</TableCell>
                            <TableCell>{item.limpezaInterna === null ? '' : item.limpezaExterna + '$'}</TableCell>
                            <TableCell>
                                { (
                                    <Modal isOpen={isModalOpen}>
                                        <ModalContent style={{padding: '90px'}}>
                                            <h2>Editar</h2>
                                            <EditForm style={{display: 'table-caption'}}
                                                onSubmit={(e) => {
                                                   e.preventDefault();
                                                   if (e.nativeEvent.submitter.name === 'submitBtn') {
                                                      handleEdit(e.id, e.diaria,e.hora,e.mensal,e.limpezaCompleta,e.limpezaExterna,e.limpezaInterna);
                                                   } else {
                                                      setModalOpen(false);
                                                   }
                                                }}
                                            >
                                                <label>Diaria</label>
                                                <input
                                                    type="text"
                                                    name="diaria"
                                                    placeholder={item.diaria}
                                                    value={editdiaria}
                                                    autocomplete="off"
                                                    onChange={(e) => setEditDiaria(e.target.value)} />
                                                <label>Valor Por hora</label>
                                                <input
                                                    type="text"
                                                    name="hora"
                                                    required
                                                    placeholder={item.hora}
                                                    value={edithora}
                                                    autocomplete="off"
                                                    onChange={(e) => setEditHora(e.target.value)} />
                                                <label>Valor mensal</label>
                                                <input
                                                    type="text"
                                                    name="mensal"
                                                    placeholder={item.mensal}
                                                    value={editmensal}
                                                    autocomplete="off"
                                                    onChange={(e) => setEditMensal(e.target.value)} />
                                                <label>Limpeza completa</label>
                                                <input
                                                    type="text"
                                                    name="limpezaCompleta"
                                                    placeholder={item.limpezaCompleta}
                                                    value={editlimpezaCompleta}
                                                    autocomplete="off"
                                                    onChange={(e) => setEditLimpezaCompleta(e.target.value)} />
                                                <label>Limpeza externa</label>
                                                <input
                                                    type="text"
                                                    name="limpezaExterna"
                                                    placeholder={item.limpezaExterna}
                                                    value={editlimpezaExterna}
                                                    autocomplete="off"
                                                    onChange={(e) => setEditLimpezaExterna(e.target.value)} />
                                                <label>Limpeza interna</label>
                                                <input
                                                    type="text"
                                                    name="limpezaInterna"
                                                    placeholder={item.limpezaInterna}
                                                    value={editlimpezaInterna}
                                                    autocomplete="off"
                                                    onChange={(e) => setEditLimpezaInterna(e.target.value)} />
                                                <button type="submit" onClick={() => handleEdit(item.id, editdiaria,edithora,editmensal,editlimpezaCompleta,editlimpezaExterna,editlimpezaInterna)}>Alterar</button>
                                                <CloseButton onClick={() => setModalOpen(false)}>Fechar</CloseButton>
                                            </EditForm>
                                        </ModalContent>
                                    </Modal>
                                )}
                                <Button
                                    type='submit'
                                    onClick={() => setModalOpen(true)}
                                >
                                    Configurar
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
            </StyledTable>
        </div>
    );
}