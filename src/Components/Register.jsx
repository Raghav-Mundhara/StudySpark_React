import React , {useState} from 'react';
import { auth } from '../firebase.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {collection , addDoc , getDoc , setDoc ,doc} from 'firebase/firestore';
import { getFirestore } from "firebase/firestore";
import {app} from '../firebase.js';
const Container = styled.div`
    text-align: center;
    padding: 20px;
`;

const Title = styled.h1`
    color: #333;
`;

const Select = styled.select`
    margin-bottom: 15px;
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
`;

const Form = styled.form`
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
    padding: 12px 24px;
    background-color: #333;
    color: #fff;
    border: none;
    cursor: pointer;
    font-size: 16px;
`;

const StyledLink = styled(Link)`
    margin-top: 15px;
    font-size: 14px;
    text-decoration: none;
    color: #333;

    &:hover {
        text-decoration: underline;
    }
`;

export default function Register() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [selectedSkills, setSelectedSkills] = useState([]);

    // const listSkills= ['Firebase','C++','Java','Python','React','HTML','CSS','JavaScript','Node.js','Express.js','MongoDB','SQL','NoSQL','C','C#','PHP','Ruby','Swift','Kotlin','Go','Rust','TypeScript','Angular','Vue','Django','Flask','Spring','Bootstrap','Tailwind','Material UI','SASS','LESS','jQuery','ASP.NET','Laravel','Ruby on Rails','Android','iOS','React Native','Flutter','Unity','Docker','Kubernetes','AWS','Azure','Google Cloud','Heroku','Netlify','Firebase','Git','GitHub','GitLab','BitBucket','Jira','Trello','Slack','Notion','Figma','Adobe XD','Sketch','InVision','Zeplin','Postman','Insomnia','VS Code','Sublime Text','Atom','Vim','Eclipse','IntelliJ','Android Studio','Xcode','Visual Studio','Vim','Emacs','Nano','Windows','MacOS','Linux','Ubuntu','iOS','Android','Windows','MacOS']
    const listSkills = [
        {id: 1, name: 'Firebase'},
        {id: 2, name: 'C++'},
        {id: 3, name: 'Java'},
        {id: 4, name: 'Python'},
        {id: 5, name: 'React'},
        {id: 6, name: 'HTML'},
        {id: 7, name: 'CSS'},
        {id: 8, name: 'JavaScript'},
        {id: 9, name: 'Node.js'},
        {id: 10, name: 'Express.js'},

    ]

    const Register =async (e) => {
        e.preventDefault();
        try{
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log(user);
            const db = getFirestore(app);
            const docRef = await setDoc(doc(db, "users",email), {
                name: name,
                email: email,
                phone: phone,
                skills: selectedSkills,
            });
        }catch(error){
            console.log(error);
        }
    }

    return (
        <Container>
            <Title>Register</Title>
            <Form>
                <Input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <Input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                <Input type="text" placeholder="Phone" onChange={(e) => setPhone(e.target.value)} />
                <Select
                    multiple
                    value={selectedSkills}
                    onChange={(e) => setSelectedSkills(Array.from(e.target.selectedOptions, (option) => option.value))}
                >
                    {listSkills.map((skill) => (
                        <option key={skill.id} value={skill.name}>
                            {skill.name}
                        </option>
                    ))}
                </Select>
                <Button onClick={Register}>Register</Button>
                <Link to="/login">Already have an account? Login</Link>
            </Form>
        </Container>
    );
}
