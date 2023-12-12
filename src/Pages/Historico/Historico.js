import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HeaderCell, ManagerTable, StyledTable, TableCell, TableHeader, TableRow } from '../../styles/styles';
import Nav from '../../components/Nav';
import moment from 'moment';
import { Button, Dropdown, FilterContainer, Input } from './styles';

export default function Historico() {
   const [data, setData] = useState([]);

   useEffect(() => {
      const fetchData = async () => {
         const result = await axios('https://localhost:44311/api/Historico');
         setData(result.data);
      };
      fetchData();
   }, []);

   const MyEnum = {
      0: 'Entrada',
      1: 'Saida',
      2: 'Vaga',
      3: 'Placa',
      4: 'Funcionario',
      5: 'Valor',
      6: 'Limpeza',
   };

   const [selectedOption, setSelectedOption] = useState('');
   const [inputValue, setInputValue] = useState('');

   const handleDropdownChange = (event) => {
      setSelectedOption(event.target.value);
   };

   const handleInputChange = (event) => {
      setInputValue(event.target.value);
   };

   const handleSubmit = async (event) => {
      event.preventDefault();

      const url = `https://localhost:44311/api/Historico/Filter`;

      try {
         const response = await axios.get(url, {
            params: {
               search: inputValue,
               enumBusca: selectedOption
            }
         });

         const filteredData = response.data;
         setData(filteredData);
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <div className="main">
         <Nav />
         <FilterContainer>
            <Dropdown value={selectedOption} onChange={handleDropdownChange}>
               <option value="">Selecione uma opção</option>
               {Object.values(MyEnum).map((option) => (
                  <option key={option} value={option}>
                     {option}
                  </option>
               ))}
            </Dropdown>
            <Input
               type="text"
               value={inputValue}
               onChange={handleInputChange}
               placeholder="Informe um valor"
            />
            <Button onClick={handleSubmit}>Pesquisar</Button>
         </FilterContainer>
         <StyledTable>
            <TableHeader>
               <HeaderCell>Entrada</HeaderCell>
               <HeaderCell>Saida</HeaderCell>
               <HeaderCell>Vaga</HeaderCell>
               <HeaderCell>Placa</HeaderCell>
               <HeaderCell>Funcionario</HeaderCell>
               <HeaderCell>Mensalista</HeaderCell>
               <HeaderCell>Valor</HeaderCell>
               <HeaderCell>Limpeza</HeaderCell>
            </TableHeader>
            {data.map((item) => (
               <TableRow key={item.id}>
                  <TableCell>{moment(item.entrada).format('DD-MM-YYYY HH:mm')}</TableCell>
                  <TableCell>{moment(item.saida).format('DD-MM-YYYY HH:mm')}</TableCell>
                  <TableCell>{item.vaga}</TableCell>
                  <TableCell>{item.placa}</TableCell>
                  <TableCell>{item.funcionario}</TableCell>
                  <TableCell>{item.mensalista}</TableCell>
                  <TableCell>{item.valor}</TableCell>
                  <TableCell>{item.limpeza}</TableCell>
               </TableRow>
            ))}
         </StyledTable>
      </div>
   )
}