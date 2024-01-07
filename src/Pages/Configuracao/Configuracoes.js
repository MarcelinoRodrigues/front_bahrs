import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  CloseButton,
  EditForm,
  HeaderCell,
  Modal,
  ModalContent,
  StyledTable,
  TableCell,
  TableHeader,
  TableRow
} from '../../styles/styles';
import Nav from '../../components/Nav';

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

  const handleEdit = async (
    id,
    diaria,
    hora,
    mensal,
    limpezaCompleta,
    limpezaExterna,
    limpezaInterna
  ) => {
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
      setModalOpen(false);
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
            <TableCell>{item.limpezaInterna === null ? '' : item.limpezaInterna + '$'}</TableCell>
            <TableCell>
              {isModalOpen && (
                <Modal isOpen={isModalOpen}>
                  <ModalContent>
                    <EditForm
                      style={{ display: 'table-caption' }}
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (e.nativeEvent.submitter.name === 'submitBtn') {
                          handleEdit(
                            item.id,
                            editdiaria,
                            edithora,
                            editmensal,
                            editlimpezaCompleta,
                            editlimpezaExterna,
                            editlimpezaInterna
                          );
                        } else {
                          setModalOpen(false);
                        }
                      }}
                    >
                      <label>Diaria</label>
                      <input
                        type="text"
                        name="diaria"
                        value={editdiaria !== null ? editdiaria : item.diaria}
                        autoComplete="off"
                        onChange={(e) => setEditDiaria(e.target.value)}
                      />
                      <label>Valor Por hora</label>
                      <input
                        type="text"
                        name="hora"
                        required
                        value={edithora !== null ? edithora : item.hora}
                        autoComplete="off"
                        onChange={(e) => setEditHora(e.target.value)}
                      />
                      <label>Valor mensal</label>
                      <input
                        type="text"
                        name="mensal"
                        value={editmensal !== null ? editmensal : item.mensal}
                        autoComplete="off"
                        onChange={(e) => setEditMensal(e.target.value)}
                      />
                      <label>Limpeza completa</label>
                      <input
                        type="text"
                        name="limpezaCompleta"
                        value={
                          editlimpezaCompleta !== null ? editlimpezaCompleta : item.limpezaCompleta
                        }
                        autoComplete="off"
                        onChange={(e) => setEditLimpezaCompleta(e.target.value)}
                      />
                      <label>Limpeza externa</label>
                      <input
                        type="text"
                        name="limpezaExterna"
                        value={
                          editlimpezaExterna !== null ? editlimpezaExterna : item.limpezaExterna
                        }
                        autoComplete="off"
                        onChange={(e) => setEditLimpezaExterna(e.target.value)}
                      />
                      <label>Limpeza interna</label>
                      <input
                        type="text"
                        name="limpezaInterna"
                        value={
                          editlimpezaInterna !== null ? editlimpezaInterna : item.limpezaInterna
                        }
                        autoComplete="off"
                        onChange={(e) => setEditLimpezaInterna(e.target.value)}
                      />
                      <button type="submit" name="submitBtn">
                        Alterar
                      </button>
                      <CloseButton onClick={() => setModalOpen(false)}>Fechar</CloseButton>
                    </EditForm>
                  </ModalContent>
                </Modal>
              )}
              <Button
                type="submit"
                onClick={() => {
                  setEditDiaria(item.diaria);
                  setEditHora(item.hora);
                  setEditMensal(item.mensal);
                  setEditLimpezaCompleta(item.limpezaCompleta);
                  setEditLimpezaExterna(item.limpezaExterna);
                  setEditLimpezaInterna(item.limpezaInterna);
                  setModalOpen(true);
                }}
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
