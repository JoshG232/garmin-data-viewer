import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="home" element={<Home />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
