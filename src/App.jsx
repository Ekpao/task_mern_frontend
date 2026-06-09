
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' ;
import Login from './composants/Login' ;
import Register from './composants/Register' ;
import Dashboard from './composants/Dashboard' ;
import Header from './composants/Header' ;
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function App() {

  return (
    <>
      <Router>
        < Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    <ToastContainer/>
    </>
  )
}

export default App
