import React from 'react';
import Video from '../Video/Video';
import PropTypes from 'prop-types';

const ListaVideos = ({ videos }) => {
    return (
        <div className="col-12 p-5 row">
            {Array.isArray(videos) && videos.map(video => (
                <Video
                    key={video.id}
                    video={video}
                />
            ))}
        </div>
    );
}
ListaVideos.propTypes = {
    videos: PropTypes.array.isRequired,
}
export default ListaVideos;