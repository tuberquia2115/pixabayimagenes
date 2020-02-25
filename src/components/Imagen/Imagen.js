import React from 'react';
import PropTypes from 'prop-types';

const Imagen = ({ imagen }) => {
    const { largeImageURL, likes, previewURL, tags, views, comments, downloads } = imagen;
    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card">
                <img alt={tags} src={previewURL} className="card-img-top" />
                <div className="card-body">
                    <p className="card-text"> <strong>{likes}</strong> Me Gusta</p>
                    <p className="card-text"> <strong>{views}</strong> Vistas</p>
                    <p className="card-text"><strong>{comments}</strong> Comentarios</p>
                    <p className="card-text"><strong>{downloads}</strong> Descargas</p>
                </div>
                <div className="card-footer">
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-block"
                        href={largeImageURL}>Ver Imagen</a>
                </div>
            </div>
        </div>
    );
}

Imagen.propTypes = {
    imagen: PropTypes.object,
}
export default Imagen;