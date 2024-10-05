import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Componets/Register';
import Login from './Componets/Login';
import AdminPanel from './Componets/AdminPanel';
import RegisterServiceForm from './Componets/RegisterServiceForm';
import PrivateRoute from './Componets/PrivateRoute';
import RegisterClientForm from './Componets/RegisterClientsForm';


function App() {
  return (
    <Router>
       <Routes>
       <Route exact path="/registrarCliente" element={<PrivateRoute><RegisterClientForm/></PrivateRoute>}/>
       <Route exact path="/register" element={<Register/>}/>
       <Route exact path="/" element={<Login/>}/>
       <Route exact path="/panel" element={<PrivateRoute><AdminPanel/></PrivateRoute>}/>
       <Route exact path="/newService" element={<PrivateRoute><RegisterServiceForm/></PrivateRoute>}/>
      </Routes>
    </Router>
  );
}

export default App;

