import React, { useState } from 'react';
import { auth } from '../firebase.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { collection, addDoc, getDoc, setDoc, doc } from 'firebase/firestore';
import { getFirestore } from "firebase/firestore";
import { app } from '../firebase.js';
import { Input } from "@nextui-org/react";
import { Button } from '@nextui-org/react';
import Select from 'react-select';

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

// const Select = styled.select`
//     margin-bottom: 15px;
//     padding: 10px;
//     width: 100%;
//     box-sizing: border-box;
// `;

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
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [phone, setPhone] = React.useState('');

    // const listSkills= ['Firebase','C++','Java','Python','React','HTML','CSS','JavaScript','Node.js','Express.js','MongoDB','SQL','NoSQL','C','C#','PHP','Ruby','Swift','Kotlin','Go','Rust','TypeScript','Angular','Vue','Django','Flask','Spring','Bootstrap','Tailwind','Material UI','SASS','LESS','jQuery','ASP.NET','Laravel','Ruby on Rails','Android','iOS','React Native','Flutter','Unity','Docker','Kubernetes','AWS','Azure','Google Cloud','Heroku','Netlify','Firebase','Git','GitHub','GitLab','BitBucket','Jira','Trello','Slack','Notion','Figma','Adobe XD','Sketch','InVision','Zeplin','Postman','Insomnia','VS Code','Sublime Text','Atom','Vim','Eclipse','IntelliJ','Android Studio','Xcode','Visual Studio','Vim','Emacs','Nano','Windows','MacOS','Linux','Ubuntu','iOS','Android','Windows','MacOS']
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

    const handleChange = (selectedOptions) => {
        setSelectedSkills(selectedOptions);
    };

    const options = listSkills.map((skill) => ({
        value: skill.id,
        label: skill.name,
    }));
    const Register = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log(user);
            const db = getFirestore(app);
            const docRef = await setDoc(doc(db, "users", email), {
                name: name,
                email: email,
                phone: phone,
                skills: selectedSkills,
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
                    defaultValue="Test"
                    color='primary'
                    className="max-w-xs" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                <StyledInput
                    label="Phone Number"
                    variant="bordered"
                    defaultValue="1234567890"
                    color='primary'
                    className="max-w-xs" placeholder="Phone Number" onChange={(e) => setPhone(e.target.value)} />
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
                <Select
                    isMulti
                    options={options}
                    value={selectedSkills}
                    onChange={handleChange}
                    placeholder="Select your skills..."
                    menuPortalTarget={document.body}
                    menuPosition='fixed'
                    styles={{
                        menu: provided => ({
                            ...provided,
                            zIndex: 9999,
                        }),
                    }}
                />
                <br />
                <Button type="submit" variant='shadow' color="primary">Register</Button>
                <StyledLink to="/login">Already have an account? Login Now !</StyledLink>
            </RegisterForm>
        </RegisterContainer>
    );
}
