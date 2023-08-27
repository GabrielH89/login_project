import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Cadastro() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [strongPassword, setStrongPassword] = useState("");

    const navigate = useNavigate();

    const insertUser = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        try {
            const regexEmail =  /^[a-zA-Z0-9._-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,4}$/; 
            const regexStrongPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/;
            if(email.trim().length > 0 && password.trim().length > 0){
                if(!regexEmail.test(email)){
                    alert("Insira um email válido");
                }else if(!regexStrongPassword.test(password)){
                    alert("Insira uma senha forte")
                }else{
                    await axios.post("http://localhost:4500/addUser", formData, {
                        headers: {
                            "Content-Type": "application/json",
                        }
                    });
                    navigate("/welcome");
                }  
            }else{
                alert("Preencha todos os campos");
            }
        }catch(err) {
            console.log("Error: " + err);
        }
    }

    return (
        <div>
            <div>
                <div className="columns is-centered is-vh-100" id='form-login'>
                <div className="column is-one-third">
                    <div className="box" id='form-box'>
                    <h1 className="title is-4 has-text-centered ">Cadastro</h1>

                    <form>
                        <div className="field">
                        <label className="label ">Email</label>
                        <div className="control">
                            <input className="input" type="email" 
                            value={email} onChange={(e) => setEmail(e.target.value)} 
                            placeholder="Seu email" />
                        </div>
                        </div>

                        <div className="field">
                        <label className="label ">Senha</label>
                        <div className="control">
                            <input className="input" type="password"
                            value={password} onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Sua senha" />
                        </div>
                        <p>A senha deve ter pelo menos 6 caracteres e incluir maiúsculuas, minúsculas, números e 
                            simbolos
                        </p>
                        </div>
                        <div className="field">
                        <div className="control">
                            <button className="button is-primary is-fullwidth" onClick={insertUser}>Entrar</button>
                        </div>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Cadastro