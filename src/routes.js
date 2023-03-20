import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import Login from './Pages/Login/Login';
import Nav from './components/Nav';
import Historico from './Pages/Historico/Historico';
import Mensalista from './Pages/Mensalista/Mensalista';
import Configuracoes from './Pages/Configuracao/Configuracoes';
import Vagas from './Pages/Vaga/Vagas';
import Funcionario from './Pages/Funcionario/Funcionario';
import Estacionamento from './Pages/Estacionamento/Estacionamento';
import NovoEstacionamento from './Pages/NovoEstacionamento/NovoEstacionamento';
import NovoUsuario from './Pages/NovoUsuario/NovoUsuario';

export default function Routes_App() {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<Login />} />
                <Route path="/nav" element={<Nav/>} />
                <Route path='/historico' element={<Historico/>}/>
                <Route path='/mensalista' element={<Mensalista/>}/>
                <Route path='/configuracoes' element={<Configuracoes/>}/>
                <Route path='/vagas' element={<Vagas/>}/>
                <Route path='/funcionario' element={<Funcionario/>}/>
                <Route path='/estacionamento' element={<Estacionamento/>}/>
                <Route path='/novoestacionamento' element={<NovoEstacionamento/>}/>
                <Route path='/novoUsuario' element={<NovoUsuario/>} />
            </Routes>
        </Router>
    );
}