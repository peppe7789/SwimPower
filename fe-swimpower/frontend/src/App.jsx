import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';


const App = () => {


  return (
    
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<HomePage />} />

        </Routes>
      </BrowserRouter>
    

  )
}

export default App
