import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import {StudiosItemsList} from "./pages/StudiosItemsList"
import {StudiosItemCreate} from "./pages/StudiosItemCreate"
import {StudiosItemEdit} from "./pages/StudiosItemEdit"
import {StudiosItemShow} from "./pages/StudiosItemShow"

function App() {
  return(
    <Router>
      <Routes>
        <Route exact path="/"  element={<StudiosItemsList/>} />
        <Route path="/create"  element={<StudiosItemCreate/>} />
        <Route path="/edit/:id"  element={<StudiosItemEdit/>} />
        <Route path="/show/:id"  element={<StudiosItemShow/>} />
      </Routes>
    </Router>
  )
}

export default App;
