import Nav from "../../components/Nav";
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, ButtonNavLink, ContainerButton, Form, Input, Label, Option, Select } from "./styled";
import { Limpeza } from '../../services/Traducoes';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

export default function NovoEstacionamento() {
    const [sendPlaca, setSendPlaca] = useState('');
    const [sendLimpeza, setSendLimpeza] = useState('');

    const [selectedVaga, setSelectedVaga] = useState('');
    const [selectedMensalista, setSelectedMensalista] = useState('');
    const [selectedFuncionario, setSelectedFuncionario] = useState('');

    const [vaga, setVaga] = useState([]);
    const [funcionario, setFuncionarios] = useState([]);
    const [mensalista, setMensalistas] = useState([]);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const fetchVagas = async () => {
            const response = await fetch('https://localhost:5001/api/Vagas/Status');
            const data = await response.json();
            setVaga(data);
        };
        const fetchFuncionarios = async () => {
            const response = await fetch('https://localhost:5001/api/Funcionarios');
            const data = await response.json();
            setFuncionarios(data);
        };
        const fetchMensalistas = async () => {
            const response = await fetch('https://localhost:5001/api/Mensalistas');
            const data = await response.json();
            setMensalistas(data);
        };
        fetchVagas();
        fetchFuncionarios();
        fetchMensalistas();
    }, []);

    const handleSubmit = async (date, selectedMensalista, sendPlaca, selectedFuncionario, selectedVaga, sendLimpeza) => {
        await axios.post("https://localhost:5001/api/Estacionamento/", {
            id: 0,
            Entrada: date,
            Vaga: null,
            vencimento: null,
            mensalista: null,
            mensalistaId: selectedMensalista,
            Placa: sendPlaca,
            Funcionario: null,
            valor: null,
            FuncionarioId: selectedFuncionario,
            VagaId: selectedVaga,
            Limpeza: sendLimpeza
        });
    };

    const options = Object.keys(Limpeza).map((key) => (
        <Option key={key} value={Limpeza[key]}>
            {Limpeza[key]}
        </Option>
    ));

    return (
        <div className="main">
            <Nav />
            <Form>
                <Label>
                    Entrada:
                    <Datetime
                        inputProps={{ disabled: true }}
                        input={true}
                        open={false}
                        dateFormat="YYYY-MM-DD"
                        timeFormat="HH:mm"
                        value={date}
                        onChange={(selectedDate) => setDate(selectedDate)}
                    />
                </Label>
                <Label>
                    Saida:
                    <Datetime
                        inputProps={{ disabled: true }}
                        input={true}
                        open={false}
                        dateFormat="YYYY-MM-DD"
                        timeFormat="HH:mm"
                        onChange={(selectedDate) => setDate(selectedDate)}
                    />
                </Label>
                <Label>
                    Valor:
                    <Input type="number" className="npodeseralterado" disabled="disabled" />
                </Label>
                <Label>
                    Mensalista:
                    <Select value={selectedMensalista} onChange={(event) => setSelectedMensalista(event.target.value)}>
                        <Option value="">Selecione uma opção</Option>
                        {mensalista.map((mensalista) => (
                            <Option key={mensalista.id}
                                value={mensalista.id}>
                                {mensalista.nome}
                            </Option>
                        ))}
                    </Select>
                </Label>
                <Label>
                    Placa:
                    <Input type="text" 
                            value={sendPlaca}
                            onChange={(event) => setSendPlaca(event.target.value)} 
                            required/>
                </Label>
                <Label>
                    Funcionario:
                    <Select value={selectedFuncionario} onChange={(event) => setSelectedFuncionario(event.target.value)}>
                        <Option value="">Selecione uma opção</Option>
                        {funcionario.map((funcionarios) => (
                            <Option key={funcionarios.id}
                                value={funcionarios.id}
                                onChange={(event) => setFuncionarios(event.target.value)}>
                                {funcionarios.nome}
                            </Option>
                        ))}
                    </Select>
                </Label>
                <Label>
                    Vaga:
                    <Select value={selectedVaga} onChange={(event) => setSelectedVaga(event.target.value)}>
                        <Option value="">Selecione uma opção</Option>
                        {vaga.map((vagas) => (
                            <Option key={vagas.id}
                                value={vagas.id}>
                                {vagas.nome}
                            </Option>
                        ))}
                    </Select>
                </Label>
                <Label>
                    Limpeza:
                    <Select value={sendLimpeza} onChange={(event) => setSendLimpeza(event.target.value)}>
                        {options}
                    </Select>
                </Label>
                <ContainerButton>
                    <Button backgroundColor="#90EE90" 
                            color="Black" 
                            onClick={ 
                                () =>
                                    handleSubmit(date, 
                                                selectedMensalista, 
                                                sendPlaca, 
                                                selectedFuncionario, 
                                                selectedVaga, 
                                                sendLimpeza)
                                    } >Criar</Button>
                    <ButtonNavLink to="/estacionamento" color="Black" >Voltar</ButtonNavLink>
                </ContainerButton>
            </Form>
        </div>
    )
}