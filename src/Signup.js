import React from 'react'
import './App.css';
import {useState} from 'react';

export default function Signup() {
    const [name, setName] = useState("");
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [telephone, setTelephone] = useState("");
    const [childName, setChildName] = useState("");
    async function signup() {
        console.log(name, userId, password, telephone, childName)
        let item = {name, userId, password, telephone, childName};
        let result = await fetch("http://localhost:8080/member/save", {
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
                    <div>이름</div>
                    <div>
                        <input type="text" onChange={(e)=>setName(e.target.value)} />
                    </div>
                </div>
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
                <div class="input-box">
                    <div>전화번호</div>
                    <div>
                        <input type="text" onChange={(e)=>setTelephone(e.target.value)} />
                    </div>
                </div>
                <div class="input-box">
                    <div>자녀의 이름</div>
                    <div>
                        <input type="text" onChange={(e)=>setChildName(e.target.value)} />
                    </div>
                </div>
            </div>
            <div class="input-box center">
                <button onClick={signup}>회원가입하기</button>
            </div>
        </div>
    )
}