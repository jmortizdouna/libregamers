import React, { useState } from "react";
import FormularioProducto from '../componentes/FormularioProducto';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductsContext';

export default function AdminProductos() {
    const { isAuthenticated, isAdmin } = useAuth();
    const { products, deleteProduct, addProduct, updateProduct } = useProducts();
    const [productoEditando, setProductoEditando] = useState(null);
    const [mensaje, setMensaje] = useState('');
    const [tipoMensaje, setTipoMensaje] = useState('');

    // Función para agregar producto
    const handleAgregarProducto = async (producto) => {
        try {
            await addProduct(producto);
            setMensaje('Juego agregado correctamente!');
            setTipoMensaje('success');
            setTimeout(() => {
                setMensaje('');
                setTipoMensaje('');
            }, 3000);
        } catch (error) {
            console.error('Error:', error);
            setMensaje('Hubo un problema al agregar el juego. Intenta nuevamente.');
            setTipoMensaje('error');
            setTimeout(() => {
                setMensaje('');
                setTipoMensaje('');
            }, 3000);
        }
    };

    // Función para editar producto
    const handleEditarProducto = async (producto) => {
        try {
            await updateProduct(productoEditando.id, producto);
            setMensaje('Juego actualizado correctamente!');
            setTipoMensaje('success');
            setProductoEditando(null);
            setTimeout(() => {
                setMensaje('');
                setTipoMensaje('');
            }, 3000);
        } catch (error) {
            console.error('Error:', error);
            setMensaje('Hubo un problema al actualizar el juego. Intenta nuevamente.');
            setTipoMensaje('error');
            setTimeout(() => {
                setMensaje('');
                setTipoMensaje('');
            }, 3000);
        }
    };

    // Función para eliminar producto
    const handleEliminarProducto = async (id, nombre) => {
        const confirmar = window.confirm(`¿Estás seguro de eliminar "${nombre}"?`);
        if (confirmar) {
            try {
                await deleteProduct(id);
                setMensaje('Juego eliminado correctamente!');
                setTipoMensaje('success');
                setTimeout(() => {
                    setMensaje('');
                    setTipoMensaje('');
                }, 3000);
            } catch (error) {
                console.error('Error:', error);
                setMensaje('Hubo un problema al eliminar el juego. Intenta nuevamente.');
                setTipoMensaje('error');
                setTimeout(() => {
                    setMensaje('');
                    setTipoMensaje('');
                }, 3000);
            }
        }
    };

    // Si no está autenticado o no es Admin
    if (!isAuthenticated || !isAdmin) {
        return (
            <div className="container my-5">
                <div className="alert alert-warning text-center">
                    <h3>Acceso Restringido</h3>
                    <p>Solo los administradores pueden acceder a esta seccion</p>
                    <p>Contacta al administrador si necesitas acceso.</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* Banner de administración */}
            <header className="bg-primary text-white py-4">
                <div className="container">
                    <h1 className="text-center">Administración de Juegos</h1>
                    <p className="text-center mb-0">Agregar, editar y eliminar juegos del catálogo</p>
                </div>
            </header>

            {/* Mensaje de éxito o error */}
            {mensaje && (
                <div className={`alert ${tipoMensaje === 'success' ? 'alert-success' : 'alert-danger'} text-center mt-3`}>
                    {mensaje}
                </div>
            )}

            <div className="container my-5">
                <div className="row">
                    {/* Formulario */}
                    <div className="col-lg-6 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="card-title">
                                    {productoEditando ? 'Editar Juego' : 'Agregar Nuevo Juego'}
                                </h3>
                                <FormularioProducto 
                                    onAgregarProducto={productoEditando ? handleEditarProducto : handleAgregarProducto}
                                    productoEditando={productoEditando}
                                    onCancelar={() => setProductoEditando(null)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Lista de productos */}
                    <div className="col-lg-6">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="card-title">Lista de Juegos</h3>
                                
                                {products.length === 0 ? (
                                    <p className="text-muted">No hay juegos en el catálogo.</p>
                                ) : (
                                    <div className="list-group">
                                        {products.map(producto => (
                                            <div key={producto.id} className="list-group-item">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="flex-grow-1">
                                                        <h6 className="mb-1">{producto.nombre}</h6>
                                                        <p className="mb-1 text-muted small">
                                                            ${producto.precio} - {producto.descripcion.substring(0, 50)}...
                                                        </p>
                                                    </div>
                                                    <div className="btn-group flex-nowrap">
                                                        <button 
                                                            className="btn btn-warning btn-sm"
                                                            onClick={() => setProductoEditando(producto)}
                                                        >
                                                            Editar
                                                        </button>
                                                        <button 
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() => handleEliminarProducto(producto.id, producto.nombre)}
                                                        >
                                                            Eliminar
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Información adicional */}
            <div className="container mb-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card border-info">
                            <div className="card-body">
                                <h5 className="card-title">Información importante</h5>
                                <ul className="list-unstyled">
                                    <li>✅ Todos los campos son obligatorios excepto la imagen</li>
                                    <li>✅ El precio debe ser un número mayor a 0</li>
                                    <li>✅ La descripción debe tener al menos 10 caracteres</li>
                                    <li>✅ Los juegos se guardarán en MockAPI y aparecerán en el catálogo</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}