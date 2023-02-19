import React from 'react'
import './App.css';
import {useState} from 'react';

export default function Login() {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    async function login() {
        console.log(userId, password)
        let item = {userId, password};
        let result = await fetch("http://13.125.105.227:8080/member/login", {
            method: 'POST',
            body:JSON.stringify(item),
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
        }).then(res=>{
            console.log(res);
            //성공한 경우
            if(res.status === 200) {
                let loginForm = document.querySelector("#login");
                let loginSuccess = document.querySelector("#login-success");
                let loginSuccessMessage = document.querySelector("#login-success-message");

                loginForm.style.display = "none";
                loginForm.style.opacity = 0;
                loginSuccess.style.display = "block";
                loginSuccessMessage.style.display = "block";
            }
        })
        result = await result.json();
        localStorage.setItem("user-info", JSON.stringify(result))
    }
    return (
        <div>
            <div class="login">
                <div id="login">
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
            </div>
            <div>
                <h1 id="login-success" class="signup-success">로그인에 성공하였습니다!</h1>
                <div id="login-success-message" class="center login-complete">
                    <a class="nav-link" href="http://localhost:3000/">홈으로</a>
                </div>
            </div>
        </div>
    )
}