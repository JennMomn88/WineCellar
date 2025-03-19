import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuxContext';
import * as API from '../../services/ApiService';
import SearchBar from './SearchBar';

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarSlim, setSidebarSlim] = useState(true);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const { logout } = useAuthContext();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setSidebarSlim(!sidebarSlim);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  const handleLogout = () => {
    API.logout()
      .then(() => {
        logout();
        navigate('/login');
        setProfileMenuOpen(!profileMenuOpen);
      })
      .catch((error) => console.error(`Logout user fail: ${error}`));
  };

  return (
    <>
      {/* Navbar */}
      <header className="w-full bg-[#66031dff] text-white px-3 py-3 flex items-center fixed top-0 left-0 z-50">
        {/* Menu button */}
        <button className="text-white text-3xl mr-3" onClick={toggleSidebar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
            />
          </svg>
        </button>
        <SearchBar />

        {/* Profile dropdown */}
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

          {/* Menú desplegable */}
          {profileMenuOpen && (
            <ul className="absolute right-0 mt-2 w-40 bg-white text-black shadow-lg rounded-md">
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                <Link to="/profile">Perfil</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                <button onClick={handleLogout}>Cerrar sesión</button>
              </li>
            </ul>
          )}
        </div>
      </header>

      {/* Sidebar */}
      <nav
        className={`fixed left-0 top-16 min-h-screen bg-white dark:bg-gray-900 border-r border-gray-300 dark:border-gray-700 transition-all duration-300 ${
          sidebarOpen ? 'w-50' : 'w-20'
        }`}
        onMouseEnter={() => {
          setSidebarOpen(true);
          setSidebarSlim(false);
        }}
        onMouseLeave={() => {
          setSidebarOpen(false);
          setSidebarSlim(true);
        }}
      >
        <ul className="p-2 h-full flex flex-col gap-3">
          <li className="px-3 py-2 flex items-center gap-3 rounded-lg hover:bg-[#35470fff] hover:text-white dark:hover:bg-gray-700 mt-2">
            <Link to="/dashboard" className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z" />
              </svg>
              <span className={`${sidebarSlim ? 'hidden' : 'block'}`}>
                Dashboard
              </span>
            </Link>
          </li>
          <li className="px-3 py-2 flex items-center gap-3 rounded-lg hover:bg-[#35470fff] hover:text-white dark:hover:bg-gray-700">
            <Link to="/cellar" className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <g fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="m9.3,8.22v13.24c0,.78.43,1.1.97,1.1h3.47c.54,0,.97-.32.97-1.1v-13.24c0-.99-.55-1.54-1.23-1.54h-.36s-.06-.04-.06-.09V2.43c0-.55-.3-.99-.68-.99h-.67c-.37,0-.68.44-.68.99v4.16c0,.05-.03.09-.06.09h-.44c-.68,0-1.23.55-1.23,1.54Z"></path>
                  <path d="m17.44,8.67v11.01c0,.6.4.84.9.84h3.21c.5,0,.9-.24.9-.84v-11.01c0-.76-.51-1.18-1.14-1.18h-.33s-.06-.03-.06-.07v-3.18c0-.42-.28-.76-.63-.76h-.62c-.35,0-.63.34-.63.76v3.18s-.03.07-.06.07h-.41c-.63,0-1.14.42-1.14,1.18Z"></path>
                  <path d="m1.55,8.67v11.01c0,.6.4.84.9.84h3.21c.5,0,.9-.24.9-.84v-11.01c0-.76-.51-1.18-1.14-1.18h-.33s-.06-.03-.06-.07v-3.18c0-.42-.28-.76-.63-.76h-.62c-.35,0-.63.34-.63.76v3.18s-.03.07-.06.07h-.41c-.63,0-1.14.42-1.14,1.18Z"></path>
                </g>
              </svg>
              <span className={`${sidebarSlim ? 'hidden' : 'block'}`}>
                Cellar
              </span>
            </Link>
          </li>
          <li className="px-3 py-2 flex items-center gap-3 rounded-lg hover:bg-[#35470fff] hover:text-white dark:hover:bg-gray-700">
            <Link to="/analytics" className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M0 0h1v15h15v1H0zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07"
                />
              </svg>
              <span className={`${sidebarSlim ? 'hidden' : 'block'}`}>
                Analytics
              </span>
            </Link>
          </li>

          <li className="px-3 py-2 flex items-center gap-3 rounded-lg hover:bg-[#35470fff] hover:text-white dark:hover:bg-gray-700">
            <Link to="/winepage" className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="26px"
                height="26px"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path
                  fill="currentColor"
                  d="m13.67,14.97c2.62-.97,4.11-2.97,4.08-5.49-.05-2.12-.88-6.4-1.16-7.8l-.19-1H7.6l-.18.97c-.28,1.42-1.13,5.74-1.17,7.85,0,2.62,1.58,4.65,4.34,5.57.2.07.42.12.65.15v6.61h-1.76c-.41,0-.75.34-.75.75s.34.75.75.75h5.05c.41,0,.75-.34.75-.75s-.34-.75-.75-.75h-1.79v-6.62c.32-.05.63-.12.93-.23Zm1.49-12.79c.19.96.55,2.83.8,4.55,0,0,0,0,0-.01-.91-.26-2.27-.41-3.9.17-1.77.64-3.23.7-4.13.65.18-1.35.48-3.14.91-5.36h6.32Z"
                ></path>
              </svg>
              <span className={`${sidebarSlim ? 'hidden' : 'block'}`}>
                Winecellar Data
              </span>
            </Link>
          </li>

          <li className="px-3 py-2 flex items-center gap-3 rounded-lg hover:bg-[#35470fff] hover:text-white dark:hover:bg-gray-700">
            <Link to="/review" className="flex items-center gap-3">
              <svg
                data-hk="0000000100000a120a140000000011021000000007000a100a111260001000001101100"
                viewBox="0 0 24 24"
                width="28px"
                height="30px"
                class="w-6 h-6 "
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M18 18.72a9.1 9.1 0 0 0 3.741-.479q.01-.12.01-.241a3 3 0 0 0-4.692-2.478m.94 3.197l.001.031q0 .337-.037.666A11.94 11.94 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6 6 0 0 1 6 18.719m12 0a5.97 5.97 0 0 0-.941-3.197m0 0A6 6 0 0 0 12 12.75a6 6 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72a9 9 0 0 0 3.74.477m.94-3.197a5.97 5.97 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0a3 3 0 0 1 6 0m6 3a2.25 2.25 0 1 1-4.5 0a2.25 2.25 0 0 1 4.5 0m-13.5 0a2.25 2.25 0 1 1-4.5 0a2.25 2.25 0 0 1 4.5 0"
                ></path>
              </svg>

              <span className={`${sidebarSlim ? 'hidden' : 'block'}`}>
                Reviews
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
