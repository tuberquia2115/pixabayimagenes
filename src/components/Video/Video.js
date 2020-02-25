import React from 'react';
import PropTypes from 'prop-types';

const Video = ({ video }) => {
    const { likes, views, comments, downloads, duration, pageURL, videos, userImageURL } = video;
    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card">
                <video
                    className="card width-auto height-auto"
                    preload="metadata"
                    controls={true}
                    poster={userImageURL}
                    loop
                    src={videos.tiny.url}
                >

                </video>
                <div className="card-body">
                    <p className="card-text"> <strong>{likes}</strong> Me Gusta</p>
                    <p className="card-text"> <strong>{views}</strong> Vistas</p>
                    <p className="card-text"><strong>{comments}</strong> Comentarios</p>
                    <p className="card-text"><strong>{downloads}</strong> Descargas</p>
                    <p className="card-text"><strong>{duration}</strong> Duración</p>
                </div>
                <div className="card-footer">
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-block"
                        href={pageURL}>Ver Video</a>
                </div>
            </div>
        </div>
    );
}

Video.propTypes = {
    Video: PropTypes.object,
}
export default Video;