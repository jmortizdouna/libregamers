import React, { useEffect, useState } from "react";

export default function FormularioProducto({onAgregarProducto, productoEditando, onCancelar}) {   //almacena los datos del formulario
    const [producto, setProducto] = useState({
        nombre:'',
        precio:'',
        descripcion:'',
        imagen:''
    });

    //almacena los errores de validacion
    const [errores, setErrores] = useState({});
    //Efecto para cagar datos cuando se edita
    useEffect(()=> {
        if(productoEditando){
            setProducto({
                nombre:productoEditando.nombre || '',
                precio:productoEditando.precio || '',
                descripcion: productoEditando.descripcion || '',
                imagen: productoEditando.imagen || ''
            });
        }else {
            // Limpia el formulario si o hay producto editando
            setProducto({
                nombre:'',
                precio:'',
                descripcion:'',
                imagen:''
            });
        }
        setErrores({});
    }, [productoEditando]);

    //funcion para manejar los cambios en los inputs
    const handleChange = (e) => {
        const {name,value} = e.target;
        setProducto({
            ...producto,
            [name]: value
        });
        //Limpiar error del campo cuando el usuario escribe
        if(errores[name]){
            setErrores({
                ...errores,
                [name]:''
            });
        }

    };

    //Funcion para validar el formulario
    const validarFormulario = () => {
        const nuevosErrores = {};

        //validar nombre
        if(!producto.nombre.trim()){
            nuevosErrores.nombre ='El nombre es obligatorio';
        }
        //validar precio
        if(!producto.precio || producto.precio <=0){
            nuevosErrores.precio = 'El precio debe ser mayor a 0';
        }
        //validar descripcion
        if(!producto.descripcion.trim()){
            nuevosErrores.descripcion ='La descripcion es obligatoria';
        } else if (producto.descripcion.length <10){
            nuevosErrores.descripcion = 'La descripcion debe tener al menos 10 caracteres';
        }
        
        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0; //Retorna true si no hay errores

    };

    //Funcion para manejar el envio del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        if(validarFormulario()){
            //Llama a la funcion para agregar el producto
            onAgregarProducto(producto);

            //Limpia el formulario
            setProducto({
                nombre:'',
                precio:'',
                descripcion:'',
                imagen:''
            });
            setErrores({});
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {/*Campo Nombre*/}
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">
                        Nombre del Juego
                    </label>
                    <input 
                        type="text"
                        className={`form-control ${errores.nombre? 'is-invalid':''}`}
                        id="nombre"
                        name="nombre"
                        value={producto.nombre}
                        onChange={handleChange}
                        placeholder="Ej: Super Mario Bros"
                        aria-describedby={errores.nombre ? "nombreError" : undefined}
                        aria-invalid={!!errores.nombre}
                        />
                        {errores.nombre && (
                            <div className="invalid-feedback">
                                {errores.nombre}
                            </div>
                        )}
                                </div>
                                {/*Campo Precio */}
                                <div className="mb-3">
                                    <label htmlFor="precio" className="form-label">
                                        Precio
                                    </label>
                                    <input
                                        type="number"
                                        className={`form-control ${errores.precio ? 'is-invalid':''}`}
                                        id="precio"
                                        name="precio"
                                        value={producto.precio}
                                        onChange={handleChange}
                                        placeholder="Ej:29.99"
                                        min="0"
                                        step="0.01"/>
                                    {errores.precio && (
                                        <div className="invalid-feedback">
                                            {errores.precio}
                                        </div>
                                    )}
                                </div>
                                {/*Campo Descripcion */}
                                <div className="mb-3">
                                    <label htmlFor="descripcion" className="form-label">
                                        Descripcion
                                    </label>
                                    <textarea
                                    className={`form-control ${errores.descripcion ? 'is-invalid':''}`}
                                    id="descripcion"
                                    name="descripcion"
                                    value={producto.descripcion}
                                    onChange={handleChange}
                                    rows="4"
                                    placeholder="Describe el juego en al menos 10 caracteres ..."/>
                                    {errores.descripcion &&(
                                        <div className="invalid-feedback">
                                            {errores.descripcion}
                                        </div>
                                    )}
                                </div>
                                {/*Campo Imagen*/}
                                <div className="mb-3">
                                    <label htmlFor="imagen" className="form-label">
                                        URL de la Imagen
                                    </label>
                                    <input
                                        type="url"
                                        className="form-control"
                                        id="imagen"
                                        name="imagen"
                                        value={producto.imagen}
                                        onChange={handleChange}
                                        placeholder="Ej: https://ejemplo.com/imagen.jpg"/>
                                    <div className="form-text">
                                        Opcional: Si no proporcionas una imagen, se utilizara una por defecto.
                                    </div>
                                </div>
                                {/*Botones */}
                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    {productoEditando && (
                                        <button 
                                            type="button"
                                            className="btn btn-secondary me-md-2"
                                            onClick={onCancelar}
                                            >
                                                Cancelar Edicion
                                            </button>
                                    )}
                                    <button type="submit" className="btn btn-success">
                                        {productoEditando ? 'Actualizar juego': 'Agregar Juego'}
                                    </button>
                                </div>

                            </form>
                        </div>
    );

}