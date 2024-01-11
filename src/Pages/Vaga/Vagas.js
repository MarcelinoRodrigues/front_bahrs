import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, ButtonSearch, CloseButton, DeleteButton, DisableButton, DropdownSearch, EditButton, EditForm, FilterContainer, HeaderCell, InputSearch, Modal, ModalContent, StyledTable, TableCell, TableHeader, TableRow, TDConditional } from '../../styles/styles';
import Nav from "../../components/Nav";
import Alert from '../../components/Alert';

export default function Vaga() {
   const [data, setData] = useState([]);
   const [nome, setNome] = useState('');
   const [nomeVaga, setNomeVaga] = useState('');
   const [vagaOcupada, setVagaOcupada] = useState(false);
   const [exclude, setExclude] = useState(false);
   const [success, setSuccess] = useState(false);
   const [editingItemId, setEditingItemId] = useState(null);
   const [edit, setEdit] = useState(false);
   const [catchName, setCatchName] = useState(false);
   const [isAddModalOpen, setAddModalOpen] = useState(false);
   const [isModalOpen, setModalOpen] = useState(false);
   const [selectedOption, setSelectedOption] = useState('');

   useEffect(() => {
      const fetchData = async () => {
         const result = await axios('https://localhost:44311/api/Vagas');
         setData(result.data);
      };

      vagaOcupada && setTimeout(handleCloseAlert, 1100);
      exclude && setTimeout(handleCloseExclude, 1100);
      edit && setTimeout(handleCloseEdit, 1100);
      success && setTimeout(handleCloseSuccess, 1100);
      catchName && setTimeout(handleCloseCatchName, 1100);

      fetchData();
   }, [vagaOcupada, exclude, success, edit, catchName]);

   const MyEnum = { 0: 'Ativo', 1: 'Ocupado' };

   const handleCloseExclude = () => setExclude(false);
   const handleCloseAlert = () => setVagaOcupada(false);
   const handleCloseSuccess = () => setSuccess(false);
   const handleCloseEdit = () => setEdit(false);
   const handleCloseCatchName = () => setCatchName(false);

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         if (data.some(item => item.nome === nome)) {
            setCatchName(true);
         }
         await axios.post('https://localhost:44311/api/Vagas', { nome });
         setAddModalOpen(false);

         const result = await axios('https://localhost:44311/api/Vagas');
         setData(result.data);
         setSuccess(true);
      } catch (error) {
         console.error(error);
      }
   };

   const handleRemove = async (id) => {
      try {
         const result = await axios('https://localhost:44311/api/Vagas');

         const vagaOcupada = result.data.find(e => e.id === id && e.status === 1);

         vagaOcupada
            ? setVagaOcupada(true)
            : await axios.delete(`https://localhost:44311/api/Vagas/${id}`);

         const reload = await axios('https://localhost:44311/api/Vagas');
         setData(reload.data);
         setExclude(true);
      } catch (error) {
         console.error(error);
      }
   };

   const handleEdit = async (id, nome, status) => {
      try {
         if (data.some(item => item.nome === nome)) {
            setCatchName(true);
         } else {
            await axios.put(`https://localhost:44311/api/Vagas/${id}`, {
               id: id,
               nome: nome,
               status: status
            });
         }

         const result = await axios('https://localhost:44311/api/Vagas');
         setData(result.data);
         setEdit(true);
      } catch (error) {
         console.error(error);
      }
   };

   const HandleSearch = async () => {
      const url = `https://localhost:44311/api/Vagas/Search`;

      try {
         const response = await axios.get(url, {
            params: {
               status: selectedOption
            }
         });
         setData(response.data);
      } catch (error) {
         console.error(error);
      }
   }

   const openModalWithItem = (itemId) => {
      setEditingItemId(itemId);
      setNomeVaga(data.find(item => item.id === itemId).nome);
      setModalOpen(true);
   };

   return (
      <div className="main">
         <Nav />
         <FilterContainer>
            <DropdownSearch value={selectedOption} onChange={(event) => setSelectedOption(event.target.value)}>
               {Object.values(MyEnum).map((option) => (
                  <option key={option} value={option}>
                     {option}
                  </option>
               ))}
            </DropdownSearch>
            <ButtonSearch onClick={HandleSearch}>Pesquisar</ButtonSearch>
         </FilterContainer>
         <Button type="default" style={{ marginTop: '2px' }} onClick={() => { setNome(''); setAddModalOpen(true); }}>Novo Registro</Button>
         {(
            <Modal isOpen={isAddModalOpen}>
               <ModalContent>
                  <h2>Novo Registro</h2>
                  <EditForm
                     onSubmit={(e) => {
                        e.preventDefault();
                        if (e.nativeEvent.submitter.name === 'submitBtn') {
                           handleSubmit(e);
                        } else {
                           setAddModalOpen(false);
                           setNome('');
                        }
                     }}>
                     <input
                        type="text"
                        name="nome"
                        placeholder='Nome'
                        value={nome}
                        autocomplete="off"
                        onChange={(e) => setNome(e.target.value)} />
                     <button type="submit" name="submitBtn">Adicionar</button>
                     <CloseButton onClick={() => setAddModalOpen(false)}>Fechar</CloseButton>
                  </EditForm>
               </ModalContent>
            </Modal>
         )}
         <StyledTable>
            <TableHeader>
               <HeaderCell>Nome</HeaderCell>
               <HeaderCell>Status</HeaderCell>
               <HeaderCell>Ações</HeaderCell>
            </TableHeader>
            {data.map((item) => (
               <TableRow key={item.id}>
                  <TableCell>{item.nome}</TableCell>
                  <TDConditional status={item.status}>
                     {item.status === 0 ? 'Ativo' : 'Ocupado'}
                  </TDConditional>
                  <TableCell>
                     {(
                        <Modal isOpen={isModalOpen}>
                           <ModalContent>
                              <h2>Editar</h2>
                              <EditForm>
                                 <input
                                    type="text"
                                    name="nomeVaga"
                                    placeholder='Nome'
                                    value={nomeVaga}
                                    autocomplete="off"
                                    onChange={(e) => setNomeVaga(e.target.value)} />
                                 <button type="submit" onClick={() => handleEdit(editingItemId, nomeVaga, item.status)}>Alterar</button>
                                 <CloseButton onClick={() => setModalOpen(false)}>Fechar</CloseButton>
                              </EditForm>
                           </ModalContent>
                        </Modal>
                     )}
                     {
                        item.status === 0 ? <EditButton onClick={() => openModalWithItem(item.id)}> Editar </EditButton>
                           :
                           <DisableButton> Editar </DisableButton>
                     }
                     <DeleteButton
                        onClick={() => handleRemove(item.id)}> Excluir
                     </DeleteButton>
                  </TableCell>
               </TableRow>
            ))}
         </StyledTable>
         <div>
            {vagaOcupada && <Alert message="A vaga está ocupada" />}
         </div>
         <div>
            {exclude && <Alert message="Registro Excluiso com Sucesso!" />}
         </div>
         <div>
            {success && <Alert message="Registro Incluido com Sucesso!" />}
         </div>
         <div>
            {edit && <Alert message="Registro Editado com Sucesso!" />}
         </div>
         <div>
            {catchName && <Alert message="Esse nome já está cadastrado" />}
         </div>
      </div>
   );
}