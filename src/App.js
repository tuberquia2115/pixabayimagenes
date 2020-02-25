import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario/Formulario';
import ListaImagenes from './components/ListaImagenes/ListaImagenes';
import ListaVideos from './components/ListaVideos/ListaVideos';


function App() {

  const [busqueda, guardarBusqueda] = useState('');
  const [busquedaTipo, guardarBusquedaTipo] = useState('');
  const [obteniendoImagenes, guardarObteniendoImagenes] = useState([]);
  const [obteniendoVideos, guardarObteniendoVideos] = useState([]);
  const [paginaActual, guardarPaginaActual] = useState(1);
  const [totalpaginas, guardarTotalPaginas] = useState(1);


  useEffect(() => {
    const consultarAPIImagenes = async () => {
      if (busqueda === '' || busquedaTipo === '') return;
      const imagenesPorPaginas = 30;
      const key = '15374706-fdced7bae7890a7ede538aace';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=
      ${imagenesPorPaginas}&page=${paginaActual}`;
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      guardarObteniendoImagenes(resultado.hits);
      // calcular el total de paginas
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPaginas);
      guardarTotalPaginas(calcularTotalPaginas);
      // mover la pantalla hace arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({ behavior: 'smooth' })
    }
    const consultarAPIVideos = async () => {
      if (busqueda === '' || busquedaTipo === '') return;
      const videosPorPaginas = 30;
      const key = '15374706-fdced7bae7890a7ede538aace';
      const url = `https://pixabay.com/api/videos/?key=${key}&q=${busqueda}&per_page=
      ${videosPorPaginas}&page=${paginaActual}`;
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      guardarObteniendoVideos(resultado.hits);
      console.log("resultado del llamado  a la api de videos", resultado)
      // calcular el total de paginas
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / videosPorPaginas);
      guardarTotalPaginas(calcularTotalPaginas);
      // mover la pantalla hace arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({ behavior: 'smooth' })
    }
    if (busquedaTipo === 'imagenes') {
      consultarAPIImagenes();
    } else {
      consultarAPIVideos();
    }

  }, [busqueda, paginaActual, busquedaTipo]);

  // definir la pagina anterior
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaActual - 1;
    if (nuevaPaginaActual === 0) return;

    guardarPaginaActual(nuevaPaginaActual);
  }
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaActual + 1;

    if (nuevaPaginaActual > totalpaginas) return;
    guardarPaginaActual(nuevaPaginaActual);
  }
  const renderizarComponents = (busquedaTipo) => {
    if (busquedaTipo === 'imagenes') {
      return <ListaImagenes imagenes={obteniendoImagenes} />
    } else if (busquedaTipo === 'videos') {
      return <ListaVideos videos={obteniendoVideos} />
    } else if (busquedaTipo === '') {
      return <p>Seleccione  la categoria</p>;
    }
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center"> Buscador de Imágenes y de Videos</p>
        <Formulario
          guardarBusqueda={guardarBusqueda}
          guardarBusquedaTipo={guardarBusquedaTipo}
        />
      </div>
      <div
        className="row justify-content-center">
        {renderizarComponents(busquedaTipo)}
        {(paginaActual === 1) ? null : (
          <button
            type="button"
            className="btn btn-info mr-1"
            onClick={paginaAnterior}
          >Anterior &laquo;</button>
        )}

        {(paginaActual === totalpaginas) ? null :
          (
            <button
              type="button"
              className="btn btn-info mr-1"
              onClick={paginaSiguiente}
            >Siguiente &raquo;</button>
          )
        }

      </div>
    </div>
  );
}

export default App;
