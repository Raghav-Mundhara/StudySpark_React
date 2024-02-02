import React, { useEffect , useState} from 'react';
import { Card, CardBody, CardFooter, Chip, Image } from "@nextui-org/react";
import Header1 from './Header1';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faFileAlt, faCode,faHeart } from '@fortawesome/free-solid-svg-icons'; 
import {auth} from '../firebase.js';
import { useNavigate } from 'react-router';
import { db } from '../firebase.js';
import { collection, getDocs } from 'firebase/firestore';
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
    {icon && <FontAwesomeIcon icon={icon} className="mr-2" />}
    <span>{title}</span>
    <FontAwesomeIcon icon={faHeart} className="ml-auto text-red-500" /> 
  </div>
);

const NewCardFooter=({budget,deadline})=>{
  console.log(deadline)
  const deadlineDate = deadline.toDate();
  console.log(deadlineDate);
  const currentDate = new Date();
  const daysDifference = Math.floor((deadlineDate - currentDate) / (1000 * 60 * 60 * 24));

  console.log(currentDate);
  return (
    <div className="flex justify-between">
      <div className="text-sm" style={{ marginRight: '10px' }}>Budget:- ₹{budget}</div>
      <div className="text-sm" style={{ marginLeft: '10px' }}>Deadline :- {daysDifference} days</div>
    </div>
  );
  
}
function JobListing() {
  let navigate = useNavigate();
  const [list, setList] = useState([]);
  useEffect(()=>{
    const fetchData = async () => {
      const data = await getDocs(collection(db, "jobs"));
      setList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  },[])
  

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
            onPress={() => navigate('/Jobpage')}
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
            <CardHeader title={item.jobTitle} icon={faBook} style={{ fontFamily: 'Times New Roman' }}></CardHeader>

            <CardBody className="overflow-visible p-0">
              <p style={{ fontSize: "1.2rem" }}>{item.description}</p>
              {
                item.skills.map((skill, index) => (
                  <Chip key={index} style={{ margin: "5px" }}>{skill}</Chip>
                ))
              }
            </CardBody>

            <NewCardFooter budget={item.budget} deadline={item.deadline} />
          </Card>
        ))}
      </div>
    </Container>
  );
}

export default JobListing;
