import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './Layout';
import Detail from './page/Detail';
import Main from './page/Main';
import Search from './page/Search';

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/search" element={<Search />} />
        </Route>
      </Routes>
    </>
  );
}

export default App
