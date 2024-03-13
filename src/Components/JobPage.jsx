
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '@nextui-org/react';
import { Chip } from "@nextui-org/react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { Divider } from "@nextui-org/react";
import Header1 from './Header1';
import { useParams } from 'react-router-dom';
import { auth, db } from '../firebase.js';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';

const ServiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: auto;
  align-items: center;
  justify-content: center;
  background-color: black;
`;

const ServiceTitle = styled.h2`
  color: #007bff;
  font-size: 25px;
  margin-bottom: 30px;
`;

const ServiceDescription = styled.p`
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 20px;
  text-align: left; 
`;

const ServiceList = styled.ul`
  list-style-type: none;
  padding: 0;
  text-align: left;
  margin-bottom: 20px;
`;

const ServiceListItem = styled.li`
  margin-bottom: 10px;
`;

const ReviewContainer = styled.div`
  margin-top: 40px;
`;

const Review = styled.div`
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 20px;
  text-align: left;
`;

const Rating = styled.div`
  font-size: 20px;
  margin-bottom: 10px;
`;

const ClientName = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
  color: white;
`;

const ReviewContent = styled.div`
  font-size: 16px;
  text-align: left; 
  color: white;
`;

const ContactButton = styled(Button)`
  background-color: #007bff;
  color: #fff;
  margin-top: 40px;
  margin-bottom: 90px;
`;

const Pricing = styled.p`
  font-size: 18px;
  margin-top: 20px;
  margin-bottom: 20px; 
`;

const WhiteText = styled.p`
  color: white;
`;

const CustomDivider = styled(Divider)`
  background-color: #fcf8f7; 
`;

const JobPage = () => {
  const params = useParams();
  const [list, setList] = useState([]);

  const handleOnAcceptClick = async () => {
    try {
      await updateDoc(doc(db, 'jobs', params.id), {
        status: 'Assigned',
        freelancer: auth.currentUser.email
      });
      alert('Job Accepted!');
    } catch (error) {
      alert(error.message);
    }

  };
  useEffect(() => {
    try {
      const fetchData = async () => {
        const data = await getDocs(collection(db, "jobs"));
        const filteredData = data.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .filter(item => item.id === params.id);
        setList(filteredData);
      };
      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <ServiceContainer>
      <Header1></Header1>
      <br />
      <Card className="max-w-[400px]" style={{ backgroundColor: '#1f1f1f', marginLeft: '5%', marginRight: '5%' }}>
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <ServiceTitle>{
              list.map((item) => (
                item.jobTitle
              ))
            }</ServiceTitle>
          </div>
        </CardHeader>
        <CustomDivider />
        <CardBody>
          <ServiceDescription>
            <WhiteText>
              {list.map((item) => (
                item.description
              ))}
            </WhiteText>
          </ServiceDescription>
        </CardBody>
        <CustomDivider />
        <CardFooter>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: "20px", marginRight: "8px", textAlign: 'left', color: 'white' }}>Skills & Expertise :</span>
            {list.map((item) => (
              item.skills.map((skill, index) => (
                <Chip
                  color="primary"
                  variant='shadow'
                  key={index}
                  style={{ margin: "5px" }}
                >
                  {skill}
                </Chip>
              ))
            ))}
          </div>
        </CardFooter>
      </Card>
      <br />
      <br />
      <Card className="max-w-[400px]" style={{ backgroundColor: '#1f1f1f' }}>
        <CardHeader className="flex gap-3" >
          <div className="flex flex-col">
            <p className="text-md">
              <ServiceTitle><WhiteText>Payment Details:</WhiteText></ServiceTitle>
              <ServiceDescription>
                <WhiteText>
                </WhiteText>
              </ServiceDescription>
            </p>
          </div>
        </CardHeader>
        <CustomDivider />
        <CardBody>

          <ServiceList>
            <WhiteText>
              {
                list.map((item) => (
                  <ServiceListItem>
                    <WhiteText>
                      <ol>
                        <li>Client's Budget :- $ {item.budget}</li>
                        <li>Platform Charges :- $ {item.budget * 0.1}</li>
                        {/* <li> Deadline: {item.deadline}</li> */}
                      </ol>
                    </WhiteText>
                  </ServiceListItem>
                ))
              }
            </WhiteText>
          </ServiceList>
        </CardBody>
        <CustomDivider />
        <CardFooter>
          <ServiceDescription>
            <WhiteText>
              <ol>
                {
                  list.map((item) => (
                    <li>Amount you will receive:- $ {item.budget * 0.9}</li>
                  ))
                }
              </ol>
            </WhiteText>
          </ServiceDescription>
        </CardFooter>
      </Card>

      <ReviewContainer>
        <Review>
          <Rating>⭐⭐⭐⭐⭐</Rating>
          <ClientName>John Doe</ClientName>
          <ReviewContent>
            "Working with this Front-End Developer was a fantastic experience. They delivered top-notch work and exceeded our expectations. Highly recommended!"
          </ReviewContent>
        </Review>
        <Review>
          <Rating>⭐⭐⭐⭐⭐</Rating>
          <ClientName>Jane Smith</ClientName>
          <ReviewContent>
            "The Front-End Developer showcased exceptional skills and attention to detail. Our website now looks stunning and functions seamlessly. Will definitely hire again!"
          </ReviewContent>
        </Review>

        <Review>
          <Rating>⭐⭐⭐⭐⭐</Rating>
          <ClientName>Bob Johnson</ClientName>
          <ReviewContent>
            "Professionalism at its best! The Front-End Developer was responsive, creative, and delivered on time. A pleasure to work with."
          </ReviewContent>
        </Review>
      </ReviewContainer>


      {/* <Pricing>Price: {price}</Pricing> */}


      <Button color='success' onClick={handleOnAcceptClick}>Accept Offer</Button>
      <br />
    </ServiceContainer>
  );
};

export default JobPage;