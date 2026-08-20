// Main Libraries Import 
import { Routes, Route } from 'react-router-dom'

// File Import 
import Homepage from './pages/Homepage'
import Register from './pages/Register'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Homepage/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
    </Routes>
  )
}

export default App