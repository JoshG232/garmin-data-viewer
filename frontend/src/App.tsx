
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import MainLayout from './components/MainLayout'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<div>Activities Page</div>} />
          <Route path="/about" element={<div>About Page</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
