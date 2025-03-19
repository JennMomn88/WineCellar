import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/navbar';

function DashboardLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default DashboardLayout;
