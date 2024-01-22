import React from 'react'
import styled from 'styled-components';
// import { Avatar } from '@nextui-org/react';
import {Card, CardHeader, CardBody, CardFooter, Avatar, Button} from "@nextui-org/react";
// import { getDocs } from 'firebase/firestore';

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
export default function Profile() {

  return (
    <ProfileContainer>
      <Card>
        <CardHeader>
          <Avatar size="large" src="https://i.imgur.com/1Qd0R2D.jpg" />
          <p>Username</p>
        </CardHeader>
        <CardBody>
          <p>email</p>
          <p>bio</p>
        </CardBody>
        <CardFooter>
          <Button color="success">Edit Profile</Button>
        </CardFooter>
      </Card>
    </ProfileContainer>
  )
}
