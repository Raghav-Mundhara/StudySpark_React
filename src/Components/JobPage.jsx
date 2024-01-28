
import React from 'react';
import styled from 'styled-components';
import { Button } from '@nextui-org/react';
import {Chip} from "@nextui-org/react";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/react";
import {Divider} from "@nextui-org/react";
const ServiceContainer = styled.div`
  text-align: center;
  padding: 40px;
  margin-top: 40px;
  background-color: black; 
  color: #fff;
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

const SkillsContainer = styled.div`
margin-top: 20px;
display: flex;
flex-direction: row;
align-items: flex-start;
`;

const SkillsText = styled.p`
  font-size: 20px;
  margin-right: 8px;
  text-align:left;
`;

const WhiteText = styled.p`
  color: white;
`;

const CustomDivider = styled(Divider)`
  background-color: #fcf8f7; 
`;

// const CustomCard = styled(Card)`
//   border: 1px solid white; /* Set the border color to white */
// `;

const JobPage = () => {
  
  const price = '$X,XXX'; 




  
  return (
    <ServiceContainer>
      <Card className="max-w-[400px]" style={{ backgroundColor: '#1f1f1f'}}>
<CardHeader className="flex gap-3">
  
  <div className="flex flex-col">
    <p className="text-md">
    <ServiceTitle>Front-End Web Development Wizard</ServiceTitle>

     

<ServiceDescription>
  <WhiteText>
  Are you in search of a proficient Front-End Web Developer to elevate your online presence? Your quest ends here. 
  With a wealth of experience, I specialize in translating innovative ideas into captivating, user-centric websites that make a lasting impact. My expertise lies in seamlessly blending creativity with technical prowess, resulting in visually compelling and responsive web experiences. As your dedicated Front-End Web Developer, I am committed to delivering solutions that not only meet but exceed your expectations. 
  Let's collaborate to transform your vision into a digital masterpiece.
  </WhiteText>
</ServiceDescription>
        </p>
    
  </div>
</CardHeader>
<CustomDivider/>
<CardBody>
<ServiceDescription>
<WhiteText>
        As your dedicated Front-End Web Developer, I am committed to delivering solutions that not only meet but exceed your expectations. Here are some key aspects of my service:
        </WhiteText>
      </ServiceDescription>

      <ServiceList>
        <WhiteText>
        <ServiceListItem>1. Pixel-Perfect Designs</ServiceListItem>
        <ServiceListItem>2. Responsive Layouts</ServiceListItem>
        <ServiceListItem>3. Cutting-Edge Technologies</ServiceListItem>
        <ServiceListItem>4. Customized Solutions</ServiceListItem>
        <ServiceListItem>5. Cross-Browser Compatibility</ServiceListItem>
        <ServiceListItem>6. Performance Optimization</ServiceListItem>
        </WhiteText>
      </ServiceList>
</CardBody>
<CustomDivider/>
<CardFooter>
<ServiceDescription>
       <WhiteText>
        <ol>
          <li> Proven Track Record: I have a successful track record of delivering high-quality front-end solutions for diverse clients across industries.</li>
          <li> Collaborative Approach: Communication is key. I work closely with clients, ensuring their ideas are heard and reflected in the final product.</li>
          <li> Flexible & Timely: I understand the importance of deadlines. My work is characterized by flexibility, attention to detail, and timely delivery.</li>
          <li> Continuous Improvement: The tech landscape evolves, and so do I. I stay updated on the latest trends, tools, and methodologies to deliver cutting-edge solutions.</li>
        </ol>
        </WhiteText>
      </ServiceDescription>
</CardFooter>
</Card>
<br/>
<SkillsText>
  Skills & Expertise :
</SkillsText>
      <SkillsContainer>
       
        <Chip size="md" style={{ marginRight: '10px' }}>Skill 1</Chip>
        <Chip size="md" style={{ marginRight: '10px' }}>Skill 2</Chip>
        <Chip size="md">Skill 3</Chip>
      
      </SkillsContainer>
      <br/>

        
  <Card className="max-w-[400px]" style={{ backgroundColor: '#1f1f1f'}}>
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
  <CustomDivider/>
  <CardBody>
  <ServiceDescription>
  <WhiteText>
          
          </WhiteText>
        </ServiceDescription>

        <ServiceList>
          <WhiteText>
          <ServiceListItem>1. Total Amount: </ServiceListItem>
          <ServiceListItem>2. Service Tax: </ServiceListItem>
          
          
          </WhiteText>
        </ServiceList>
  </CardBody>
  <CustomDivider/>
  <CardFooter>
  <ServiceDescription>
        <WhiteText>
          <ol>
            <li> Total Amount you will receive: </li>
            
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


<Pricing>Price: {price}</Pricing>


      <ContactButton>Contact Me </ContactButton>
    </ServiceContainer>
  );
};

export default JobPage;
