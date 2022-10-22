import React from 'react';
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import { useAppContext } from './context/AppContext';

function App() {
  const { user } = useAppContext()
  return (
    <Routes>
      {user ?
        <>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </>
        :
        <Route path="*" element={<Login />} />
      }
    </Routes>

  );
}

export default App;
