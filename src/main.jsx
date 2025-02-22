import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './Login'
import SignUp from './SignUp'
import { BrowserRouter,Router,Route, Routes } from 'react-router-dom'
import Home from './Home'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<SignUp></SignUp>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
