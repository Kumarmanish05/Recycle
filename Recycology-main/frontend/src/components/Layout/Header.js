import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaLeaf } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-mark">
            <FaLeaf />
          </span>
          <div className="logo-copy">
            <span className="logo-kicker">Circular Living Studio</span>
            <h1>Recycology</h1>
            <p>AI-guided reuse ideas, community builds, and smarter waste habits.</p>
          </div>
        </Link>
        <nav className="nav">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
              <Link to="/create-post" className="nav-link">
                Create Post
              </Link>
              {user?.role === 'admin' && (
                <Link to="/admin/retry" className="nav-link">
                  Logs & Errors
                </Link>
              )}
              <span className="user-name">Hi, {user?.name}</span>
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link btn-primary">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
