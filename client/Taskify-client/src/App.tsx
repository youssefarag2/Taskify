import './App.css'
import { Routes, Route } from 'react-router-dom';

function App() {
  return (<Routes>
    <Route path='/login' element= {<h1>Login page placeholder</h1>}/>
    <Route path="/register" element={<h1>Register Page Placeholder</h1>} />
  </Routes>)
}

export default App
