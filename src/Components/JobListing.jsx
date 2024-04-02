import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardFooter, Chip, Image } from "@nextui-org/react";
import Header1 from './Header1';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faFileAlt, faCode, faHeart } from '@fortawesome/free-solid-svg-icons';
import { auth } from '../firebase.js';
import { useNavigate } from 'react-router';
import { db } from '../firebase.js';
import { collection, getDocs } from 'firebase/firestore';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: auto;
  background-color: #000000;
  background-size: cover;
  background-position: center;
`;

const CardHeader = ({ title, icon }) => (
  <div className="text-lg font-semibold mb-2 flex items-center" style={{ fontSize: "1.5rem", fontWeight: "bold", fontFamily: 'Times New Roman' }}>
    {icon && <FontAwesomeIcon icon={icon} className="mr-2" />}
    <span>{title}</span>
  </div>
);

const NewCardFooter = ({ budget, deadline }) => {
  const deadlineDate = deadline.toDate();
  const currentDate = new Date();
  const daysDifference = Math.floor((deadlineDate - currentDate) / (1000 * 60 * 60 * 24));

  return (
    <div className="flex justify-between">
      <div className="text-sm" style={{ marginRight: '10px' }}>Budget:- ₹{budget}</div>
      <div className="text-sm" style={{ marginLeft: '10px' }}>Deadline :- {daysDifference} days</div>
    </div>
  );
}

function truncateDescription(description, maxLength) {
  return description.length > maxLength ? description.substring(0, maxLength) + "..." : description;
}

function JobListing() {
  let navigate = useNavigate();
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDocs(collection(db, "jobs"));
      setList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, [])

  var colorList = ['success', 'danger', 'warning', 'secondary', 'primary'];

  return (
    
    <Container>
      <Header1 />
      <div
        className="gap-2 grid grid-cols-2 sm:grid-cols-4"
        style={{
          margin: "auto",
        }}
      >
        {list.map((item, index) => {
          const deadlineDate = item.deadline.toDate();
          const currentDate = new Date();
          const daysDifference = Math.floor((deadlineDate - currentDate) / (1000 * 60 * 60 * 24));
          // console.log(item.client);
          if (daysDifference > 0 && item.client !== auth.currentUser.email && item.status === "Unassigned")  {
            return (
              <Card
                shadow="sm"
                key={index}
                isPressable
                onPress={() => navigate(`/Jobpage/${item.id}`)}
                style={{
                  marginTop: "20px",
                  width: "700px",
                  height: "250px",
                  margin: "10px",
                  padding: "20px",
                  backgroundColor: 'lightblue',
                  backgroundSize: "cover",
                }}
              >
                <CardHeader title={item.jobTitle} icon={faBook} style={{ fontFamily: 'Times New Roman' }}></CardHeader>
                <CardBody className="overflow-visible p-0">
                  <div style={{ fontSize: "1.2rem" }}>
                    {truncateDescription(item.description, 100)}
                    {item.description.length > 100 && (
                      <span>
                        <button onClick={() => navigate(`/Jobpage/${item.id}`)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#007bff' }}>Read more</button>
                      </span>
                    )}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                    <p style={{ fontSize: "1rem", margin: "0 5px 0 0" }}>Skills required:</p>
                    {item.skills.map((skill, index) => (
                      <Chip
                        color={colorList[index % colorList.length]}
                        variant='shadow'
                        key={index}
                        style={{ margin: "5px" }}
                      >
                        {skill}
                      </Chip>
                    ))}
                  </div>
                </CardBody>
                <NewCardFooter budget={item.budget} deadline={item.deadline} />
              </Card>
            );
          } else {
            return null;
          }
        })}
      </div>
    </Container>
  );
}
export default JobListing;
