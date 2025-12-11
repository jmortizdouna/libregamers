import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Helmet } from "react-helmet-async";

export default function Carrito() {
  const { items, aumentar, disminuir, quitar, vaciar } = useCart();
  const { isAuthenticated } = useAuth();
  const total = items.reduce((s, it) => s + (it.precio || 0) * (it.cantidad || 0), 0);
  const navigate = useNavigate();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);

  const handleFinalizar = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    setShowContactForm(true);
  };

  const handleLoginRedirect = () => {
    setShowLoginModal(false);
    navigate("/login", { state: { from: "/carrito" } });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitContactForm = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Crear resumen del pedido
    const orderDetails = items.map(item => 
      `${item.nombre} x${item.cantidad} - $${(item.cantidad * item.precio).toFixed(2)}`
    ).join("\n");

    const fullOrder = {
      ...formData,
      pedido: `Resumen del pedido:\n${orderDetails}\n\nTotal: $${total.toFixed(2)}`,
      fecha: new Date().toLocaleString()
    };

    try {
      // Envia a Fromspree 
      const response = await fetch("https://formspree.io/f/xdkqwnag", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(fullOrder)
      });

      if (response.ok) {
        setOrderCompleted(true);
        vaciar();
        setFormData({ nombre: "", apellido: "", email: "" });
        
        // Cerrar automáticamente después de 5 segundos
        setTimeout(() => {
          setShowContactForm(false);
          setOrderCompleted(false);
          navigate("/");
        }, 5000);
      } else {
        throw new Error("Error al enviar el formulario");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un problema al procesar tu pedido. Por favor, intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container my-5">
      <Helmet>
        <title>Carrito de Compras - LibreGames</title>
        <meta name="description" content="Gestiona tus juegos en el carrito de compras" />
      </Helmet>

      <h2 className="mb-4">Carrito de compras</h2>

      {items.length === 0 ? (
        <div className="text-center py-5">
          <p>No hay juegos en el carrito aún.</p>
          <Link to="/catalogo" className="btn btn-primary">Ir al catálogo</Link>
        </div>
      ) : (
        <div className="row">
          <div className="col-12 col-lg-8 mb-3 mb-lg-0">
            <ul className="list-group mb-3">
              {items.map(i => (
                <li key={i.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    {i.imagen && <img src={i.imagen} alt={i.nombre} style={{ width: 80, height: 60, objectFit: "cover" }} className="me-3 rounded" />}
                    <div>
                      <div className="fw-semibold">{i.nombre}</div>
                      <small className="text-muted">${Number(i.precio).toFixed(2)}</small>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <div className="input-group" style={{ width: 120 }}>
                      <button className="btn btn-outline-secondary btn-sm" onClick={() => disminuir(i.id)} aria-label="Disminuir cantidad">-</button>
                      <span className="input-group-text">{i.cantidad}</span>
                      <button className="btn btn-outline-secondary btn-sm" onClick={() => aumentar(i.id)} aria-label="Aumentar cantidad">+</button>
                    </div>
                    <div className="text-end me-2">${(i.cantidad * i.precio).toFixed(2)}</div>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => quitar(i.id)}>Quitar</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-12 col-lg-4">
            <div className="card">
              <div className="card-body">
                <h5>Resumen</h5>
                <p className="mb-1 text-muted">Artículos: {items.reduce((s, it) => s + it.cantidad, 0)}</p>
                <h4 className="fw-bold">${total.toFixed(2)}</h4>
                <div className="d-grid gap-2">
                  <button className="btn btn-primary" onClick={handleFinalizar}>Finalizar Pedido</button>
                  <button className="btn btn-outline-danger" onClick={vaciar}>Vaciar carrito</button>
                  <Link to="/catalogo" className="btn btn-link">Seguir comprando</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Login */}
      {showLoginModal && (
        <>
          <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Iniciar sesión requerida</h5>
                  <button type="button" className="btn-close" onClick={() => setShowLoginModal(false)}></button>
                </div>
                <div className="modal-body">
                  <p>Debes iniciar sesión para continuar con el pedido. ¿Ir a login?</p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowLoginModal(false)}>Cancelar</button>
                  <button className="btn btn-primary" onClick={handleLoginRedirect}>Ir a Login</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}

      {/* Modal del Formulario de Contacto */}
      {showContactForm && (
        <>
          <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {orderCompleted ? "¡Pedido Confirmado!" : "Completar Pedido"}
                  </h5>
                  {!orderCompleted && (
                    <button 
                      type="button" 
                      className="btn-close" 
                      onClick={() => setShowContactForm(false)}
                      disabled={isSubmitting}
                    ></button>
                  )}
                </div>
                
                <div className="modal-body">
                  {orderCompleted ? (
                    <div className="text-center py-4">
                      <div className="alert alert-success">
                        <h5>¡Gracias por tu pedido!</h5>
                        <p className="mb-0">
                          En breve nos pondremos en contacto contigo para gestionar el pago.
                          <br />
                          <small className="text-muted">Serás redirigido a la página principal en unos segundos.</small>
                        </p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitContactForm}>
                      <p className="text-muted mb-3">
                        Por favor completa tus datos para procesar el pedido.
                      </p>
                      
                      <div className="mb-3">
                        <label className="form-label">Nombre *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleInputChange}
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                      
                      <div className="mb-3">
                        <label className="form-label">Apellido *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="apellido"
                          value={formData.apellido}
                          onChange={handleInputChange}
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                      
                      <div className="mb-3">
                        <label className="form-label">Email *</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                      
                      <div className="alert alert-info">
                        <small>
                          <strong>Resumen del pedido:</strong><br />
                          {items.map(item => (
                            <div key={item.id}>
                              {item.nombre} x{item.cantidad} - ${(item.cantidad * item.precio).toFixed(2)}
                            </div>
                          ))}
                          <hr className="my-2" />
                          <strong>Total: ${total.toFixed(2)}</strong>
                        </small>
                      </div>
                      
                      <div className="d-grid gap-2">
                        <button 
                          type="submit" 
                          className="btn btn-primary"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Enviando..." : "Confirmar Pedido"}
                        </button>
                        <button 
                          type="button" 
                          className="btn btn-outline-secondary"
                          onClick={() => setShowContactForm(false)}
                          disabled={isSubmitting}
                        >
                          Cancelar
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
}

