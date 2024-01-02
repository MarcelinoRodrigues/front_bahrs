import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, CloseButton, DeleteButton, EditButton, EditForm, ExitButton, HeaderCell, Input, Modal, ModalContent, NotaButton, StyledTable, TableCell, TableHeader, TableRow, TDFlex, THCenter } from '../../styles/styles';
import Nav from "../../components/Nav";
import { Limpeza } from '../../services/Traducoes';
import moment from 'moment';
import Alert from '../../components/Alert';
import { IMG, Label, Option, Select } from './styles';
import RequiredIcon from '../../Assets/iconspontodeexclamacao.png';
import CupomComponent from './CupomComponent';

export default function Estacionamento() {
   const [data, setData] = useState([]);
   const [mensalistas, setMensalistas] = useState([]);
   const [funcionarios, setFuncionarios] = useState([]);
   const [vagas, setVagas] = useState([]);
   const [verificaSaida, setVerificaSaida] = useState(false);
   const [catchSaida, setCatchSaida] = useState(false);
   const [exclude, setExclude] = useState(false);
   const [successSaida, setSuccessSaida] = useState(false);
   const [isModalOpen, setModalOpen] = useState(false);
   const [isAddModalOpen, setAddModalOpen] = useState(false);
   const [itemToEdit, setItemToEdit] = useState('');
   const [isCupomVisible, setCupomVisible] = useState(false);
   const [sendPlaca, setSendPlaca] = useState('');
   const [sendLimpeza, setSendLimpeza] = useState('');
   const [selectedVaga, setSelectedVaga] = useState('');
   const [selectedMensalista, setSelectedMensalista] = useState('');
   const [selectedFuncionario, setSelectedFuncionario] = useState('');
   const [dadosDaApi, setDadosDaApi] = useState(null);
   const [vaga, setVaga] = useState([]);
   const date = new Date();

   useEffect(() => {
      const fetchVagas = async () => {
         const response = await fetch('https://localhost:44311/api/Vagas/Status');
         const data = await response.json();
         setVaga(data);
      };

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

      exclude && setTimeout(handleCloseExclude, 1100);
      successSaida && setTimeout(closeSaida, 1100);
      verificaSaida && setTimeout(handleCloseSaida, 1800);
      catchSaida && setTimeout(handleCloseCatchSaida, 1800);

      fetchVagas();
      fetchData();
      fetchMensalistas();
      fetchFuncionario();
      fetchVaga();
   }, [verificaSaida, exclude, successSaida, catchSaida]);

   const handleCloseSaida = () => setVerificaSaida(false);
   const handleCloseExclude = () => setExclude(false);
   const closeSaida = () => setSuccessSaida(false);
   const handleCloseCatchSaida = () => setCatchSaida(false);

   const TratarDadosLimpeza = (recebeSendLimpeza) => {
      let resultado = 0;
      //TODO: qualquer alteração de enum Limpeza altera o valor do tratamento
      switch (recebeSendLimpeza) {
         case "Completa": resultado = 1; break;
         case "Interna": resultado = 2; break;
         case "Externa": resultado = 3; break;
         default: resultado = 0; break;
      }
      return resultado;
   }

   const options = Object.keys(Limpeza).map((key) => (
      <Option key={key} value={Limpeza[key]}>
         {Limpeza[key]}
      </Option>));

   const HandleSubmit = async (e) => {
      e.preventDefault();
      let setarLimpeza = TratarDadosLimpeza(sendLimpeza);
      try {
         const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}T${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
         await axios.post("https://localhost:44311/api/Estacionamento/", {
            Entrada: formattedDate,
            Vaga: null,
            vencimento: null,
            mensalista: null,
            mensalistaId: selectedMensalista !== "" ? selectedMensalista : null,
            Placa: sendPlaca,
            funcionario: null,
            valor: null,
            FuncionarioId: selectedFuncionario,
            VagaId: selectedVaga,
            Limpeza: setarLimpeza
         });

         const result = await axios('https://localhost:44311/api/Estacionamento');
         setData(result.data);
         setAddModalOpen(false);
      } catch (error) { }
   };

   const handleRemove = async (id) => {
      try {
         const result = await axios('https://localhost:44311/api/Estacionamento');
         const verificaSaida = result.data.find(e => e.id === id && e.vencimento === null);

         verificaSaida
            ? setVerificaSaida(true)
            : await axios.delete(`https://localhost:44311/api/Estacionamento/${id}`);

         const reload = await axios('https://localhost:44311/api/Estacionamento');
         setData(reload.data);
         setExclude(true);
      } catch (error) { }
   };

   const formatDate = (date) => {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
      return date.toLocaleString('en-US', options).replace(/(\d+)\/(\d+)\/(\d+), /, '$3-$1-$2 ');
   };

   return (
      <div className="main">
         <Nav />
         <Button type="default" onClick={() => { setAddModalOpen(true); }}>Novo Registro</Button>
         <StyledTable>
            <TableHeader>
               <HeaderCell>Entrada</HeaderCell>
               <HeaderCell>Saída</HeaderCell>
               <HeaderCell>Mensalista</HeaderCell>
               <HeaderCell>Placa</HeaderCell>
               <HeaderCell>Funcionario</HeaderCell>
               <HeaderCell>Valor</HeaderCell>
               <HeaderCell>Vaga</HeaderCell>
               <HeaderCell>Limpeza</HeaderCell>
               <THCenter>Ações</THCenter>
            </TableHeader>
            {data.map((item) => {
               const getMensalista = mensalistas.find(m => m.id === item.mensalistaId);
               const nomeMensalista = getMensalista ? getMensalista.nome : '';
               const getFuncionario = funcionarios.find(f => f.id === item.funcionarioId);
               const nomeFuncionario = getFuncionario ? getFuncionario.nome : '';
               const getVaga = vagas.find(v => v.id === item.vagaId);
               const nomeVaga = getVaga ? getVaga.nome : '';

               const ExecuteExit = async (id) => {
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
                     setSuccessSaida(true);
                  } catch (error) { }
               }

               const GerarNota = async (id) => {
                  try {
                     const objNota = await axios.get(`https://localhost:44311/api/Estacionamento/${id}`);

                     if(objNota.data.vencimento === null){
                        setCatchSaida(true)
                     }else{
                        setDadosDaApi(objNota.data); 
                        setCupomVisible(true); 
                        return objNota.data; 
                     }
                  } catch (error) { }
               }

               const ExecuteEdit = (item) => {
                  setModalOpen(true);
                  setItemToEdit({
                     id: item.id,
                     placa: item.placa,
                     vagaId: item.vagaId,
                     mensalistaId: item.mensalistaId,
                     limpeza: item.limpeza,
                     funcionarioId: item.funcionarioId,
                     entrada: item.entrada
                  });
               }

               const handleEdit = async (item) => {
                  try {
                     await axios.put(`https://localhost:44311/api/Estacionamento/`, {
                        id: item.id,
                        entrada: item.entrada,
                        vaga: null,
                        vencimento: null,
                        mensalista: null,
                        mensalistaId: item.mensalistaId,
                        placa: item.placa,
                        funcionario: item.funcionario,
                        valor: null,
                        funcionarioId: item.funcionarioId,
                        vagaId: item.vagaId,
                        limpeza: item.limpeza
                     });

                     const result = await axios('https://localhost:44311/api/Estacionamento');
                     setData(result.data);
                  } catch (error) { }
               };

               return (
                  <TableRow key={item.id}>
                     <TableCell>{moment(item.entrada).format('DD-MM-YYYY HH:mm')}</TableCell>
                     <TableCell>{item.vencimento === null ? '' : moment(item.vencimento).format('DD-MM-YYYY HH:mm')}</TableCell>
                     <TableCell>{nomeMensalista}</TableCell>
                     <TableCell>{item.placa}</TableCell>
                     <TableCell>{nomeFuncionario}</TableCell>
                     <TableCell>{item.valor === null ? '' : item.valor + '$'}</TableCell>
                     <TableCell>{nomeVaga}</TableCell>
                     <TableCell>{Limpeza[item.limpeza]}</TableCell>
                     <TDFlex>{/* Modal de Edição */}
                        {(<Modal isOpen={isModalOpen}>
                           <ModalContent>
                              <h2>Editar</h2>
                              <EditForm>
                                 <h2>Placa:</h2>
                                 <input
                                    type="text"
                                    autoComplete="off"
                                    value={itemToEdit.placa}
                                    onChange={(event) => setItemToEdit({ ...itemToEdit, placa: event.target.value })} />
                                 <Label><h2>Funcionario:</h2>
                                    <Select value={itemToEdit.funcionarioId} required
                                       onChange={(event) => setItemToEdit({ ...itemToEdit, funcionarioId: event.target.value })}>
                                       <Option value="">Selecione uma opção</Option>
                                       {funcionarios.map((funcionarios) => (<Option key={funcionarios.id} value={funcionarios.id}>{funcionarios.nome}</Option>))}
                                    </Select>
                                 </Label>
                                 <Label><h2>Limpeza:</h2>
                                    <Select value={Limpeza[itemToEdit.limpeza]}
                                       disabled={true}
                                       onChange={(event) => setItemToEdit({ ...itemToEdit, limpeza: event.target.value })}>
                                       {options}
                                    </Select>
                                 </Label>
                                 <button type="submit" onClick={() => handleEdit(item)}>Alterar</button>
                                 <CloseButton onClick={() => setModalOpen(false)}>Fechar</CloseButton>
                              </EditForm>
                           </ModalContent>
                        </Modal>)}
                        <NotaButton onClick={() => GerarNota(item.id)} >Gerar Nota</NotaButton>
                        <ExitButton onClick={() => ExecuteExit(item.id)}>Saída</ExitButton>
                        <EditButton onClick={() => ExecuteEdit(item)}>Editar </EditButton>
                        <DeleteButton onClick={() => handleRemove(item.id)}>Remover</DeleteButton>
                     </TDFlex>
                  </TableRow>);
            })}
         </StyledTable>{/* Modal de inclusão */}
         <Modal isOpen={isAddModalOpen}>
            <ModalContent>
               <h2>Novo Registro</h2>
               <EditForm
                  onSubmit={(e) => {
                     e.preventDefault();
                     if (e.nativeEvent.submitter.name === 'submitBtn') { HandleSubmit(e); }
                     else { setAddModalOpen(false); }
                  }}>
                  <Label>Entrada:
                     <input
                        type="text"
                        value={formatDate(date)}
                        disabled={true} />
                  </Label>
                  <Label>Mensalista:
                     <Select value={selectedMensalista} onChange={(event) => setSelectedMensalista(event.target.value)}>
                        <Option value="">Selecione uma opção</Option>
                        {mensalistas.map((mensalista) => (<Option key={mensalista.id} value={mensalista.id}> {mensalista.nome} </Option>))}
                     </Select>
                  </Label>
                  <Label><span>Placa:</span> <IMG src={RequiredIcon}></IMG>
                     <Input type="text"
                        value={sendPlaca}
                        onChange={(event) => setSendPlaca(event.target.value)}
                        required />
                  </Label>
                  <Label><span>Funcionario: </span><IMG src={RequiredIcon}></IMG>
                     <Select value={selectedFuncionario} onChange={(event) => setSelectedFuncionario(event.target.value)} required>
                        <Option value="">Selecione uma opção</Option>
                        {funcionarios.map((funcionarios) => (<Option key={funcionarios.id} value={funcionarios.id} onChange={(event) => setFuncionarios(event.target.value)}> {funcionarios.nome} </Option>))}
                     </Select>
                  </Label>
                  <Label><span>Vaga: </span><IMG src={RequiredIcon}></IMG>
                     <Select value={selectedVaga} onChange={(event) => setSelectedVaga(event.target.value)} required>
                        <Option value="">Selecione uma opção</Option>
                        {vaga.map((vagas) => (<Option key={vagas.id} value={vagas.id}> {vagas.nome} </Option>))}
                     </Select>
                  </Label>
                  <Label>Limpeza:
                     <Select value={sendLimpeza} onChange={(event) => setSendLimpeza(event.target.value)}> {options} </Select>
                  </Label>
                  <button type="submit" name="submitBtn">Adicionar</button>
                  <CloseButton onClick={() => setAddModalOpen(false)}>Fechar</CloseButton>
               </EditForm>
            </ModalContent>
         </Modal>
         <div>{verificaSaida && <Alert message="O estacionamento não pode ser removido sem marcar saída antes" />}</div>
         <div>{exclude && <Alert message="Registro Excluiso com Sucesso!" />}</div>
         <div>{successSaida && <Alert message="Saída Confirmada!" />}</div>
         <div>{catchSaida && <Alert message="Selecione a saída antes de gerar a Nota" />}</div>
         {isCupomVisible && <CupomComponent dadosDaApi={dadosDaApi} onClose={() => setCupomVisible(false)} />}
      </div>
   );
}