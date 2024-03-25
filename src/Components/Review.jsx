import React from 'react'
import styled from 'styled-components'
import { Button, Input, Textarea } from '@nextui-org/react';
import { db, auth } from '../firebase'
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header1 from './Header1';
import { updateDoc,doc, getDocs,getDoc , collection } from 'firebase/firestore';
import axios from 'axios';

const Container = styled.div`
    text-align: center;
    padding: 20px;
    margin: auto;
    // border: 1px solid #007bff;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: black;
`;
function Review() {
  const params = useParams();
  const freelancer = params.freelancer;
  const client = params.client;
  const jobid = params.id;
  const [user, setUser] = useState(null);
  const [review, setReview] = useState('');
  const [title, setTitle] = useState('');
  const [stars, setStars] = useState(0);
  const [sentiment, setSentiment] = useState('');
  // const [freelancer, setFreelancer] = useState('');
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);
  useState(()=>{
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "jobs"));
      querySnapshot.forEach((doc) => {
        if (doc.id === jobid) {
          setTitle(doc.data().title);
        }
      });
    }
    fetchData();
  })
  const submitReview = async () => {
    try {
      const userRef = doc(db, 'users', freelancer);
      const docu = await getDoc(userRef);
  
      if (docu.exists()) {
        const userData = docu.data();
        const reviewsArray = Array.isArray(userData.reviews) ? userData.reviews : [];
  
        // Add the new review to the reviews array
        reviewsArray.push(review);
  
        // Update the document with the updated reviews array
        await updateDoc(userRef, { reviews: reviewsArray });
  
        console.log('Document successfully updated');
      } else {
        console.log('Document does not exist');
      }
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };
  return (
    <div>
      <Header1></Header1>
      <Container>
        <h1 style={{
          color: 'white',
          fontSize: '30px',
          textAlign: 'center'
        }}>Review</h1>
        <h2 style={{
          color: 'white',
          fontSize: '25px',
          textAlign: 'center'
        }}>Title</h2>
        <p style={{
          color: 'white',
          fontSize: '20px',
          textAlign: 'center'
        }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel odio
          euismod, lacinia purus nec, fermentum ex. Donec auctor, purus sit amet
          tincidunt ultricies, nunc metus ultricies elit, sed ultrices justo
          ligula sit amet libero..</p>
        <Input
          variant='bordered'
          isRequired={true}
          color='primary'
          placeholder="Enter your review"
          onChange={(e) => setReview(e.target.value)}
        >
        </Input>
        <br />
        <Button
          color='primary'
          onClick={submitReview}
          
        >Submit</Button>
      </Container>
    </div>
  )
}

export default Review