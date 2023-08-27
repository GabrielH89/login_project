import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import Welcome from './components/Welcome';
import Cadastro from './components/Cadastro';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/welcome' element={<Welcome/>}/>
          <Route path='/cadastro' element={<Cadastro/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
