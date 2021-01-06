import React from 'react';

import '../css/pages/Home.css';

import Image from '../img/img2.png';

const Home = () => {

  return (
    <div className="div-home">
      <h1>Todo List</h1>

      <p>Seleccione una Tarea...</p>
      <img 
        src={Image}
        alt="Inicio"
      />
    </div>
  );
}

export default Home;