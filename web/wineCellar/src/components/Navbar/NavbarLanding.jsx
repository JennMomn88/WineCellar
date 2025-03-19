import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuxContext';
import * as API from '../../services/ApiService';

export default function Navbar() {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuthContext();

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  const handleLogout = () => {
    API.logout()
      .then(() => {
        logout();
        navigate('/login');
        setProfileMenuOpen(false);
      })
      .catch((error) => console.error(`Logout user fail: ${error}`));
  };

  return (
    <header className="w-full bg-[#65031dff] text-white px-6 py-3 flex items-center justify-between fixed top-0 left-0 z-50">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img src="/public/logo.png" alt="Logo" className="h-10 w-auto" />
      </Link>

      {/* icono */}
      <div className="relative">
        <button className="text-white text-3xl" onClick={toggleProfileMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path
              fillRule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
            />
          </svg>
        </button>

        {/* Login desplegable */}
        {profileMenuOpen && (
          <ul className="absolute right-0 mt-2 w-40 bg-white text-black shadow-lg rounded-md">
            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
              <Link to="/profile">Perfil</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
              <Link to="">Configuración</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
              <button onClick={handleLogout}>Cerrar sesión</button>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
}
