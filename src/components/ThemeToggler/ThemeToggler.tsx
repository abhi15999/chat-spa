import { useState } from "react";
import { ThemeContext, themes } from "../../context/ThemeContext/ThemeContext";


const ThemeToggler = () => {
    const [darkMode, setDarkMode] = useState<boolean>(true);

    return (
        <ThemeContext.Consumer>
            {
                ({ changeTheme }) => (
                    <button
                        className="button is light"
                        onClick={(e) => {
                            e.preventDefault();
                            setDarkMode(!darkMode);
                            changeTheme(darkMode ? themes.light : themes.dark);
                        }}
                    >
                        <i className={darkMode ? 'fas fa-sun' : 'fas fa-moon'} />
                         <span className="d-lg-none d-md-block">Switch mode</span>
                    </button>
                )
            }
        </ThemeContext.Consumer>
    )
};

export default ThemeToggler;

