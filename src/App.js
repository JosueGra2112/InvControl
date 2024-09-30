import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Componentes para Login y Registro
import Login from './VIEW/LOGIN/Login';
import Inicio from './VIEW/Component';
import Register from './VIEW/LOGIN/Register';
import About from './VIEW/About'

// Componentes para Admin
import AdminPanel from './VIEW/ROL/Admin/AdminDashboard'; // Dashboard de Admin
import ManageUsers from './VIEW/ROL/Admin/ManageUsers'; // Gestión de Usuarios
import ManageProducts from './VIEW/ROL/Admin/ManageProducts'; // Gestión de Productos
import StockMovements from './VIEW/ROL/Admin/StockMovements'; // Movimientos de Inventario

// Componentes para Empleados


function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas para Login y Registro */}
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />


        {/* Rutas para el perfil de Admin */}
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/products" element={<ManageProducts />} />
        <Route path="/admin/stock-movements" element={<StockMovements />} />

        {/* Ruta para el perfil de Empleados */}


        {/* Ruta por defecto al iniciar */}
        <Route path="/" element={<Login />} /> {/* Redirige al Login por defecto */}
      </Routes>
    </Router>
  );
}

export default App;
