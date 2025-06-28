import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../index.css';

export default function NavBar() {
  const location = useLocation(); // Get the current location

  return (
    <nav>
      <Link
        to="/"
        className={location.pathname === '/' ? 'inactive-link' : 'active-link'}
      >
        Admin
      </Link>{' '}
      |{' '}
      <Link
        to="/view"
        className={location.pathname === '/view' ? 'inactive-link' : 'active-link'}
      >
        Public
      </Link>
    </nav>
  );
}