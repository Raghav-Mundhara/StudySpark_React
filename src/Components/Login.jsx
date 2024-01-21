import React from 'react';
import { auth } from '../firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
const LoginContainer = styled.div`
    text-align: center;
    padding: 20px;
    margin: auto;
    border: 1px solid #007bff;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: black;
`;

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 300px;
    width: 100%; /* Ensure LoginForm takes full width */
    margin-top: 20px; /* Adjust as needed */
`;


const Title = styled.h1`
    color: #007bff;
    font-size: 30px;
`;

const StyledInput = styled(Input)`
    margin-bottom: 15px;
    input {
        color: white;
    }
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
            <Title>Login</Title>
            <LoginForm onSubmit={Register}>
                <StyledInput
                    type="email"
                    label="Email"
                    variant="bordered"
                    defaultValue="test@gmail.com"
                    color='primary'
                    className="max-w-xs mb-px" onChange={(e) => setEmail(e.target.value)} />
                <StyledInput
                    label="Password"
                    variant="bordered"
                    defaultValue="test@1234"
                    color='primary'
                    className="max-w-xs" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <Button type="submit" variant='shadow' color="primary">Login</Button>
            </LoginForm>
            <StyledLink to="/register">Don't have an account? Register</StyledLink>
        </LoginContainer>
    )
}
