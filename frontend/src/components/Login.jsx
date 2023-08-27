import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './login.css';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false);

    const navigate = useNavigate();        
   

    const doLogin = async (e) => {
        try {
            e.preventDefault();
            if(email.trim().length > 0 && password.trim().length > 0) {
               const formData = new FormData();
               formData.append("email", email);
               formData.append("password", password);
               const response = await axios.post("http://localhost:4500/loginUser", formData, {
                    headers: {
                        "Content-Type": "application/json"
                    }
               });
               const { email: loggedInEmail, token } = response.data;

               // Mostrar os dados no console
               console.log("Email:", loggedInEmail);
               console.log("Token:", token);
               navigate("/welcome");
               console.log();
            }else{
                alert("Prencha os campos")
            }
        }catch(err) {
            setError("Usuário ou senha inválidos");
            setShowError(true);
            setTimeout(() => {
                setShowError(false)
            }, 3000)
            
        }
    }

    return (
        <div>
            <div className="columns is-centered is-vh-100" id='form-login'>
            <div className="column is-one-third">
                <div className="box" id='form-box'>
                <h1 className="title is-4 has-text-centered ">Login</h1>
                    {showError && (
                        <div className="notification is-danger">
                            {error}
                        </div>
                    )}

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
                    </div>

                    <div className="field">
                    <div className="control">
                        <button className="button is-primary is-fullwidth" onClick={doLogin}>Entrar</button>
                    </div>
                    </div>
                    <p className="has-text-centered ">
                    Não possui uma conta? <Link to={'/cadastro'}>Cadastre-se</Link>
                    </p>
                </form>
                </div>
            </div>
            </div>
        </div>
    );
}

export default Login;
