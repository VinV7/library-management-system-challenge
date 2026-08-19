// Main Libraries Import 
import { Routes, Route } from 'react-router-dom'

// File Import 
import Homepage from './pages/Homepage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Homepage/>}></Route>
    </Routes>
  )
}

export default App