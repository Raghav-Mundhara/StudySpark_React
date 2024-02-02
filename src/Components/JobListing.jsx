import React from 'react';
import { Card, CardBody, CardFooter, Chip, Image } from "@nextui-org/react";
import Header1 from './Header1';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faFileAlt, faCode,faHeart } from '@fortawesome/free-solid-svg-icons'; 
import {auth} from '../firebase.js';
import { useNavigate } from 'react-router';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: auto;
  background-image: url("/images/programming.avif");
  background-size: cover;
  background-position: center;
`;
const CardHeader = ({ title, icon }) => (
  <div className="text-lg font-semibold mb-2 flex items-center" style={{ fontSize: "1.5rem", fontWeight: "bold",fontFamily: 'Times New Roman' }}>
    {icon && <FontAwesomeIcon icon={icon} className="mr-2" />} {/* Display the provided icon */}
    <span>{title}</span>
    <FontAwesomeIcon icon={faHeart} className="ml-auto text-red-500" /> {/* Display the red heart icon on the right */}
  </div>
);

function JobListing() {
  let navigate = useNavigate();

  const list = [
    {
      title: "Craft a Comprehensive Case Study on Sensors and Actuators",
      desc: "Seeking a skilled freelancer to conduct in-depth research and create a compelling case study exploring the intricate world of Sensors and Actuators.",
      price: "Hourly $5-$10",
      skills: "Electronics, Sensors, Actuators",
      icon: faBook , 
    },
    {
      title: "Develop an Informative PPT on AI-ML in Healthcare",
      desc: "Looking for a talented freelancer to create a visually engaging PowerPoint presentation focused on the transformative impact of Artificial Intelligence and Machine Learning in the healthcare sector.",
      price: "Hourly $3-$7",
      skills: "AI, ML, Healthcare",
      icon: faFileAlt, 
    },
    {
      title: "Web Development",
      desc: "Looking for a talented freelancer to create a backend for my Website.",
      price: "Hourly $15-$20",
      skills: "Django, Flask",
      icon: faCode, 
    },
  ];

  return (
    <Container>
      <Header1 />
      <div
        className="gap-2 grid grid-cols-2 sm:grid-cols-4"
        style={{
          margin: "auto",
        }}
      >
        {list.map((item, index) => (
          <Card
            shadow="sm"
            key={index}
            isPressable
            onPress={() =>navigate('/Jobpage')}
            style={{
              marginTop: "20px",
              width: "700px",
              height: "250px",
              margin: "10px",
              padding: "20px",
              backgroundImage: `url(${"images/orange.jpg"})`, 
              backgroundSize: "cover",
            }}
          >
            <CardHeader title={item.title} icon={item.icon} style={{ fontFamily: 'Times New Roman' }}></CardHeader>

            <CardBody className="overflow-visible p-0">
            <p style={{ fontSize: "1.2rem" }}>{item.desc}</p>
              <Chip color="success" className="mt-2">
                {item.skills}
              </Chip>
            </CardBody>

            <CardFooter>
              <div className="flex justify-between">
                <div className="text-sm">{item.price}</div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Container>
  );
}

export default JobListing;
