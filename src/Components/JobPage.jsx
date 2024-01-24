// FrontEndService.js
import React from 'react';
import styled from 'styled-components';
import { Button } from '@nextui-org/react';



const ServiceContainer = styled.div`
  text-align: center;
  padding: 40px;
  margin-top: 40px;
  background-color: #f8f8f8;
`;

const ServiceTitle = styled.h2`
  color: #007bff;
  font-size: 25px;
  margin-bottom: 30px
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
  ::before {
    content: '•'; /* Bullet point */
    color: #007bff; /* Bullet color */
    margin-right: 8px;
  }
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
`;

const ReviewContent = styled.div`
  font-size: 16px;
  text-align: left; 
`;




const ContactButton = styled(Button)`
  background-color: #007bff;
  color: #fff;
  margin-top: 40px;
  margin-bottom: 90px;
`;

const Pricing = styled.p`
  font-size: 18px;
  margin-top: 20px; // Adjust the margin as needed
  margin-bottom: 20px; // Add margin-bottom for space
`;


const FrontEndService = () => {
  
  const price = '$X,XXX'; 




  
  return (
    <ServiceContainer>
      <ServiceTitle>Front-End Web Development Wizard</ServiceTitle>

     

      <ServiceDescription>
        Are you in search of a proficient Front-End Web Developer to elevate your online presence? Your quest ends here. 
        With a wealth of experience, I specialize in translating innovative ideas into captivating, user-centric websites that make a lasting impact. My expertise lies in seamlessly blending creativity with technical prowess, resulting in visually compelling and responsive web experiences. As your dedicated Front-End Web Developer, I am committed to delivering solutions that not only meet but exceed your expectations. 
        Let's collaborate to transform your vision into a digital masterpiece.
      </ServiceDescription>

      <ServiceDescription>
        As your dedicated Front-End Web Developer, I am committed to delivering solutions that not only meet but exceed your expectations. Here are some key aspects of my service:
      </ServiceDescription>

      <ServiceList>
        <ServiceListItem>1. Pixel-Perfect Designs</ServiceListItem>
        <ServiceListItem>2. Responsive Layouts</ServiceListItem>
        <ServiceListItem>3. Cutting-Edge Technologies</ServiceListItem>
        <ServiceListItem>4. Customized Solutions</ServiceListItem>
        <ServiceListItem>5. Cross-Browser Compatibility</ServiceListItem>
        <ServiceListItem>6. Performance Optimization</ServiceListItem>
      </ServiceList>

      <ServiceDescription>
       
        <ol>
          <li> Proven Track Record: I have a successful track record of delivering high-quality front-end solutions for diverse clients across industries.</li>
          <li> Collaborative Approach: Communication is key. I work closely with clients, ensuring their ideas are heard and reflected in the final product.</li>
          <li> Flexible & Timely: I understand the importance of deadlines. My work is characterized by flexibility, attention to detail, and timely delivery.</li>
          <li> Continuous Improvement: The tech landscape evolves, and so do I. I stay updated on the latest trends, tools, and methodologies to deliver cutting-edge solutions.</li>
        </ol>
      </ServiceDescription>

      
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


<Pricing>Price: {price}</Pricing>


      <ContactButton>Contact Me </ContactButton>
    </ServiceContainer>
  );
};

export default FrontEndService;
