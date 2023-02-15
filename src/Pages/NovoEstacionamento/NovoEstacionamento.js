import Nav from "../../components/Nav";
import React, { useEffect, useState } from 'react';
import { ButtonNavLink, ContainerButton, Form, Input, Label, Option, Select } from "./styledNovoEstacionamento";
import { Limpeza } from '../../services/Traducoes';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

export default function NovoEstacionamento() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [vaga, setVaga] = useState([]);
    const [funcionario, setFuncionarios] = useState([]);
    const [mensalista, setMensalistas] = useState([]);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const fetchVagas = async () => {
            const response = await fetch('https://localhost:5001/api/Vagas');
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

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Name: ${name}\nEmail: ${email}`);
    };

    const options = Object.keys(Limpeza).map((key) => (
        <Option key={key} value={Limpeza[key]}>
            {Limpeza[key]}
        </Option>
    ));

    return (
        <div className="main">
            <Nav />
            <Form onSubmit={handleSubmit}>
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
                    <Input type="email" className="npodeseralterado" disabled="disabled" />
                </Label>
                <Label>
                    Mensalista:
                    <Select value={name} onChange={(event) => setName(event.target.value)}>
                        <Option value="">Selecione uma opção</Option>
                        {mensalista.map((mensalista) => (
                            <Option key={mensalista.id} value={mensalista.id}>
                                {mensalista.nome}
                            </Option>
                        ))}
                    </Select>
                </Label>
                <Label>
                    Placa:
                    <Input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
                </Label>
                <Label>
                    Funcionario:
                    <Select value={name} onChange={(event) => setName(event.target.value)}>
                        <Option value="">Selecione uma opção</Option>
                        {funcionario.map((funcionarios) => (
                            <Option key={funcionarios.id} value={funcionarios.id}>
                                {funcionarios.nome}
                            </Option>
                        ))}
                    </Select>
                </Label>
                <Label>
                    Vaga:
                    <Select value={name} onChange={(event) => setName(event.target.value)}>
                        <Option value="">Selecione uma opção</Option>
                        {vaga.map((vagas) => (
                            <Option key={vagas.id} value={vagas.id}>
                                {vagas.nome}
                            </Option>
                        ))}
                    </Select>
                </Label>
                <Label>
                    Limpeza:
                    <Select value={name} onChange={(event) => setName(event.target.value)}>
                        {options}
                    </Select>
                </Label>
                <ContainerButton>
                    <ButtonNavLink to="/novoestacionamento" backgroundColor="#90EE90" color="Black" >Criar</ButtonNavLink>
                    <ButtonNavLink to="/novoestacionamento" color="Black" >Voltar</ButtonNavLink>
                </ContainerButton>
            </Form>
        </div>
    )
}