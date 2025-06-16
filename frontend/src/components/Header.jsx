// Header.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">EduFind</Link>

        <nav className="header-nav">
          {isLoggedIn ? (
            <>
              <div className="flex flex-wrap gap-4">
                <Link to="/" className="hover:underline">Home</Link>
                <Link to="/books" className="hover:underline">Books</Link>
                <Link to="/saved" className="hover:underline">Saved Books</Link> {/* ✅ 新增 */}
                <Link to="/dashboard" className="hover:underline">Dashboard</Link>
                <Link to="/countries" className="hover:underline">Countries</Link>
                <Link to="/wikipedia" className="hover:underline">Wikipedia</Link>
                <Link to="/universities" className="hover:underline">Universities</Link>
                <Link to="/saved-universities" className="hover:underline">Saved Universities</Link>
                <Link to="/profile" className="hover:underline">Profile</Link>
              </div>

              <button
                onClick={handleLogout}
                className="logout-button ml-4"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className="hover:underline">Register</Link>
              <Link to="/login" className="hover:underline">Login</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
