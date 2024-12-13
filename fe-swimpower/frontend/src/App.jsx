import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import 'animate.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/Homepage';
import Register from './pages/Register';
import NotFoundPage from './pages/NotFoundPage';
import User from './pages/User';
import Login from './pages/Login';
import InfoUser from './pages/InfoUser'
import { ProtectedRoute } from '../middleware/ProtectedRoutes';

const App = () => {


  return (

    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        <Route element={<ProtectedRoute/>} >
          <Route path='/user' element={<User />} />
          <Route path='/infoUser/:userId' element={<InfoUser />} />
        </Route>

        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>


  )
}

export default App
