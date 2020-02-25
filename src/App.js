import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario/Formulario';
import ListaImagenes from './components/ListaImagenes/ListaImagenes';


function App() {

  const [busqueda, guardarBusqueda] = useState('');
  const [obteniendoImagenes, guardarObteniendoImagenes] = useState([]);
  const [paginaActual, guardarPaginaActual] = useState(1);
  const [totalpaginas, guardarTotalPaginas] = useState(1);


  useEffect(() => {
    const consultarAPI = async () => {
      if (busqueda === '') return;
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
    consultarAPI();

  }, [busqueda, paginaActual]);

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
  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center"> Buscador de Imágenes</p>
        <Formulario
          guardarBusqueda={guardarBusqueda}
        />
      </div>
      <div
        className="row justify-content-center">
        <ListaImagenes imagenes={obteniendoImagenes}
        />
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
