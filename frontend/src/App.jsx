import { Box } from "@chakra-ui/react"
import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/Home"
import AddPage from "./pages/Add"
import Header from "./components/Header"


function App() {

  return (
    <Box minH="100vh" bg="gray.100" p={4}>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="add" element={<AddPage />} />
      </Routes>
    </Box>
  )
}

export default App
