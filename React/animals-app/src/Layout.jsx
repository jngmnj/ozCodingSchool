import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import SearchForm from './components/SearchForm';

const Layout = () => {

  return (
    <>
      <header className='header'>
        <Link to="/"><h1>💚 동물 조아 💚</h1></Link>
        <SearchForm />
      </header>
      <main>
        <Outlet />
      </main>
      <footer className='footer'>all rights reserved to OZ</footer>
    </>
  );
}

export default Layout