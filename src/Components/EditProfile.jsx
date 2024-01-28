// EditProfile.js
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, Button, Textarea } from "@nextui-org/react";

const EditProfile = ({ user, onSave, onCancel }) => {
  const [editedUser, setEditedUser] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    projects: [
      { title: 'Project 1', description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit...' },
      { title: 'Project 2', description: 'Give a brief description of your project here.' },
      { title: 'Project 3', description: 'Give a brief description of your project here.' },
    ],
  });

  useEffect(() => {
    // Update the state if the user object changes
    setEditedUser((prevUser) => ({
      name: user?.displayName || '',
      email: user?.email || '',
      phoneNumber: user?.phoneNumber || '',
      projects: [...prevUser.projects],
    }));
  }, [user]);

  const handleInputChange = (field, value) => {
    setEditedUser((prevUser) => ({ ...prevUser, [field]: value }));
  };

  const handleProjectChange = (index, field, value) => {
    setEditedUser((prevUser) => {
      const updatedProjects = [...prevUser.projects];
      updatedProjects[index][field] = value;
      return { ...prevUser, projects: updatedProjects };
    });
  };

  const handleSave = () => {
    onSave(editedUser);
  };

  return (
    <Card className="max-w-2xl" style={{ margin: 'auto', marginTop: '50px' }}>
      <CardHeader style={{ fontWeight: 'bold' }}>Edit Profile</CardHeader>
      <CardBody>
      <label>Name:</label>
        <input
          type="text"
          style={{display: 'block', width: '100%', padding: '10px',margin: '5px 0', border: '1px solid #ccc',borderRadius: '4px',}}
          value={editedUser.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
        />
        <br />
        <label>Email:</label>
<input
  type="email"
  style={{display: 'block', width: '100%', padding: '10px',margin: '5px 0', border: '1px solid #ccc',borderRadius: '4px',}}
  value={editedUser.email}
  onChange={(e) => handleInputChange('email', e.target.value)}
/>

        <br />
        <label>Phone Number:</label>
        <input
          type="tel"
          style={{display: 'block', width: '100%', padding: '10px',margin: '5px 0', border: '1px solid #ccc',borderRadius: '4px',}}
          value={editedUser.phoneNumber}
          onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
        />
        
        <br />
        <label>Projects:</label>
        {editedUser.projects.map((project, index) => (
          <div key={index}>
             <Textarea
              label={`Project ${index + 1}`}
              variant="bordered"
              labelPlacement="outside"
              value={project.description}
              onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
              className="max-w-5xl"
            />
            <br />
          </div>
        ))}
      </CardBody>
      <Button color="success" style={{ fontSize: '16px', padding: '5px 5px' }} onClick={handleSave}>
        Save
      </Button>
      <br></br>
      <Button color="secondary" onClick={onCancel}>
        Cancel
      </Button>
    </Card>
  );
};

export default EditProfile;
