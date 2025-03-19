import { Route, Routes } from 'react-router-dom';

import {
  LoginPage,
  HomePage,
  DashboardPage,
  CellarPage,
  ProfilePage,
  AnalyticsPage,
  RegisterPage,
  DashboardLayout,
  HomeLayout,
  ReviewPage,
  WineInfoPage,
  WinePage,
} from './pages';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegisterPage />} />
      </Route>
      <Route path="/" element={<DashboardLayout />}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="cellar" element={<CellarPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="review" element={<ReviewPage />} />
        <Route path="wine/:wineId" element={<WineInfoPage />} />
        <Route path="winepage" element={<WinePage />} />
      </Route>
    </Routes>
  );
}

export default App;
