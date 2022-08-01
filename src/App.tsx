import { HashRouter, Route, Routes } from "react-router-dom" // Use BrowsserRouter as Router for local dev
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import PrivateRoutes from "./components/HOC/PrivateRoutes";
import "./App.css"
function App() {
  return (
    <div className="App">
      <HashRouter> {/* Use Router here for local dev */}
        <Routes>
          <Route path='/' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoutes Component={Dashboard} />} />
        </Routes>        
      </HashRouter>
    </div>
    
  );
}

export default App;
