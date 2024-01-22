import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Card, CardHeader, CardBody, CardFooter, Avatar, Button } from "@nextui-org/react";
import {getAuth ,onAuthStateChanged} from "firebase/auth";
import { useNavigate } from 'react-router-dom';
// import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link , NavbarMenuItem ,NavbarMenu ,NavbarMenuToggle} from "@nextui-org/react";
// import {AcmeLogo} from "./AcmeLogo.jsx";
const ProfileContainer = styled.div`
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

const Profile = () => {
  const [userEmail, setUserEmail] = useState(null);
  const [userName , setUserName] = useState(null);
  const [userNumber , setUserNumber] = useState(null);
  let navigate = useNavigate();
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserEmail(user.email);
      setUserName(user.displayName);
      setUserNumber(user.phoneNumber);
    } else {
      setUserEmail(null);
    }
  });

  return (
    <ProfileContainer>
      <header>
        <Button
          color="primary"
          auto
          onClick={() => {
            auth.signOut();
            navigate("/");
          }}
        >
          Logout
        </Button>
      </header>
      <Card>
        <CardHeader>
          <Avatar size="large" src="https://i.imgur.com/1Qd0R2D.jpg" />
          <p>{userName}</p>
        </CardHeader>
        <CardBody>
          <p>Email: {userEmail}</p>
          <p>Phone Number: {userNumber}</p>
        </CardBody>
        <CardFooter>
          <Button color="success">Edit Profile</Button>
        </CardFooter>
      </Card>
    </ProfileContainer>
    
  );
};

export default Profile;
