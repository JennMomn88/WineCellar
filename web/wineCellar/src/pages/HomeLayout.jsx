import { Outlet } from 'react-router-dom';
import NavbarLanding from '../components/Navbar/NavbarLanding';

function HomeLayout() {
  return (
    <>
      <NavbarLanding />
      <Outlet />
    </>
  );
}

export default HomeLayout;
