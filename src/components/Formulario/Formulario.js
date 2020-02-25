import React, { useState } from 'react';
import Error from '../Error/Error';
import PropTypes from 'prop-types';

const Formulario = ({ guardarBusqueda, guardarBusquedaTipo }) => {
    const [termino, guardarTermino] = useState('');
    const [tipo, guardarTipo] = useState('');
    const [error, guardarError] = useState(false);

    const BuscarImagenes = e => {
        e.preventDefault();

        // validar
        if (termino.trim() === '' || tipo.trim() === '') {
            guardarError(true);
            return;
        }
        guardarError(false);

        // Enviar el termino al componente principal
        guardarBusqueda(termino);
        guardarBusquedaTipo(tipo);

    }
    return (
        <form
            onSubmit={BuscarImagenes}
        >
            <div className="row">
                <div className="form-ground col-md-8" style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <input
                        type="text"
                        className="form-control form-control-lg mr-1"
                        placeholder="Busca una imagen o un videos, Ejemplo: fútbol o café"
                        onChange={e => guardarTermino(e.target.value)}
                    />
                    <select
                        onChange={e => guardarTipo(e.target.value)}
                        className="form-control form-control-lg" value={tipo}>
                        <option value="">seleccione lo que desea buscar</option>
                        <option value="imagenes">Imagenes</option>
                        <option value="videos">Videos</option>
                    </select>
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