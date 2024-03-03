import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Card, CardHeader, CardBody, CardFooter, Avatar, Button, Divider } from "@nextui-org/react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { UserIcon } from './UserIcon';
import { Chip } from '@nextui-org/react';
import { Textarea } from '@nextui-org/react';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import Header1 from './Header1';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: auto;
  background-color: black;
`;

const Header = styled.header`
  padding: 20px;
  text-align: right;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 50px;
  margin-right: 50px;
`;

const Profile = () => {
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userNumber, setUserNumber] = useState(null);
  const [userProjects, setUserProjects] = useState([]);
  let navigate = useNavigate();
  const auth = getAuth();
  const [skills, setSkills] = useState([]);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
        setUserName(user.displayName);
        setUserNumber(user.phoneNumber);
      } else {
        setUserEmail(null);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (userEmail == null) return;
    var docRef = doc(db, "users", userEmail);
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          var temp = docSnap.data().skills;
          console.log(temp);
          setSkills(temp);
          console.log(skills);
          temp=docSnap.data().projects;
          setUserProjects(temp);
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, [userEmail]);
  useEffect(() => {
    console.log("Updated skills:", skills);
    console.log("Updated projects:", userProjects);
  }, [skills, userProjects]);
  return (
    <ProfileContainer>
      <Header1></Header1>
      <br />
      <ContentContainer>
        <Card
          className="max-w-2xl"
          style={{
            margin: 'auto',
            padding: '20px',
            width: '90%',
          }}
        >
          <CardHeader>
            <Avatar size="large" src="https://i.imgur.com/1Qd0R2D.jpg" />
            <ul style={{
              marginLeft: '20px',
            }}>
              <li
                style={{
                  fontWeight: 'bold',
                }}
              >{userName}</li>
              <li
                style={{
                  fontWeight: 'bold',
                }}
              >{userEmail}</li>
            </ul>
          </CardHeader>
          <Divider />
          <CardBody>
            <Card
              className='max-w-fit'
            >
              <CardHeader
                style={{
                  fontWeight: 'bold',
                }}
              >Skills</CardHeader>
              <CardBody
                style={{
                  display: 'inline',
                }}
              >
                {
                  skills.length === 0 && (
                    <Chip
                      color="secondary"
                      style={{
                        marginRight: '10px',
                      }}
                      variant='shadow'
                    >
                      Loading....
                    </Chip>
                  )
                }
                {skills.map((skill) => (
                  <Chip color="secondary" style={{
                    marginRight: '10px',
                  }}
                    variant='shadow'
                  >
                    {skill}
                  </Chip>
                ))}
              </CardBody>
            </Card>
            <Divider
              style={{
                marginTop: '20px',
                marginBottom: '20px',
              }}
            />
            <Card>
              <CardHeader
                style={{
                  fontWeight: 'bold',
                }}
              >Projects</CardHeader>
              <CardBody>
                <ul>
                  {
                    userProjects.length === 0 ? (
                      <li>Loading...</li>
                    ) : 
                      userProjects.map((project) => (
                        <Textarea
                      isReadOnly
                      label={project.title}
                      variant="bordered"
                      labelPlacement="outside"
                      defaultValue={project.description}
                      className="max-w-5xl"
                    />
                      )
                    )
                  }
                  </ul>
                </CardBody>
              </Card>
            </CardBody>
            <CardFooter>
            <Link to="/editprofile"><Button color="success">Edit Profile</Button></Link>
            </CardFooter>
          </Card>
        </ContentContainer>
        <br />
      </ProfileContainer>
    );
  };
  
  export default Profile;
  