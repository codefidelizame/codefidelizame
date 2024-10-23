import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Componets/Register';
import Login from './Componets/Login';
import AdminPanel from './Componets/AdminPanel';
import RegisterServiceForm from './Componets/RegisterServiceForm';
import PrivateRoute from './Componets/PrivateRoute';
import RegisterClientForm from './Componets/RegisterClientsForm';
import Landing from './Componets/Landing';
import ClientsList from './Componets/ClientsList';
import ComerciosList from './Componets/ComerciosList';
import PasswordReset from './Componets/PasswordReset'
import ResetPassword from './Componets/ResetPassword';

function App() {
  return (
    <Router>
       <Routes>
        <Route exact path='/' element={<Landing/>}/>
       <Route exact path="/registrarCliente" element={<PrivateRoute><RegisterClientForm/></PrivateRoute>}/>
       <Route exact path="/clientes" element={<PrivateRoute><ClientsList/></PrivateRoute>}/>
       <Route exact path="/comercios" element={<PrivateRoute><ComerciosList/></PrivateRoute>}/>
       <Route exact path="/register" element={<Register/>}/>
       <Route exact path="/login" element={<Login/>}/>
       <Route exact path="/reset-password/:token" element={<ResetPassword/>}/>
       <Route exact path="/PasswordReset" element={<PasswordReset/>}/>
       <Route exact path="/panel" element={<PrivateRoute><AdminPanel/></PrivateRoute>}/>
       <Route exact path="/newService" element={<PrivateRoute><RegisterServiceForm/></PrivateRoute>}/>
      </Routes>
    </Router>
  );
}

export default App;

