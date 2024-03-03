import React, { useState } from 'react'; // Ensure useState is imported

const Contactwindow = ({ activeContact }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      alert('No file selected!');
      return;
    }

    // Simulate the upload process
    setUploadedFiles(prevFiles => [...prevFiles, file]);
    alert('File uploaded: ' + file.name);

    // Reset the file input after upload
    event.target.value = '';
  };
  const [name, setName] = useState("")
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const handlePayment = async () => {

     // Ensure handlePayment is defined
    alert('Payment functionality to be implemented.');
  };

  const handleDelete = (fileName) => { // Define a method to handle file deletion
    setUploadedFiles(uploadedFiles.filter(file => file.name !== fileName));
  };

  const handleAccept = (fileName) => { // Example accept function
    alert(`${fileName} accepted`);
    // Implement acceptance logic here
  };

  const handleReject = (fileName) => { // Example reject function
    alert(`${fileName} rejected`);
    // Here you could simply delete the file or move it to a 'rejected' list
    handleDelete(fileName); // For simplicity, we'll just delete it
  };

  return (
    <div className="chat-window">
      <h2>{activeContact.email}</h2>
      <div className="chat-content">
        {uploadedFiles.map((file, index) => (
          <div key={index}>
            {file.name}
            <button onClick={() => handleAccept(file.name)}>Accept</button>
            <button onClick={() => handleReject(file.name)}>Reject</button>
            <button onClick={() => handleDelete(file.name)}>Delete</button>
          </div>
        ))}
      </div>
      <div className="chat-actions">
        <input type="file" onChange={handleFileChange} style={{ display: 'none' }} id="file-upload" />
        <label htmlFor="file-upload" className="file-action-button">Upload</label>
        <button onClick={handlePayment}>Pay</button>
      </div>
    </div>
  );
};

export default Contactwindow;
