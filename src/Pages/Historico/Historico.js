import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TBody, TD, TH, THead, TR } from '../../styles/styles';
import Nav from '../../components/Nav';
import moment from 'moment';

export default function Historico() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios('https://localhost:5001/api/Historico');
            setData(result.data);
        };
        fetchData();
    }, []);

    return (
        <div className="main">
            <Nav/>
            <Table>
                <THead>
                    <tr>
                        <TH>Entrada</TH>
                        <TH>Saida</TH>
                        <TH>Vaga</TH>
                        <TH>Placa</TH>
                        <TH>Funcionario</TH>
                        <TH>Mensalista</TH>
                        <TH>Valor</TH>
                        <TH>Limpeza</TH>
                    </tr>
                </THead>
                <TBody>
                    {data.map((item) => (
                        <TR key={item.id}>
                            <TD>{moment(item.entrada).format('DD-MM-YYYY HH:mm')}</TD>
                            <TD>{moment(item.saida).format('DD-MM-YYYY HH:mm')}</TD>
                            <TD>{item.vaga}</TD>
                            <TD>{item.placa}</TD>
                            <TD>{item.funcionario}</TD>
                            <TD>{item.mensalista}</TD>
                            <TD>{item.valor}$</TD>
                            <TD>{item.limpeza}</TD>
                        </TR>
                    ))}
                </TBody>
            </Table>
        </div>
    )
}