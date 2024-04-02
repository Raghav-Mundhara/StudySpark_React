import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, Button, Textarea, Divider } from "@nextui-org/react";
import styled from 'styled-components';
import { db } from '../firebase';
import { collection, addDoc, getDoc, getDocs, setDoc, doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import Header1 from './Header1';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: auto;
  align-items: center;
  justify-content: center;
  background-color: black;
`;

const EditProfile = () => {
  let navigate = useNavigate();
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [phoneNumber, setPhoneNumber] = useState("123-456-7890");
  const [projects, setProjects] = useState([
    { title: "Project 1", description: "This is a sample project description 1" },
    { title: "Project 2", description: "This is a sample project description 2" },
    { title: "Project 3", description: "This is a sample project description 3" },
  ]);
  const [skills, setSkills] = useState(["Sample skills"]);

  const handleSave = async () => {
    try {
      const userDocRef = doc(db, "users", email); // Reference to the user document
      await updateDoc(userDocRef, {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        skills: skills,
        projects: projects.map((project) => ({
          title: project.title,
          description: project.description,
        })),
      }, { merge: true });
      

      navigate('/profile');
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddProject = () => {
    setProjects([...projects, { title: `Project ${projects.length + 1}`, description: "" }]);
  };

  const handleDeleteProject = (index) => {
    const updatedProjects = [...projects];
    updatedProjects.splice(index, 1);
    setProjects(updatedProjects);
  };

  const handleProjectTitleChange = (index, newTitle) => {
    const updatedProjects = [...projects];
    updatedProjects[index].title = newTitle;
    setProjects(updatedProjects);
  };


  const handleAddSkill = () => {
    setSkills([...skills, ""]);
  };

  const handleDeleteSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  const handleProjectDescriptionChange = (index, newDescription) => {
    const updatedProjects = [...projects];
    updatedProjects[index].description = newDescription;
    setProjects(updatedProjects);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setName(user.displayName);
      setEmail(user.email);
      setPhoneNumber(user.phoneNumber);
      try {
        const docRef = doc(db, "users", user.email);
        getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
            var temp = docSnap.data().skills;
            setSkills(temp);
            temp = docSnap.data().projects;
            setProjects(temp);
            temp=docSnap.data().phoneNumber;
            setPhoneNumber(temp);
          } else {
            console.log("No such document!");
          }
        })
      } catch (error) {
        console.log("Error getting document:", error);
      }

    });
    return () => unsubscribe();
  }, [])
  return (
    <Container>
      <Header1 />
      <Card className="max-w-3xl" style={{ margin: 'auto', marginTop: '50px', width: '70%' }}>
        <CardHeader style={{ fontWeight: 'bold' }}>Edit Profile</CardHeader>
        <CardBody>
          <Card
            className="max-w-3xl"
            style={{
              margin: 'auto',
              padding: '20px',
              width: '100%',
            }}
          >
            <label
              style={{
                display: 'block',
                fontSize: '16px',
              }}
            >Name:</label>
            <input
              type="text"
              style={{ display: 'block', width: '100%', padding: '10px', margin: '5px 0', border: '1px solid #ccc', borderRadius: '4px' }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label
              style={{
                display: 'block',
                fontSize: '16px',
              }}
            >Phone Number:</label>
            <input
              type="tel"
              style={{ display: 'block', width: '100%', padding: '10px', margin: '5px 0', border: '1px solid #ccc', borderRadius: '4px' }}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Card>

          <label
            style={{
              display: 'block',
              fontSize: '16px',
              marginTop: '20px',
              marginBottom: '20px',
              fontWeight: 'bold',
            }}
          >Projects</label>
          <Card
            className="max-w-3xl"
            style={{
              margin: 'auto',
              padding: '20px',
              width: '100%',
            }}
          >
            {projects.map((project, index) => (
              <div key={index}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '16px',
                      marginRight: '10px',
                      fontWeight: 'bold',
                    }}
                  >Title:</label>
                  <input
                    type="text"
                    style={{ width: '80%', padding: '10px', margin: '5px 0', border: '1px solid #ccc', borderRadius: '4px' }}
                    value={project.title}
                    onChange={(e) => handleProjectTitleChange(index, e.target.value)}
                  />
                  <Button color="danger" onClick={() => handleDeleteProject(index)} style={{ marginLeft: '10px' }}>
                    Delete Project
                  </Button>
                </div>
                <Textarea
                  label={<span style={{ fontWeight: 'bold' }}>Description</span>}
                  variant="bordered"
                  labelPlacement="outside"
                  value={project.description}
                  onChange={(e) => handleProjectDescriptionChange(index, e.target.value)}
                  className="max-w-5xl"
                />

                <Divider
                  style={{
                    marginTop: '20px',
                    marginBottom: '20px',
                  }}
                ></Divider>
              </div>
            ))}

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button color="success" onClick={handleAddProject} style={{ width: '120px', margin: '0 10px' }}>
                Add Project
              </Button>
            </div>
          </Card>

          <label
            style={{
              display: 'block',
              fontSize: '16px',
              marginTop: '20px',
              marginBottom: '20px',
              fontWeight: 'bold',
            }}
          >Skills</label>
          <Card
            className="max-w-3xl"
            style={{
              margin: 'auto',
              padding: '20px',
              width: '100%',
            }}
          >
            {skills.map((skill, index) => (
              <div key={index}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="text"
                    style={{ width: '80%', padding: '10px', margin: '5px 0', border: '1px solid #ccc', borderRadius: '4px' }}
                    value={skill}
                    onChange={(e) => {
                      const updatedSkills = [...skills];
                      updatedSkills[index] = e.target.value;
                      setSkills(updatedSkills);
                    }}
                  />
                  <Button color="danger" onClick={() => handleDeleteSkill(index)} style={{ marginLeft: '10px' }}>
                    Delete Skill
                  </Button>
                </div>
                <br />
              </div>
            ))}

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button color="success" onClick={handleAddSkill} style={{ width: '120px', margin: '10px 0' }}>
                Add Skill
              </Button>
            </div>
          </Card>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <Button color="success" style={{ fontSize: '16px', padding: '5px 5px', width: '120px' }} onClick={handleSave}>
              Save
            </Button>
            <Button color="danger" style={{ fontSize: '16px', padding: '5px 5px', width: '120px',marginLeft:'10px'}} onClick={handleSave}>
              Cancel
            </Button>
          </div>
        </CardBody>
      </Card>
    </Container>
  );
};

export default EditProfile;
