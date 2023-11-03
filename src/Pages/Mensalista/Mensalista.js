import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, H2, ManagerTable, ModalContent, ModalWrapper, Table, TBody, TD, TDFlex, TH, THCenter, THead, TR } from '../../styles/styles';
import Nav from "../../components/Nav";
import Alert from '../../components/Alert';

export default function Mensalista() {
   const [data, setData] = useState([]);
   const [modalOpen, setModalOpen] = useState(false);
   const [showModal, setShowModal] = useState(false);
   const [nome, setNome] = useState('');
   const [nomeMensalista, setNomeMensalista] = useState('');
   const [exclude, setExclude] = useState(false);
   const [success, setSuccess] = useState(false);

   useEffect(() => {
      const fetchData = async () => {
         const result = await axios('https://localhost:44311/api/Mensalistas');
         setData(result.data);
      };

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
   }, [exclude, success]);

   const handleCloseExclude = () => {
      setExclude(false);
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
         await axios.post('https://localhost:44311/api/Mensalistas', { nome });
         toggleModal();

         const result = await axios('https://localhost:44311/api/Mensalistas');
         setData(result.data);
         setSuccess(true);
      } catch (error) {
         console.error(error);
      }
   };

   const handleRemoveSubmit = async (id) => {
      try {
         await axios.delete(`https://localhost:44311/api/Mensalistas/${id}`);
         const result = await axios('https://localhost:44311/api/Mensalistas');
         setData(result.data);
         setExclude(true);
      } catch (error) {
         console.error(error);
      }
   };

   const handleEdit = async (id, nome) => {
      try {
         await axios.put(`https://localhost:44311/api/Mensalistas/${id}`, {
            id: id,
            Nome: nome,
         });

         const result = await axios('https://localhost:44311/api/Mensalistas');
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
                                    <H2>Editar</H2>
                                    <form>
                                       <input
                                          type="text"
                                          name="nomeMensalista"
                                          placeholder='Nome'
                                          value={nomeMensalista}
                                          autocomplete="off"
                                          onChange={(e) => setNomeMensalista(e.target.value)} />
                                       <button type="submit" onClick={() => handleEdit(item.id, nomeMensalista)}>Alterar</button>
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
                              marginLeft="13px"
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
         </ManagerTable>
         <div>
            {exclude && <Alert message="Registro Excluiso com Sucesso!" />}
         </div>
         <div>
            {success && <Alert message="Registro Incluido com Sucesso!" />}
         </div>
      </div>
   )
}