import React, { useState } from 'react';
import './Header.css';

const Header = ({ userData, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="avatar-container">
          {userData?.avatar ? (
            <img src={userData.avatar} alt="Avatar" className="avatar" />
          ) : (
            <div className="level-icon">
              <p>{userData?.nivel}</p>
            </div>
          )}
        </div>

        <div className="user-info">
          <div className="user-name">{userData?.nome || 'Usuário'}</div>

          <div className="user-level">
            <p>R$:</p>
            <div className="level">
              {userData?.saldo ?? 0}
            </div>
          </div>
        </div>
      </div>

      <div className="header-right">
        <button
          className={`hamburger ${menuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {menuOpen && (
          <>
            <div className="menu-overlay" onClick={toggleMenu}></div>
            <div className="menu-dropdown">
              <button className="menu-item">Info</button>
              <button onClick={onLogout} className="menu-item logout">
                Sair
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
