import React from 'react';
import Nav from '../../components/Nav';
import FuncionariosWindow from './Winndow/FuncionariosWindow';
import CarrosTotaisWindow from './Winndow/CarrosTotaisWindow';
import VagasWindow from './Winndow/VagasWindow';
import { DashboardContainer } from './styled';
import MensalistasTotaisWindow from './Winndow/MensalistasTotaisWindow';
import CarrosNoPatioWindow from './Winndow/CarrosNoPatioWindow';

export default function Dashboard() {

    return (
        <div className="main">
            <Nav />
            <DashboardContainer>
                <VagasWindow />
                <FuncionariosWindow />
                <CarrosNoPatioWindow/>
            </DashboardContainer>
            <DashboardContainer>
                <MensalistasTotaisWindow />
                <CarrosTotaisWindow />
            </DashboardContainer>
        </div>
    );
}