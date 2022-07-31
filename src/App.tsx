import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import PrivateRoutes from "./components/HOC/PrivateRoutes";
import "./App.css"
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoutes Component={Dashboard} />} />
        </Routes>        
      </Router>
    </div>
    
  );
}

export default App;
