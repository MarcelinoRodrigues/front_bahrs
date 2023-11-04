import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, H2, ManagerTable, ModalContent, ModalWrapper, Table, TBody, TD, TDConditional, TDFlex, TH, THCenter, THead, TR } from '../../styles/styles';
import Nav from "../../components/Nav";
import Alert from '../../components/Alert';

export default function Vaga() {
   const [data, setData] = useState([]);
   const [modalOpen, setModalOpen] = useState(false);
   const [showModal, setShowModal] = useState(false);
   const [nome, setNome] = useState('');
   const [nomeVaga, setNomeVaga] = useState('');
   const [vagaOcupada, setVagaOcupada] = useState(false);
   const [exclude, setExclude] = useState(false);
   const [success, setSuccess] = useState(false);

   useEffect(() => {
      const fetchData = async () => {
         const result = await axios('https://localhost:44311/api/Vagas');
         setData(result.data);
      };
      if (vagaOcupada) {
         // Define um temporizador para fechar o Alert após 5 segundos (5000 milissegundos).
         const timeoutId = setTimeout(() => {
            handleCloseAlert();
         }, 1100);

         // Limpa o temporizador quando o componente é desmontado ou quando vagaOcupada muda para falso.
         return () => {
            clearTimeout(timeoutId);
         };
      }

      if (exclude) {
         const timeoutId = setTimeout(() => {
            handleCloseExclude();
         }, 1100);

         return () => {
            clearTimeout(timeoutId);
         };
      }

      if (success) {
         const timeoutId = setTimeout(() => {
            handleCloseSuccess();
         }, 1100);

         return () => {
            clearTimeout(timeoutId);
         };
      }

      fetchData();
   }, [vagaOcupada, exclude, success]);

   const handleCloseExclude = () => {
      setExclude(false);
   };

   const handleCloseAlert = () => {
      setVagaOcupada(false);
   };

   const handleCloseSuccess = () => {
      setSuccess(false);
   };

   const toggleModal = () => {
      setModalOpen(!modalOpen);
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         await axios.post('https://localhost:44311/api/Vagas', { nome });
         toggleModal();

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
         await axios.put(`https://localhost:44311/api/Vagas/${id}`, {
            id: id,
            nome: nome,
            status: status
         });

         const result = await axios('https://localhost:44311/api/Vagas');
         setData(result.data);
      } catch (error) {
         console.error(error);
      }
   };

   const openModalWithItem = (item) => {
      setNomeVaga(item.nome);
      setShowModal(true);
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
                  <H2>Novo Registro</H2>
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
         <ManagerTable>
            <Table>
               <THead>
                  <tr>
                     <TH>Nome</TH>
                     <TH>Status</TH>
                     <THCenter>Ações</THCenter>
                  </tr>
               </THead>
               <TBody>
                  {data.map((item) => (
                     <TR key={item.id}>
                        <TD>{item.nome}</TD>
                        <TDConditional status={item.status}>
                           {item.status === 0 ? 'Ativo' : 'Ocupado'}
                        </TDConditional>
                        <TDFlex>
                           {showModal && (
                              <ModalWrapper>
                                 <ModalContent>
                                    <H2>Editar</H2>
                                    <form>
                                       <input
                                          type="text"
                                          name="nomeVaga"
                                          placeholder='Nome'
                                          value={nomeVaga}
                                          autocomplete="off"
                                          onChange={(e) => setNomeVaga(e.target.value)} />
                                       <button type="submit" onClick={() => handleEdit(item.id, nomeVaga, item.status)}>Alterar</button>
                                       <button type="button" onClick={() => setShowModal(false)}>Fechar</button>
                                    </form>
                                 </ModalContent>
                              </ModalWrapper>
                           )}
                           <Button
                              type='submit'
                              backgroundColor="#90EE90"
                              onClick={() => openModalWithItem(item)}
                           >
                              Editar
                           </Button>
                           <Button
                              type='submit'
                              backgroundColor="#FF6347"
                              marginLeft="13px"
                              onClick={() => handleRemove(item.id)}
                           >
                              Excluir
                           </Button>
                        </TDFlex>
                     </TR>
                  ))}
               </TBody>
            </Table>
         </ManagerTable>
         <div>
            {vagaOcupada && <Alert message="A vaga está ocupada" />}
         </div>
         <div>
            {exclude && <Alert message="Registro Excluiso com Sucesso!" />}
         </div>
         <div>
            {success && <Alert message="Registro Incluido com Sucesso!" />}
         </div>
      </div>
   );
}