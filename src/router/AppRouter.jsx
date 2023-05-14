import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomeScreen } from "../home/pages/HomeScreen";
import { AboutUsScreen } from "../home/pages/AboutUsScreen";
import { LoginScreen } from "../auth/pages/LoginScreen";
import { RegisterScreen } from "../auth/pages/RegisterScreen";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/aboutUs" element={<AboutUsScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
      </Routes>
    </BrowserRouter>
  )
}