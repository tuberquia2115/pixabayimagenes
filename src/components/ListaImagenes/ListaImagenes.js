import React from 'react';
import Imagen from '../Imagen/Imagen';
import PropTypes from 'prop-types';

const ListaImagenes = ({ imagenes }) => {
    return (
        <div className="col-12 p-5 row">
            {Array.isArray(imagenes) && imagenes.map(imagen => (
                <Imagen
                    key={imagen.id}
                    imagen={imagen}
                />
            ))}
        </div>
    );
}
ListaImagenes.propTypes = {
    imagenes: PropTypes.array.isRequired,
}
export default ListaImagenes;