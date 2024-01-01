import React from 'react';
import { HashRouter, Route, Routes } from "react-router-dom";
import LoginForm from './Components/LoginForm';
import RegisterForm from './Components/RegisterForm';
import TaskBoard from './Components/TaskBoard';
import './App.css';
import Navbar from './Components/Navbar';

function App() {
return (
  <>
    <HashRouter >
      <Navbar />
      <Routes>
        <Route path="/" exact element={<TaskBoard />} />
        <Route path="/LoginForm"   element={<LoginForm />} />
        <Route path= "/RegisterForm" element={<RegisterForm />} />
      </Routes>
    </HashRouter>
  </>
  );
}
export default App;

