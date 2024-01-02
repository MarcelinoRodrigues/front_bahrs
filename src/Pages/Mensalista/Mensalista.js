import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StyledTable,Button, TableHeader, HeaderCell, TableRow, TableCell, ActionButtons, EditButton, DeleteButton, Modal, ModalContent, CloseButton, EditForm } from '../../styles/styles'; // Certifique-se de importar os componentes do seu arquivo styled
import Alert from '../../components/Alert';
import Nav from '../../components/Nav';

export default function Mensalista() {
   const [data, setData] = useState([]);
   const [exclude, setExclude] = useState(false);
   const [success, setSuccess] = useState(false);
   const [edit, setEdit] = useState(false);
   const [editingItem, setEditingItem] = useState(null);
   const [isModalOpen, setModalOpen] = useState(false);
   const [isAddModalOpen, setAddModalOpen] = useState(false);
   const [nome, setNome] = useState('');
   const [catchName, setCatchName] = useState(false);

   useEffect(() => {
      const fetchData = async () => {
         const result = await axios('https://localhost:44311/api/Mensalistas');
         setData(result.data);
      };

      exclude && setTimeout(handleCloseExclude, 1100);
      success && setTimeout(handleCloseSuccess, 1100);
      edit && setTimeout(handleCloseEdit, 1100);
      catchName && setTimeout(handleCloseCatchName, 1100);

      fetchData();
   }, [exclude, success, edit, catchName]);

   const handleCloseExclude = () => setExclude(false);
   const handleCloseSuccess = () => setSuccess(false);
   const handleCloseEdit = () => setEdit(false);
   const handleCloseCatchName = () => setCatchName(false);

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
      setEditingItem({ id, nome }); 
      setModalOpen(true);
   };

   const handleEditSubmit = async (id, novoNome) => {
      try {
         await axios.put(`https://localhost:44311/api/Mensalistas/${id}`, {
            id: id,
            Nome: novoNome,
         });

         const result = await axios('https://localhost:44311/api/Mensalistas');
         setData(result.data);
         setModalOpen(false);
         setEditingItem(null);
         setEdit(true);
      } catch (error) {
         console.error(error);
      }
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         if (data.some((item) => item.nome === nome)) {
            setCatchName(true);
         } else {
            await axios.post('https://localhost:44311/api/Mensalistas', { nome });

            const result = await axios('https://localhost:44311/api/Mensalistas');
            setData(result.data);
            setSuccess(true);
            setAddModalOpen(false);
         }
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <div className="main">
         <Nav />
         <Button type="default" onClick={() => { setNome(''); setAddModalOpen(true); }}>Novo Registro</Button>
         <StyledTable>
            <TableHeader>
               <HeaderCell>Nome</HeaderCell>
               <HeaderCell>Ações</HeaderCell>
            </TableHeader>
            {data.map((item) => (
               <TableRow key={item.id}>
                  <TableCell>{item.nome}</TableCell>
                  <TableCell>
                     <ActionButtons>
                        <EditButton onClick={() => handleEdit(item.id, item.nome)}>Editar</EditButton>
                        <DeleteButton onClick={() => handleRemoveSubmit(item.id)}>Excluir</DeleteButton>
                     </ActionButtons>
                  </TableCell>
               </TableRow>
            ))}
         </StyledTable>
         {/* Modal de Edição */}
         {editingItem && (
            <Modal isOpen={isModalOpen}>
               <ModalContent>
                  <EditForm
                     onSubmit={(e) => {
                        e.preventDefault();
                        if (e.nativeEvent.submitter.name === 'submitBtn') {
                           handleEditSubmit(editingItem.id, e.target.novoNome.value);
                        } else {
                           setModalOpen(false);
                        }
                     }}
                  >
                     <label>
                        Nome:
                        <input type="text" autoComplete='off' name="novoNome" required defaultValue={editingItem.nome} />
                     </label>
                     <button type="submit" name="submitBtn">Salvar</button>
                     <CloseButton onClick={() => setModalOpen(false)}>Fechar</CloseButton>
                  </EditForm>
               </ModalContent>
            </Modal>
         )}
         {/* Modal de Inclusão */}
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
                  }}
               >
                  <label htmlFor="nome">Nome:</label>
                  <input
                     type="text"
                     id="nome"
                     value={nome}
                     autoComplete='off'
                     required
                     onChange={(e) => setNome(e.target.value)}
                     placeholder="Digite o nome"
                  />
                  <button type="submit" name="submitBtn">Adicionar</button>
                  <CloseButton onClick={() => setAddModalOpen(false)}>Fechar</CloseButton>
               </EditForm>
            </ModalContent>
         </Modal>
         <div>
            {exclude && <Alert message="Registro Excluído com Sucesso!" />}
         </div>
         <div>
            {success && <Alert message="Registro Incluído com Sucesso!" />}
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