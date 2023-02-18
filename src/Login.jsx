import React from 'react'
import './App.css';
import {useState} from 'react';

export default function Login() {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    async function login() {
        console.log(userId, password)
        let item = {userId, password};
        let result = await fetch("http://localhost:8080/member/login", {
            method: 'POST',
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify(item)
        });
        result = await result.json();
        localStorage.setItem("user-info", JSON.stringify(result))
    }
    return (
        <div class="login">
            <div>
                <div class="input-box">
                    <div>아이디</div>
                    <div>
                        <input type="text" onChange={(e)=>setUserId(e.target.value)} />
                    </div>
                </div>
                <div class="input-box">
                    <div>비밀번호</div>
                    <div>
                        <input type="text" onChange={(e)=>setPassword(e.target.value)} />
                    </div>
                </div>
            </div>
            <div class="input-box center">
                <button onClick={login}>로그인하기</button>
            </div>
        </div>
    )
}