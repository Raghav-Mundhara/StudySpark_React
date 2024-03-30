import React from 'react'
import styled from 'styled-components'
import { Button, Input, Textarea } from '@nextui-org/react';
import { db, auth } from '../firebase'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header1 from './Header1';
import { updateDoc,doc, getDocs,getDoc , collection } from 'firebase/firestore';
import axios from 'axios';
import { faAppleAlt } from '@fortawesome/free-solid-svg-icons';

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
  const navigate = useNavigate();
  const freelancer = params.freelancer;
  const client = params.client;
  const jobid = params.id;
  const [user, setUser] = useState(null);
  const [review, setReview] = useState('');
  const [title, setTitle] = useState('');
  const [stars, setStars] = useState(0);
  const [sentiment, setSentiment] = useState('');
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  useEffect(() => {
    // console.log("Inside useEffect");
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "jobs"));
        querySnapshot.forEach((doc) => {
          if (doc.id === jobid) {
            var x = doc.data().jobTitle;
            setTitle(x);
          }
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    // console.log("Fetching data...");
    fetchData();
  }, [jobid, setTitle]);
  


  const submitReview = async () => {
    var sentiment = '';
    try {
      axios.post('http://127.0.0.1:5000/getReview', {
        review: review
      }).then((response) => {
        console.log(response.data.sentiment[0]);
        if(response.data.sentiment[0] > 0.5){
          // console.log(5);
          setSentiment('Positive');
          sentiment = 'Positive';
          setStars(5);
          // console.log(`stars: ${stars}`);
        }else if(response.data.sentiment[0] > 0.2){
          // console.log(4);
          setSentiment('Positive');
          sentiment = 'Positive';
          setStars(4);
          // console.log(`stars: ${stars}`);

        }else if(response.data.sentiment[0] >= 0.0){
          // console.log(3);
          setSentiment('Neutral');
          sentiment = 'Neutral';
          setStars(3);
          // console.log(`stars: ${stars}`);

        }else if(response.data.sentiment[0] > -0.2){
          // console.log(2);
          setSentiment('Negative');
          sentiment = 'Negative';
          setStars(2);
          // console.log(`stars: ${stars}`);

        }
        else{
          // console.log(1);
          // console.log('Negative');
          sentiment = 'Negative';
          setSentiment('Negative');
          setStars(1);
          // console.log(`stars: ${stars}`);

        }
      });
      const userRef = doc(db, 'users', freelancer);
      const docu = await getDoc(userRef);
  
      if (docu.exists()) {
        const userData = docu.data();
        const reviewsArray = Array.isArray(userData.reviews) ? userData.reviews : [];
  
        reviewsArray.push({review,stars,sentiment});
  
        await updateDoc(userRef, { reviews: reviewsArray });
  
        console.log('Document successfully updated');
        alert('Review submitted successfully\nSentiment: '+sentiment+'\nStars: '+stars);
        // console.log(sentiment);
        // console.log(stars);
        navigate('/jobListing');
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
        }}>{title}</p>
        <Input
          variant='bordered'
          isRequired={true}
          color='primary'
          placeholder="Enter your review"
          style={{color: 'white'}}
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