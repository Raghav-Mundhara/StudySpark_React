import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Card, CardHeader, CardBody, CardFooter, Avatar, Button, Divider } from "@nextui-org/react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { UserIcon } from './UserIcon';
import { Chip } from '@nextui-org/react';
import { Textarea } from '@nextui-org/react';
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
  let navigate = useNavigate();
  const auth = getAuth();

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

  return (
    <ProfileContainer>
      <Header>
        <Button
          color="primary"
          auto
          endContent={<UserIcon size={24} />}
          onClick={() => {
            auth.signOut();
            navigate("/");
          }}
        >
          Logout
        </Button>
      </Header>
      <ContentContainer>
        <Card
          className="min-w-full max-w-2xl"
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
                <Chip color="danger" style={{
                  marginRight: '10px',
                }}
                  variant='shadow'
                >
                  C++
                </Chip>
                <Chip color="primary" style={{
                  marginRight: '10px',
                }}
                  variant='shadow'
                >
                  Python
                </Chip>
                <Chip color="secondary" style={{
                  marginRight: '10px',
                }}
                  variant='shadow'
                >
                  Flutter
                </Chip>
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
                  <Textarea
                    isReadOnly
                    label="Project 1"
                    variant="bordered"
                    labelPlacement="outside"
                    defaultValue="lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation"
                    className="max-w-5xl"
                  />
                  <br />
                  <Textarea
                    isReadOnly
                    label="Project 2"
                    variant="bordered"
                    labelPlacement="outside"
                    defaultValue="Give a brief description of your project here."
                    className="max-w-5xl"
                  />
                  <br />
                  <Textarea
                    isReadOnly
                    label="Project 3"
                    variant="bordered"
                    labelPlacement="outside"
                    defaultValue="Give a brief description of your project here."
                    className="max-w-5xl"
                  />

                </ul>
              </CardBody>
            </Card>
          </CardBody>
          <CardFooter>
            <Button color="success">Edit Profile</Button>
          </CardFooter>
        </Card>
      </ContentContainer>
      <br />
    </ProfileContainer>
  );
};

export default Profile;
