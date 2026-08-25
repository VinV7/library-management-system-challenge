// Main Libraries Import 
import { Routes, Route } from 'react-router-dom'

// File Import 
import Homepage from './pages/Homepage'
import Register from './pages/Register'
import Login from './pages/Login'
import MasterLibrary from './pages/MasterLibrary'
import Librarian from './pages/Librarian'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Homepage/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/master-library' element={<MasterLibrary/>}></Route>
      <Route path='/librarian' element={<Librarian/>}></Route>
    </Routes>
  )
}

export default App