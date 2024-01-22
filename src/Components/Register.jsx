import React, { useState } from 'react';
import { auth } from '../firebase.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { collection, addDoc} from 'firebase/firestore';
import { getFirestore } from "firebase/firestore";
import { app } from '../firebase.js';
import { Input } from "@nextui-org/react";
import { Button } from '@nextui-org/react';
import {Select, SelectItem} from "@nextui-org/react";

const RegisterContainer = styled.div`
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


const RegisterForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 300px;
    width: 100%; /* Ensure LoginForm takes full width */
    margin-top: 20px; /* Adjust as needed */
    position: relative;

    z-index: 0;
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
export default function Register() {
    const [email, setEmail] = React.useState('raghav1@gmail.com');
    const [password, setPassword] = React.useState('test@1234');
    const [name, setName] = React.useState('Raghav');
    const [phone, setPhone] = React.useState('1234567890');

    const listSkills = [
        { id: 1, name: 'Firebase' },
        { id: 2, name: 'C++' },
        { id: 3, name: 'Java' },
        { id: 4, name: 'Python' },
        { id: 5, name: 'React' },
        { id: 6, name: 'HTML' },
        { id: 7, name: 'CSS' },
        { id: 8, name: 'JavaScript' },
        { id: 9, name: 'Node.js' },
        { id: 10, name: 'Express.js' },
    ]
    const [selectedSkills, setSelectedSkills] = useState([]);

    const Register = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log(user);
            const db = getFirestore(app);
            await addDoc(collection(db, "users"), {
                name: name,
                email: email,
                phone: phone,
                // skills: selectedSkills
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <RegisterContainer>
            <Title>Register</Title>
            <RegisterForm onSubmit={Register}>
                <StyledInput
                    label="Name"
                    variant="bordered"
                    color='primary'
                    className="max-w-xs"  onChange={(e) => setName(e.target.value)} />
                <StyledInput
                    label="Phone Number"
                    variant="bordered"
                    color='primary'
                    className="max-w-xs"  onChange={(e) => setPhone(e.target.value)} />
                <StyledInput
                    type="email"
                    label="Email"
                    variant="bordered"
                    color='primary'
                    className="max-w-xs mb-px" onChange={(e) => setEmail(e.target.value)} />
                <StyledInput
                    label="Password"
                    variant="bordered"
                    color='primary'
                    className="max-w-xs" type="password"  onChange={(e) => setPassword(e.target.value)} />
                <div className="flex w-full max-w-xs flex-col gap-2">
                    <Select
                        label="Skills"
                        selectionMode="multiple"
                        placeholder="Select your skills"
                        selectedKeys={selectedSkills}
                        className="max-w-xs"
                        variant='bordered'
                        color='primary'
                        onSelectionChange={setSelectedSkills}
                    >
                        {listSkills.map((skill) => (
                            <SelectItem key={skill.id} value={skill.name} >
                                {skill.name}
                            </SelectItem>
                        ))}
                    </Select>
                    
                </div>
                <br />
                <Button type="submit" variant='shadow' color="primary">Register</Button>
                <StyledLink to="/login">Already have an account? Login Now !</StyledLink>
            </RegisterForm>
        </RegisterContainer>
    );
}
