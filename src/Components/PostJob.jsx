import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Input, Textarea } from '@nextui-org/react';
import styled from 'styled-components';
import Header1 from './Header1';
import { auth, db } from '../firebase.js';
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { ButtonGroup, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { ChevronDownIcon } from './ChevronDownIcon';
import axios from 'axios';
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
    const [budget, setBudget] = useState(0);
    const [services, setServices] = useState([]);
    const [selectedOption, setSelectedOption] = React.useState(["App"]);
    const selectedOptionValue = Array.from(selectedOption)[0];
    const [noofpages, setNoOfPages] = useState(0);

    const labelsMap = {
        App: "App",
        Website: "Website",
        Frontend: "Frontend",
        Backend: "Backend",
        Figma: "Figma",
        Docs: "Docs",
        PPT: "PPT",
    }


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

    const handleBugetChange = (e) => {
        var today = new Date();
        var days = Math.ceil(Math.abs(selectedDate - today) / 1000 / 60 / 60 / 24);
        const data={
            no_of_pages:noofpages,
            days:days,
            service:selectedOptionValue
        }
        axios.post('http://127.0.0.1:5000/getPrice',data)
        .then((res)=>{
            setBudget(res.data.price);
        })
        .catch((err)=>{
            console.log(err);
        })
        console.log(budget)
    };
    // Add a useEffect to log the updated skills after each render
    // useEffect(() => {
    //     console.log("Updated Skills:", skills);
    // }, [skills]);

    const onClick = async () => {
        try {
            // const user = auth.currentUser;
            // const userEmail = user.email;
            // await addDoc(collection(db, "jobs"), {
            //     client: userEmail,
            //     jobTitle: jobTitle,
            //     description: description,
            //     budget: budget,
            //     deadline: selectedDate,
            //     email: userEmail,
            //     skills: skills,
            //     service: selectedOptionValue
            // });
            alert("Job Posted Successfully")
            selectedDate(new Date());
            setSkills(['']);
            setJobTitle('');
            setDescription('');
            // setBudget('');
            // setDeadline('');
            // console.log(selectedOptionValue);
        } catch (error) {
            console.log(error + "onclick postjob");
            alert("Error in posting job");
        }
    }
    return (
        <div>
            <Header1 />
            <Container>
                <form>
                    <StyledInput isRequired label="Job Title" className="max-w-xs" onChange={(e) => {
                        setJobTitle(e.target.value);
                    }} />
                    <StyledTextarea isRequired label="Description" className="max-w-xs" onChange={(e) => {
                        setDescription(e.target.value);
                    }} />
                    <StyledInput isRequired label="Enter Number of Pages Required" className="max-w-xs" onChange={(e) => {
                        setNoOfPages(e.target.value);
                    }} />
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
                    <p
                        style={{
                            color: 'white',
                            marginBottom: '10px'
                        }}
                    >Price  : {budget}</p>
                    <Button
                        color='warning'
                        onClick={handleBugetChange}
                    >
                        Get Price
                    </Button>
                    <ButtonGroup variant="flat" style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button>{labelsMap[selectedOptionValue]}</Button>
                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <Button isIconOnly>
                                    <ChevronDownIcon />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Merge options"
                                selectedKeys={selectedOption}
                                selectionMode="single"
                                onSelectionChange={setSelectedOption}
                                className="max-w-[300px]"
                            >
                                <DropdownItem key="App">
                                    {labelsMap["App"]}
                                </DropdownItem>
                                <DropdownItem key="Website">
                                    {labelsMap["Website"]}
                                </DropdownItem>
                                <DropdownItem key="Frontend">
                                    {labelsMap["Frontend"]}
                                </DropdownItem>
                                <DropdownItem key="Backend">
                                    {labelsMap["Backend"]}
                                </DropdownItem>
                                <DropdownItem key="Figma">
                                    {labelsMap["Figma"]}
                                </DropdownItem>
                                <DropdownItem key="Docs">
                                    {labelsMap["Docs"]}
                                </DropdownItem>
                                <DropdownItem key="PPT">
                                    {labelsMap["PPT"]}
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </ButtonGroup>
                    <DeadlineContainer>
                        <DeadlineLabel>Deadline</DeadlineLabel>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => {
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
                        marginRight: "10%"
                    }}
                    onClick={onClick}
                >Post Job</Button>
            </Container>
        </div>
    );
}

export default PostJob;
