import { Routes, Route } from 'react-router-dom';
import './App.css';
import { ListaTareas } from './pages/ListaTareas.jsx';
import { TareasLocal } from './pages/TareasLocal.jsx';
const { TheCatAPI } = require("@thatapicompany/thecatapi");
const theCatAPI = new TheCatAPI("live_BIRxK2AtH5s2YF9DLCefqXGuhkTPMhz8HTro0lwn8kvkmzJ3l6CpNxVCH6GC9ZKB");


const App = () => {
  return (
     <>
        <Routes>
           <Route path="/" element={<ListaTareas />} />
           <Route path="/locales" element={<TareasLocal />} />
        </Routes>
     </>
  );
 };

export default App;
