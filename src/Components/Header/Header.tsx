import { Link } from 'react-router-dom';
import "./Header.css"

export const Header: React.FC = () => {
    return(<>
        <div className="header__container">
            <Link className="link" to="/login">Login</Link>
            <Link className="link" to="/logout">Logout</Link>
            <Link className="link" to="/register">Register</Link>
        </div>
    </>);
};