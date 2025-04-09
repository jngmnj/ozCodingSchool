import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <header className='header'>
        <h1>💚 동물 조아 💚</h1>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>all rights reserved to OZ</footer>
    </>
  );
}

export default Layout