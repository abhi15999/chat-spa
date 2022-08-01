import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggler from "../ThemeToggler/ThemeToggler";
const Navbar = () => {
  let navigate = useNavigate();

  const [active, setActive] = useState(false);


  const logOutHandler = () => {
    localStorage.removeItem("userId");
    navigate("/login");
  };
  return (
<nav className="navbar" role="navigation" aria-label="main navigation">
  <div className="navbar-brand">
    <button className={`navbar-burger burger ${active ? 'is-active' : ''}`} aria-label="menu" aria-expanded="false" data-target="navMenu" onClick={() =>{
      setActive(!active);
    }}>
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>

  <div id="navMenu" className={`navbar-menu ${active ? 'is-active' : ''}`}>
    <div className="navbar-start">
      <div className="buttons">
        <button className="button navbar-item" onClick={() => navigate("/dashboard")}>
          Dashboard
        </button>

        <ThemeToggler />
      </div>
   
    </div>

    <div className="navbar-end">
      <div className="navbar-item">
        <div className="buttons">
          <button className="button is-light" onClick={logOutHandler}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  </div>
</nav>
  );
};

export default Navbar;
