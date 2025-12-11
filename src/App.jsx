import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Componentes globales
import Navbar from "./componentes/Navbar";
import Footer from "./componentes/Footer";

// Páginas
import Home from "./paginas/Home";
import Catalogo from "./paginas/Catalogo";
import DetalleJuego from "./paginas/DetalleJuego";
import Carrito from "./paginas/Carrito";
import Login from "./paginas/Login";
import Registro from "./paginas/Registro";
import SobreNosotros from "./paginas/SobreNosotros";
import AdminProductos from './paginas/AdminProductos';
import ProtectedRoute from "./componentes/ProtectedRoute";

// CSS
import './App.css';

export default function App() {
  return (
    <Router>
      <div className='d-flex flex-column min-vh-100'>
        <Navbar />
        {/* Container de notificaciones Toastify */}
        <ToastContainer
          position='top-right'
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
          />
    
        <main className='flex-grow-1'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/detalle/:id" element={<DetalleJuego />} />
            <Route path="/carrito" element={
              <ProtectedRoute>
                <Carrito />
              </ProtectedRoute>
            } />
            <Route path='/admin' element={
              <ProtectedRoute>
                <AdminProductos />
              </ProtectedRoute>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/sobre" element={<SobreNosotros />} />
            <Route path="*" element={<div className='container py-5 text-center'><h2>404 - Página no encontrada</h2></div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
