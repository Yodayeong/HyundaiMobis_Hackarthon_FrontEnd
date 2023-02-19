import React from 'react'
import './App.css';
import {useState} from 'react';

export default function Signup() {
    const [name, setName] = useState("");
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [telephone, setTelephone] = useState("");
    async function signup() {
        console.log(name, userId, password, telephone)
        let item = {name, userId, password, telephone};
        let result = await fetch("http://13.125.105.227:8080/manager/save", {
            method: 'POST',
            body: JSON.stringify(item),
            headers:{
                "Content-Type":"application/json",
            },
        }).then(res=>{
            console.log(res);
            //성공한 경우
            if(res.status === 200) {
                let signupForm = document.querySelector("#signup");
                let selectSignup = document.querySelector("#select-signup");
                let select = document.querySelector("#select");
                let signupSuccess = document.querySelector("#signup-success");

                signupForm.style.display = "none";
                signupForm.style.opacity = 0;
                selectSignup.style.display = "none";
                selectSignup.style.opacity = 0;
                select.style.display = "none";
                select.style.opacity = 0;
                signupSuccess.style.display = "block";
            }
        })
        result = await result.json();
        localStorage.setItem("user-info", JSON.stringify(result))
    }
    return (
        <div>
            <div id="signup" class="login">
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
                </div>
                <div class="input-box center">
                    <button onClick={signup}>회원가입하기</button>
                </div>
            </div>
            <div>
                <h1 id="signup-success" class="signup-success">회원가입에 성공하였습니다!</h1>
            </div>
        </div>
    )
}