import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import Login from './Pages/Login';
import Nav from './components/Nav';
import Historico from './Pages/Historico';
import Mensalista from './Pages/Mensalista';
import Configuracoes from './Pages/Configuracoes';
import Vagas from './Pages/Vagas';
import Funcionario from './Pages/Funcionario';
import Estacionamento from './Pages/Estacionamento';

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
            </Routes>
        </Router>
    );
}