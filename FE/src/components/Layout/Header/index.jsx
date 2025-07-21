import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import styles from './Header.module.css';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    closeMobileMenu();
  };

  const navItems = [
    { path: '/', label: 'Trang Chủ' },
    { path: '/news', label: 'Tin Tức' },
    { path: '/services', label: 'Dịch Vụ' },
    { path: '/documents', label: 'Văn Bản' },
    { path: '/contact', label: 'Liên Hệ' },
    { path: '/about', label: 'Giới Thiệu' }
  ];

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerContent}>
          {/* Logo */}
          <div className={styles.logo}>
            <Link to="/" className={styles.logoLink}>
              THE GANG
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className={styles.navigation}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`${styles.navLink} ${isActive(item.path) ? styles.active : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Auth Section */}
          <div className={styles.authSection}>
            {isAuthenticated ? (
              <div className={styles.userMenu}>
                <span className={styles.userName}>
                  Xin chào, {user?.fullName || user?.email}
                </span>
                <button
                  onClick={handleLogout}
                  className={styles.logoutButton}
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <div className={styles.authButtons}>
                <Link to="/login" className={styles.loginButton}>
                  Đăng nhập
                </Link>
                <Link to="/register" className={styles.registerButton}>
                  Đăng ký
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={styles.mobileMenuButton}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>

          {/* Mobile Menu */}
          <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`${styles.mobileNavLink} ${isActive(item.path) ? styles.active : ''}`}
                onClick={closeMobileMenu}
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile Auth Section */}
            <div className={styles.mobileAuthSection}>
              {isAuthenticated ? (
                <>
                  <div className={styles.mobileUserInfo}>
                    Xin chào, {user?.fullName || user?.email}
                  </div>
                  <button
                    onClick={handleLogout}
                    className={styles.mobileLogoutButton}
                  >
                    Đăng xuất
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={styles.mobileLoginButton}
                    onClick={closeMobileMenu}
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    to="/register"
                    className={styles.mobileRegisterButton}
                    onClick={closeMobileMenu}
                  >
                    Đăng ký
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
