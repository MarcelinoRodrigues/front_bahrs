import Nav from "../../../components/Nav";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, ButtonNavLink, ContainerButton, Form, IMG, Input, Label, Option, Select } from "./styled";
import { Limpeza } from '../../../services/Traducoes';
import { useNavigate } from 'react-router-dom';
import RequiredIcon from '../../../Assets/iconspontodeexclamacao.png';
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
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVagas = async () => {
            const response = await fetch('https://localhost:44311/api/Vagas/Status');
            const data = await response.json();
            setVaga(data);
        };
        const fetchFuncionarios = async () => {
            const response = await fetch('https://localhost:44311/api/Funcionarios');
            const data = await response.json();
            setFuncionarios(data);
        };
        const fetchMensalistas = async () => {
            const response = await fetch('https://localhost:44311/api/Mensalistas');
            const data = await response.json();
            setMensalistas(data);
        };
        fetchVagas();
        fetchFuncionarios();
        fetchMensalistas();
    }, []);

    const TratarDadosLimpeza = (recebeSendLimpeza) => {
        let resultado = 0;
        //TODO: qualquer alteração de enum Limpeza altera o valor do tratamento
        switch (recebeSendLimpeza) {
            case "Completa":
                resultado = 1;
                break;
            case "Interna":
                resultado = 2;
                break;
            case "Externa":
                resultado = 3;
                break;
            default:
                resultado = 0;
                break;
        }

        return resultado;
    }

    const HandleSubmit = async (e) => {
        e.preventDefault();
        let setarLimpeza = TratarDadosLimpeza(sendLimpeza);

        try {
            const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}T${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;

            await axios.post("https://localhost:44311/api/Estacionamento/", {
                id: 0,
                Entrada: formattedDate,
                Vaga: null,
                mensalistaId: selectedMensalista !== "" ? selectedMensalista : null,
                Placa: sendPlaca,
                valor: null,
                FuncionarioId: selectedFuncionario,
                VagaId: selectedVaga,
                Limpeza: setarLimpeza
            });
            console.log("Data enviada do front end:", date);

            RevolvePath();

        } catch (error) {
            console.log(error);
        }
    };

    function RevolvePath(){
        return navigate('/estacionamento');
    }

    const options = Object.keys(Limpeza).map((key) => (
        <Option key={key} value={Limpeza[key]}>
            {Limpeza[key]}
        </Option>
    ));

    return (
        <div className="main">
            <Nav />
            <Form onSubmit={HandleSubmit}>
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
                    <span>Placa: </span><IMG src={RequiredIcon}></IMG>
                    <Input type="text"
                        value={sendPlaca}
                        onChange={(event) => setSendPlaca(event.target.value)}
                        required />
                </Label>
                <Label>
                    <span>Funcionario: </span><IMG src={RequiredIcon}></IMG>
                    <Select value={selectedFuncionario} onChange={(event) => setSelectedFuncionario(event.target.value)} required>
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
                    <span>Vaga: </span><IMG src={RequiredIcon}></IMG>
                    <Select value={selectedVaga} onChange={(event) => setSelectedVaga(event.target.value)} required>
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
                        type="submit" >Criar</Button>
                    <ButtonNavLink to="/estacionamento" color="Black" >Voltar</ButtonNavLink>
                </ContainerButton>
            </Form>
        </div>
    )
}