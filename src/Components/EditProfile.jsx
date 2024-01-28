// EditProfile.js
import React from 'react';
import { Card, CardHeader, CardBody, Button, Textarea } from "@nextui-org/react";
import { getDoc , getDocs } from '@firebase/firestore';
// import { db ,auth } from '../firebase';
const EditProfile = () => {
  return (
    <Card className="max-w-2xl" style={{ margin: 'auto', marginTop: '50px' }}>
      <CardHeader style={{ fontWeight: 'bold' }}>Edit Profile</CardHeader>
      <CardBody>
        <label>Name:</label>
        <input
          type="text"
          style={{ display: 'block', width: '100%', padding: '10px', margin: '5px 0', border: '1px solid #ccc', borderRadius: '4px', }}
          value="John Doe"
        />
        <br />
        <label>Email:</label>
        <input
          type="email"
          style={{ display: 'block', width: '100%', padding: '10px', margin: '5px 0', border: '1px solid #ccc', borderRadius: '4px', }}
          value="john.doe@example.com"
        />

        <br />
        <label>Phone Number:</label>
        <input
          type="tel"
          style={{ display: 'block', width: '100%', padding: '10px', margin: '5px 0', border: '1px solid #ccc', borderRadius: '4px', }}
          value="123-456-7890"
        />

        <br />
        <label>Projects:</label>
        {[1, 2, 3].map((index) => (
          <div key={index}>
            <Textarea
              label={`Project ${index}`}
              variant="bordered"
              labelPlacement="outside"
              value={`This is a sample project description ${index}.`}
              className="max-w-5xl"
            />
            <br />
          </div>
        ))}
      </CardBody>
      <Button color="success" style={{ fontSize: '16px', padding: '5px 5px' }}>
        Save
      </Button>
      <br />
      <Button color="secondary" style={{ fontSize: '16px', padding: '5px 5px' }}>
        Cancel
      </Button>
    </Card>
  );
};

export default EditProfile;
