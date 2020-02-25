import React, { useState } from 'react';
import Error from '../Error/Error';
import PropTypes from 'prop-types';

const Formulario = ({ guardarBusqueda }) => {
    const [termino, guardarTermino] = useState('');
    const [error, guardarError] = useState(false);

    const BuscarImagenes = e => {
        e.preventDefault();

        // validar
        if (termino.trim() === '') {
            guardarError(true);
            return;
        }
        guardarError(false);

        // Enviar el termino al componente principal
        guardarBusqueda(termino);

    }
    return (
        <form
            onSubmit={BuscarImagenes}
        >
            <div className="row">
                <div className="form-ground col-md-8">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Busca una imagen, Ejemplo: fútbol o café"
                        onChange={e => guardarTermino(e.target.value)}
                    />
                </div>
                <div className="form-ground col-md-4">
                    <input
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="Buscar"
                    />
                </div>
            </div>
            {error ? <Error mensaje="Agrega un término de busqueda" /> : null}
        </form>
    );
}
Formulario.propTypes = {
    guardarBusqueda: PropTypes.func.isRequired
}
export default Formulario;