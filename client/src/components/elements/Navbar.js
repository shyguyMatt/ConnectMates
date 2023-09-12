import {
    FaAngleLeft,
    FaAngleRight,
    FaBars,
    FaGithubAlt,
    FaHome,
    FaReadme,
    FaRegUser,
    FaTerminal,
    FaTree
} from 'react-icons/fa';
import { NavLink } from "react-router-dom";
import './../../styles/navbar.css';

const ICON_SIZE = 20;

function Navbar({ visible, show }) {

    return (
        <>
            <div className="mobile-nav">
                <button
                    className="mobile-nav-btn"
                    onClick={() => show(!visible)}
                >
                    <FaBars size={24} />
                </button>
            </div>
            <nav className={!visible ? 'navbar' : ''}>
                <button
                    type="button"
                    className="nav-btn"
                    onClick={() => show(!visible)}
                >
                    {!visible
                        ? <FaAngleRight size={30} /> : <FaAngleLeft size={30} />}
                </button>
                <div>
                    <NavLink
                        className="logo"
                        to="https://github.com/"
                    >
                        <img
                            src={require('./../../assets/images/logo1.png')}
                            alt="logo"
                        />
                    </NavLink>
                    <div className="links nav-top">
                        <NavLink to="/xpagename" className="nav-link">
                            <FaReadme size={ICON_SIZE} />
                            <span className="font"></span>
                        </NavLink>
                        <NavLink to="/" className="nav-link">
                            <FaTree size={ICON_SIZE} />
                            <span className="font"></span>
                        </NavLink>

                    </div>
                </div>

                <div className="links">
                    <NavLink to="/about" className="nav-link">
                        <FaHome size={ICON_SIZE} />
                        <span className="font">Home</span>
                    </NavLink>
                    <NavLink to="" className="nav-link">
                        <FaGithubAlt size={ICON_SIZE} />
                        <span className="font">Github</span>
                    </NavLink>
                    <div>
                        <NavLink to="/contact" className="nav-link">
                            <FaTerminal size={ICON_SIZE} />
                            <span className="font">Contact</span>
                        </NavLink>
                    </div>
                </div>
            </nav >
        </>
    );
}

export default Navbar;