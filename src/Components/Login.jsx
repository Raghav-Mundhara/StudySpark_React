import React from 'react';
import { auth } from '../firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LoginContainer = styled.div`
    text-align: center;
    padding: 20px;
`;

const Title = styled.h1`
    color: #007bff;
`;

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 300px;
    margin: auto;
`;

const Input = styled.input`
    margin-bottom: 15px;
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
`;

const Button = styled.button`
    padding: 12px;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
    font-size: 16px;
`;

const StyledLink = styled(Link)`
    margin-top: 15px;
    font-size: 14px;
    text-decoration: none;
    color: #007bff;

    &:hover {
        text-decoration: underline;
    }
`;
export default function Login() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const Register = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }

    return (
        <LoginContainer>
            <h1>Login</h1>
            <LoginForm>
                <Input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <Button onClick={Register}>Login</Button>
                <Link to="/register">Don't have an account? Register</Link>
            </LoginForm>
        </LoginContainer>
    )
}
