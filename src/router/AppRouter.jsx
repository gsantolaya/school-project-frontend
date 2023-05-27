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
import { NewStudentScreen } from '../home/pages/NewStudentScreen';
import { MyStudentInformationScreen } from '../home/pages/MyStudentInformationScreen';
import { Error404Screen } from '../Error404Screen';
import { Welcome } from '../home/components/Welcome';
import { Footer } from '../home/components/Footer';


export const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <NavbarMenu />
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/aboutUs" element={<AboutUsScreen />} />
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<HomeScreen />}>
            <Route path="/home/administrativeStaff" element={<AdministrativeStaffScreen />} />
            <Route path="/home/students" element={<StudentsScreen />} />
            <Route path="/home/analytics" element={<AnalyticsScreen />} />
            <Route path="/home/payments" element={<PaymentsScreen />} />
            <Route path="/home/users" element={<UsersScreen />} />
            <Route path="/home/newStudent" element={<NewStudentScreen />} />
            <Route path="/home/myStudentInformation" element={<MyStudentInformationScreen />} />
          </Route>
          <Route path="*" element={<Error404Screen/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}