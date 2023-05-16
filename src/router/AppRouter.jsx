import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomeScreen } from "../home/pages/HomeScreen";
import { AboutUsScreen } from "../home/pages/AboutUsScreen";
import { LoginScreen } from "../auth/pages/LoginScreen";
import { RegisterScreen } from "../auth/pages/RegisterScreen";
import { AdministrativeStaffScreen } from '../home/pages/AdministrativeStaffScreen';
import { StudentsScreen } from '../home/pages/StudentsScreen';
import { AnalyticsScreen } from '../home/pages/AnalyticsScreen';
import { PaymentsScreen } from '../home/pages/PaymentsScreen';
import { UsersScreen } from '../home/pages/UsersScreen';
import { NavbarMenu } from '../home/components/NavbarMenu';

export const AppRouter = () => {
  return (
    <BrowserRouter>
    <NavbarMenu/>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/aboutUs" element={<AboutUsScreen />} />
        <Route path="/" element={<HomeScreen />}>
          <Route path="/administrativeStaff" element={<AdministrativeStaffScreen />} />
          <Route path="/students" element={<StudentsScreen />} />
          <Route path="/analytics" element={<AnalyticsScreen />} />
          <Route path="/payments" element={<PaymentsScreen />} />
          <Route path="/users" element={<UsersScreen />} />
          </Route>
        {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
  )
}