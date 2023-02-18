import React from 'react'
import './App.css';
import Signup from "./Signup";
import SignupManager from "./SignupManager"
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

export default function SelectSignup() {

    return (
        <BrowserRouter>
            <div class="center">
                <Link class="nav-link input-box" to="/signup/manager">관리자로 회원가입</Link>
                <Link class="nav-link input-box" to="/signup/parents">학부모로 회원가입</Link>    
            </div>    

            <Routes>
                <Route path="/signup/manager" element={<SignupManager />}></Route>
                <Route path="/signup/parents" element={<Signup />}></Route>
            </Routes>
        </BrowserRouter>
    )
}