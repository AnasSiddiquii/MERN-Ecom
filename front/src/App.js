import './App.css';
import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Signup from './components/Signup'
import Products from './components/Products'
import Add from './components/Add'
import Update from './components/Update'
import Protected from './components/Protected';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="App">
        <Routes>
        
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path="/*" element={<h2 className='text-center text-primary mt-4'>Page Not Found</h2>} />
        
          <Route element={<Protected />}>
            <Route path='/products' element={<Products />} />
            <Route path='/add' element={<Add />} />
            <Route path='/update/:id' element={<Update />} />
          </Route>
        
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
