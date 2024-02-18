import React, { useState , useEffect} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Input, Textarea } from '@nextui-org/react';
import styled from 'styled-components';
import Header1 from './Header1';
import { auth ,db} from '../firebase.js';
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    margin: auto;
    align-items: center;
    justify-content: center;
    background-color: black;
`;

const StyledInput = styled(Input)`
    margin-bottom: 10px;
    width: 300px;
`;

const StyledTextarea = styled(Textarea)`
    margin-bottom: 10px;
    width: 300px;
`;

const DeadlineContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px; 
`;

const DeadlineLabel = styled.label`
    color: white;
    margin-right: 25px;
`;

const SkillsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; 
`;

const SkillRow = styled.div`
    display: flex;
    align-items: center; 
    margin-bottom: 10px;
`;

const AddSkillsButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10px;
`;

const AddSkillsButton = styled(Button)`

    margin-right: 25%;
    margin-bottom: 10px;
`;

const DeleteSkillsButton = styled(Button)`
    margin-left: 10px;
`;

function PostJob() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [skills, setSkills] = useState(['']);
    const [jobTitle, setJobTitle] = useState('');
    const [description, setDescription] = useState('');
    const [budget, setBudget] = useState('');
    const [deadline, setDeadline] = useState('');
    

    const handleAddSkillsField = () => {
        setSkills(prevSkills => [...prevSkills, '']);
    };
    

    const handleDeleteSkillsField = (index) => {
        const updatedSkills = skills.filter((_, i) => i !== index);
        setSkills(updatedSkills);
    };

    const handleSkillsChange = (index, value) => {
        setSkills(prevSkills => {
            const updatedSkills = [...prevSkills];
            updatedSkills[index] = value;
            return updatedSkills;
        });
    };
    
    // Add a useEffect to log the updated skills after each render
    useEffect(() => {
        console.log("Updated Skills:", skills);
    }, [skills]);
    
    const onClick=async ()=>{
        try {
            const user=auth.currentUser;
            const userEmail=user.email;
            await addDoc(collection(db,"jobs"),{
                client:userEmail,
                jobTitle:jobTitle,
                description:description,
                budget:budget,
                deadline:selectedDate,
                email:userEmail,
                skills:skills,
            });
            alert("Job Posted Successfully")
            selectedDate(new Date());
            setSkills(['']);
            setJobTitle('');
            setDescription('');
            setBudget('');
            setDeadline('');

        } catch (error) {
            console.log(error+"onclick postjob");
        }
    }
    return (
        <div>
            <Header1 />
            <Container>
                <form>
                    <StyledInput isRequired label="Job Title" className="max-w-xs" onChange={(e)=>{
                        setJobTitle(e.target.value);
                    }} />
                    <StyledTextarea isRequired label="Description"  className="max-w-xs" onChange={(e)=>{
                        setDescription(e.target.value);
                    }}/>
                    <SkillsContainer>
                        {skills.map((skill, index) => (
                            <SkillRow key={index}>
                                <StyledInput
                                    isRequired
                                    label={`Skill ${index + 1}`}
                                    value={skill}
                                    onChange={(e) => handleSkillsChange(index, e.target.value)}
                                    className="max-w-xs"
                                />
                                <DeleteSkillsButton color="danger" onClick={() => handleDeleteSkillsField(index)}>
                                    Delete
                                </DeleteSkillsButton>
                            </SkillRow>
                        ))}
                    </SkillsContainer>

                    <AddSkillsButtonContainer>
                        <AddSkillsButton color='primary' onClick={handleAddSkillsField}>
                            Add Skills Field
                        </AddSkillsButton>
                    </AddSkillsButtonContainer>

                    <StyledInput isRequired label="Budget" className="max-w-xs" type="number" onChange={(e)=>{
                        setBudget(e.target.value);
                    }} />

                    <DeadlineContainer>
                        <DeadlineLabel>Deadline</DeadlineLabel>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date)=>{
                                setSelectedDate(date);
                            }}
                            dateFormat="dd-MM-yyyy"
                            className="max-w-xs"
                            required
                        />
                    </DeadlineContainer>
                </form>
                <Button
                    color='success'
                    style={{
                        marginRight:"10%"
                    }}
                    onClick={onClick}
                >Post Job</Button>
            </Container>
        </div>
    );
}

export default PostJob;
